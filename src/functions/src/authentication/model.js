const { selectEmailAndPasswordDAO } = require("./dao");
const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { token_types } = require("../enumerations/tokens.");
const { convertStringToMD5 } = require("../helpers/md5");
const { generateUUID } = require("../helpers/uuid");
const { createTokenModel, removeTokenModel } = require("../token/model");

exports.signInModel = async ({ email, password }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  const selectUserByEmailAndPassword = await selectEmailAndPasswordDAO({
    email,
    password: await convertStringToMD5(password),
  });
  if (selectUserByEmailAndPassword.rows.length === 0) {
    code = httpCode.UNAUTHORIZED;
    message = "Usuário e/ou senha incorretos";
  } else if (selectUserByEmailAndPassword.rows.length === 1) {
    const session_guid = await generateUUID();
    const createToken = await createTokenModel({
      token: session_guid,
      token_type: token_types.AUTH,
      user_id: selectUserByEmailAndPassword?.rows?.[0]?.id,
    });
    if (createToken) {
      code = httpCode.OK;
      message = "Autenticação feita com sucesso";
      return { code, message, session_guid };
    }
  }
  return { code, message, session_guid: null };
};

exports.signOutModel = async ({ user_id, session_guid }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  try {
    const removeToken = await removeTokenModel({
      token: session_guid,
      token_type: token_types.AUTH,
      user_id,
    });
    if (removeToken?.rowCount > 0) return { code: httpCode.NO_CONTENT };
    return { code, message };
  } catch {
    return { code, message };
  }
};
