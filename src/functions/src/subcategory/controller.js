const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const {
  createSubcategoryModel,
  listSubcategoryModel,
  editSubcategoryModel,
  deleteSubcategoryModel,
} = require("./model");
const { getUserBySessionGuid } = require("../user/model");

exports.listSubcategoryController = async (req, res) => {
  const { category_name, transaction_type } = req.params;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
  }

  try {
    const { code, message, data } = await listSubcategoryModel({
      transaction_type,
      category_name,
      user_id,
    });
    res.status(code).send({ code, message, data });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.createSubcategoryController = async (req, res) => {
  const { category, name, costing } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, id } = await createSubcategoryModel({
      category,
      name,
      costing,
      user_id,
    });
    res.status(code).send({ code, message, id });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editSubcategoryController = async (req, res) => {
  const { id, name, costing } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await editSubcategoryModel({
      id,
      name,
      costing,
      user_id,
    });
    res.status(code).send({ code, message });
    return;
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.deleteSubcategoryController = async (req, res) => {
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
    const { code, message } = await deleteSubcategoryModel({
      id,
      user_id,
    });
    res.status(code).send({ code, message });
    return;
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};
