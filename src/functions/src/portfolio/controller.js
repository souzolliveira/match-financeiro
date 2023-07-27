const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { getUserBySessionGuid } = require('../user/model');
const { createPortfolioModel } = require('./model');

exports.listPortfoliosController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  // try {
  // } catch (error) {}
};

exports.createPortfolioController = async (req, res) => {
  const { session_guid } = req.headers;
  const { asset, value } = req.body;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await createPortfolioModel({
      asset,
      value,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch (error) {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editPortfolioController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};

exports.deletePortfolioController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};
