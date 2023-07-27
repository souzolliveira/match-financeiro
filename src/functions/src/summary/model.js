const { selectAssetsDAO } = require('../asset/dao');
const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { insertSummaryDAO, updateSummaryDAO, selectSummaryDAO } = require('./dao');

// TODO
exports.listSummaryModel = async () => {};

exports.updateSummaryModel = async ({ asset, quantity, unitary_value, total, last_update, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!asset) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o ativo do sumário';
    return { code, message };
  }

  const verifyAsset = await selectAssetsDAO({ id: asset, user_id });
  if (verifyAsset.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar um id de ativo válido';
    return { code, message };
  }

  if (!last_update) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar a data da transação';
    return { code, message };
  }

  const verifySummary = await selectSummaryDAO({ asset, user_id });
  if (verifyAsset.rows[0].quantifiable === true) {
    if (quantity === null || unitary_value === null) {
      code = httpCode.BAD_REQUEST;
      message = 'É necessário informar a quantidade de cotas e o valor unitário do aporte para esse ativo';
      return { code, message };
    }

    if (verifySummary.rowCount > 0) {
      const createSummary = await insertSummaryDAO({
        asset,
        quantity,
        average_price: unitary_value,
        total: null,
        last_update,
      });
      if (createSummary.rowCount > 0) {
        code = httpCode.CREATED;
        message = `Sumário criado com sucesso!`;
      }
    } else {
      const newQuantity = verifySummary.rows[0].quantity + quantity;
      const newAveragePrice =
        quantity > 0
          ? parseFloat(
              (parseFloat(parseFloat(unitary_value) * quantity) + parseFloat(parseFloat(verifySummary.rows[0].average_price) * verifySummary.rows[0].quantity)) / newQuantity
            ).toFixed(2)
          : verifySummary.rows[0].average_price;
      const updateSummary = await updateSummaryDAO({
        asset,
        quantity: newQuantity,
        average_price: newAveragePrice,
        total: null,
        last_update,
      });
      if (updateSummary.rowCount > 0) {
        code = httpCode.CREATED;
        message = `Sumário atualizado com sucesso!`;
      }
    }
  } else if (verifyAsset.rows[0].quantifiable === false) {
    if (total === null) {
      code = httpCode.BAD_REQUEST;
      message = 'É necessário informar o valor total do aporte para esse ativo';
      return { code, message };
    }
    if (verifySummary.rowCount > 0) {
      const createSummary = await insertSummaryDAO({
        asset,
        quantity: null,
        average_price: null,
        total,
        last_update,
      });
      if (createSummary.rowCount > 0) {
        code = httpCode.CREATED;
        message = `Sumário criado com sucesso!`;
      }
    } else {
      const newTotal = verifySummary.rows[0].total + total;
      const updateSummary = await updateSummaryDAO({
        asset,
        quantity: null,
        average_price: null,
        total: newTotal,
        last_update,
      });
      if (updateSummary.rowCount > 0) {
        code = httpCode.CREATED;
        message = `Sumário atualizado com sucesso!`;
      }
    }
  }

  return { code, message };
};

// TODO
exports.deleteSummaryModel = async () => {};
