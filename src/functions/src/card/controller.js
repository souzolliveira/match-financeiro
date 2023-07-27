const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { getUserBySessionGuid } = require('../user/model');
const { listCardsModel, createCardModel, editCardsModel, deleteCardModel } = require('./model');

exports.listCardsController = async (req, res) => {
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await listCardsModel({
      user_id,
    });
    res.status(code).send({ code, message, data });
    return;
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.createCardController = async (req, res) => {
  const { session_guid } = req.headers;
  const { name, expiration_day, payment_day, type } = req.body;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await createCardModel({
      name,
      expiration_day: parseInt(expiration_day, 10),
      payment_day: parseInt(payment_day, 10),
      type,
      user_id,
    });
    res.status(code).send({ code, message, data });
    return;
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.editCardController = async (req, res) => {
  const { session_guid } = req.headers;
  const { id, card } = req.body;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await editCardsModel({
      id,
      card,
      user_id,
    });
    res.status(code).send({ code, message, data });
    return;
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.deleteCardController = async (req, res) => {
  const { id } = req.query;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await deleteCardModel({
      id,
      user_id,
    });
    res.status(code).send({ code, message });
    return;
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};
