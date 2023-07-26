const {
  selectUserByEmailDAO,
  insertUserDAO,
  selectUserBySessionGuidDAO,
  selectUserByIdDAO,
  updateUserDAO,
  updateEmailConfirmationDAO,
} = require("./dao");
const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { convertStringToMD5 } = require("../helpers/md5");

exports.createUserModel = async ({ name, email, password }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  const verifyEmail = await selectUserByEmailDAO({ email });
  if (!verifyEmail) {
    code = httpCode.BAD_REQUEST;
    message = "Já existe um cadastro com o email informado";
    return { code, message };
  }

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o nome";
    return { code, message };
  }
  if (!email) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o email";
    return { code, message };
  }

  const createUser = await insertUserDAO({
    name,
    email,
    password: await convertStringToMD5(password),
  });
  if (createUser) {
    code = httpCode.CREATED;
    message = "Cadastro efetuado com sucesso!";
    return { code, message };
  }

  return { code, message };
};

exports.getUserModel = async ({ user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  const user = await selectUserByIdDAO({ user_id });
  if (user) {
    code = httpCode.OK;
    message = "Usuário retornado com sucesso";
    return { code, message, data: user };
  }

  return { code, message };
};

exports.editUserModel = async ({ user_id, name, email }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o nome";
    return { code, message };
  }
  if (!email) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o email";
    return { code, message };
  }

  const user = (await this.getUserModel({ user_id })).data;
  if (email !== user.email) {
    await updateEmailConfirmationDAO({ user_id, email_confirmation: false });
  }

  const updateUser = await updateUserDAO({
    user_id,
    name,
    email,
  });
  if (updateUser) {
    code = httpCode.CREATED;
    message = "Atualização efetuada com sucesso!";
    return { code, message };
  }
  return { code, message };
};

exports.getUserBySessionGuid = async ({ session_guid }) => {
  const { user_id } = await selectUserBySessionGuidDAO({ session_guid });
  if (user_id) return { user_id };
  return { user_id: null };
};
