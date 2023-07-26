const {
  selectCardByNameDAO,
  insertCardDAO,
  selectCardsDAO,
  updateCardDAO,
  deleteCardDAO,
} = require("./dao");
const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { cardStatus } = require("../enumerations/card");
const { listTransactionsModel } = require("../transaction/model");

exports.createCardModel = async ({
  name,
  expiration_day,
  payment_day,
  type,
  user_id,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o nome do cartão";
    return { code, message };
  }

  if (!expiration_day) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o dia de fechamento da fatura do cartão";
    return { code, message };
  }

  if (expiration_day < 0 || expiration_day > 31) {
    code = httpCode.BAD_REQUEST;
    message = "Valor incorreto para dia de fechamento de fatura";
    return { code, message };
  }

  if (!payment_day) {
    code = httpCode.BAD_REQUEST;
    message =
      "É necessário informar o dia de pagamento/vencimento da fatura do cartão";
    return { code, message };
  }

  if (payment_day < 0 || payment_day > 31) {
    code = httpCode.BAD_REQUEST;
    message = "Valor incorreto para dia de pagamento/vencimento de fatura";
    return { code, message };
  }

  if (!type) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o tipo do cartão";
    return { code, message };
  }

  const verifyCardName = await selectCardByNameDAO({ name, user_id });
  if (!verifyCardName) {
    code = httpCode.BAD_REQUEST;
    message = "Já existe um cartão cadastrado com o nome informado";
    return { code, message };
  }

  const createCard = await insertCardDAO({
    name,
    expiration_day,
    payment_day,
    type,
    user_id,
    status: cardStatus.ACTIVE,
  });
  if (createCard) {
    code = httpCode.CREATED;
    message = "Cartão adicionado com sucesso!";
    return { code, message };
  }

  return { code, message };
};

exports.listCardsModel = async ({ user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  const cards = await selectCardsDAO({ user_id });
  if (cards) {
    code = httpCode.OK;
    message = "Cartões retornados com sucesso";
    const response = cards?.map((card) => {
      return {
        id: card.id,
        name: card.name,
        expirationDay: card.expiration_day,
        paymentDay: card.payment_day,
        type: card.type,
      };
    });
    return { code, message, data: response };
  }

  return { code, message };
};

exports.editCardsModel = async ({ id, card, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!card.id) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o id do cartão";
    return { code, message };
  }

  if (!card.name) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o nome do cartão";
    return { code, message };
  }

  if (!card.expirationDay) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o dia de fechamento da fatura do cartão";
    return { code, message };
  }

  if (card.expirationDay < 0 || card.expirationDay > 31) {
    code = httpCode.BAD_REQUEST;
    message = "Valor incorreto para dia de fechamento de fatura";
    return { code, message };
  }

  if (!card.paymentDay) {
    code = httpCode.BAD_REQUEST;
    message =
      "É necessário informar o dia de pagamento/vencimento da fatura do cartão";
    return { code, message };
  }

  if (card.paymentDay < 0 || card.paymentDay > 31) {
    code = httpCode.BAD_REQUEST;
    message = "Valor incorreto para dia de pagamento/vencimento de fatura";
    return { code, message };
  }

  if (!card.type) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o tipo do cartão";
    return { code, message };
  }

  const verifyEditedCardName = await selectCardByNameDAO({
    id,
    name: card.name,
    user_id,
  });
  if (!verifyEditedCardName) {
    code = httpCode.BAD_REQUEST;
    message = "Já existe um cartão cadastrado com o nome informado";
    return { code, message };
  }

  const updateCard = await updateCardDAO({
    id,
    card,
    user_id,
  });
  if (updateCard) {
    code = httpCode.OK;
    message = "Cartão editado com sucesso!";
  }

  return { code, message };
};

exports.deleteCardModel = async ({ id, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!id) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o cartão";
    return { code, message };
  }

  const verifyTransactions = await listTransactionsModel({
    user_id,
    card: id,
  });
  if (verifyTransactions?.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message =
      "Não é possível apagar o cartão, pois existem transações vinculadas a ele";
    return { code, message };
  }

  const deleteCard = await deleteCardDAO({
    id,
    user_id,
  });
  if (deleteCard.rowCount > 0) {
    code = httpCode.NO_CONTENT;
    return { code };
  } else {
    return { code, message };
  }
};
