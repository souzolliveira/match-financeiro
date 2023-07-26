const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const {
  createUserModel,
  getUserModel,
  getUserBySessionGuid,
  editUserModel,
} = require("./model");

exports.getUserController = async (req, res) => {
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await getUserModel({
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

exports.createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { code, message } = await createUserModel({
      name,
      email,
      password,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editUserController = async (req, res) => {
  const { session_guid } = req.headers;
  const { name, email } = req.body;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await editUserModel({
      user_id,
      name,
      email,
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

exports.deleteUserController = async (req, res) => {
  res.status(204).send({});
};
