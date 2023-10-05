const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { getUserBySessionGuid } = require('../user/model');
const { createDividendModel, listDividendsModel } = require('./model');

exports.listDividendsController = async (req, res) => {
  const { session_guid } = req.headers;
  const { start_date, end_date, category, subcategory, asset, group_by } = req.query;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await listDividendsModel({
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
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.createDividendController = async (req, res) => {
  const { session_guid } = req.headers;
  const { asset, value, dividend_date, observation } = req.body;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await createDividendModel({
      asset,
      value,
      dividend_date,
      observation,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editDividendController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};

exports.deleteDividendController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};
