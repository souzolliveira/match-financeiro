const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { getUserBySessionGuid } = require('../user/model');
const { createCategoryModel, listCategoryModel, editCategoryModel, deleteCategoryModel } = require('./model');

exports.listCategoryController = async (req, res) => {
  const { transaction_type } = req.params;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await listCategoryModel({
      transaction_type,
      user_id,
    });
    res.status(code).send({ code, message, data });
    return;
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.createCategoryController = async (req, res) => {
  const { transaction_type, name } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, id } = await createCategoryModel({
      transaction_type,
      name,
      user_id,
    });
    res.status(code).send({ code, message, id });
    return;
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.editCategoryController = async (req, res) => {
  const { id, name } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await editCategoryModel({
      id,
      name,
      user_id,
    });
    res.status(code).send({ code, message });
    return;
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.deleteCategoryController = async (req, res) => {
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
    const { code, message } = await deleteCategoryModel({
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
