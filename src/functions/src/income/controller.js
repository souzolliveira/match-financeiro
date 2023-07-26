const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { getUserBySessionGuid } = require("../user/model");
const { createIncomeModel, listIncomesModel } = require("./model");

exports.listIncomesController = async (req, res) => {
  const { session_guid } = req.headers;
  const { start_date, end_date, category, subcategory, group_by } = req.query;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await listIncomesModel({
      start_date,
      end_date,
      category,
      subcategory,
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

exports.createIncomeController = async (req, res) => {
  const { session_guid } = req.headers;
  const { subcategory, value, income_date, observation } = req.body;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await createIncomeModel({
      subcategory,
      value,
      income_date,
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

exports.editIncomeController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};

exports.deleteIncomeController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};
