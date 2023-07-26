const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { getUserBySessionGuid } = require("../user/model");
const { createInvestimentModel, listInvestimentsModel } = require("./model");

exports.listInvestimentsController = async (req, res) => {
  const { session_guid } = req.headers;
  const { start_date, end_date, category, subcategory, asset, group_by } =
    req.query;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await listInvestimentsModel({
      start_date,
      end_date,
      category,
      subcategory,
      asset,
      group_by,
      user_id,
    });
    res.status(code).send({ code, message, data });
    return;
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.createInvestimentController = async (req, res) => {
  const { session_guid } = req.headers;
  const {
    asset,
    quantity,
    unitary_value,
    total,
    investiment_date,
    observation,
  } = req.body;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await createInvestimentModel({
      asset,
      quantity,
      unitary_value,
      total,
      investiment_date,
      observation,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editInvestimentController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};

exports.deleteInvestimentController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};
