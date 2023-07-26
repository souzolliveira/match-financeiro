const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { listTransactionsModel, lastUpdateModel } = require("./model");
const { getUserBySessionGuid } = require("../user/model");

exports.listTransactionsController = async (req, res) => {
  const { session_guid } = req.headers;
  const { startDate, endDate, groupBy } = req.query;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const {
      code,
      message,
      data,
      balance,
      incomes,
      expenses,
      expenses_fixed,
      expenses_variable,
      investiments,
      redemptions,
      dividends,
    } = await listTransactionsModel({
      start_date: startDate,
      end_date: endDate,
      group_by: groupBy,
      user_id,
    });
    res.status(code).send({
      code,
      message,
      data,
      balance,
      incomes,
      expenses,
      expenses_fixed,
      expenses_variable,
      investiments,
      redemptions,
      dividends,
    });
    return;
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.lastUpdateController = async (req, res) => {
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, date } = await lastUpdateModel({
      user_id,
    });
    res.status(code).send({ code, message, date });
    return;
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};
