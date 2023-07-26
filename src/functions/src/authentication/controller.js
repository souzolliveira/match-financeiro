const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { signInModel, signOutModel } = require('./model');
const { getUserBySessionGuid } = require('../user/model');

exports.signInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { code, message, session_guid } = await signInModel({
      email,
      password,
    });
    if (session_guid) {
      res.status(code).send({ code, message, session_guid });
    } else {
      res.status(code).send({ code, message });
    }
  } catch {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.signOutController = async (req, res) => {
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code } = await signOutModel({
      user_id,
      session_guid,
    });
    res.status(code).send({});
  } catch {
    res.status(httpCode.ERROR).send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};
