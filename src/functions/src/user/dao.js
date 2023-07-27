const db = require('../config/database');
const { token_types } = require('../enumerations/tokens.');

exports.selectUserByEmailDAO = async ({ email }) => {
  const response = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return !response.rows.length;
};

exports.insertUserDAO = async ({ name, email, password }) => {
  const response = await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);
  return response;
};

exports.updateUserDAO = async ({ user_id, name, email }) => {
  const response = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, user_id]);
  return response;
};

exports.updateEmailConfirmationDAO = async ({ user_id, email_confirmation }) => {
  const response = await db.query('UPDATE users SET email_confirmation = $1 WHERE id = $2', [email_confirmation, user_id]);
  return response;
};

exports.updatePasswordDAO = async ({ user_id, password }) => {
  const response = await db.query('UPDATE users SET password = $1 WHERE id = $2', [password, user_id]);
  return response;
};

exports.selectUserBySessionGuidDAO = async ({ session_guid }) => {
  const response = await db.query('SELECT * FROM tokens WHERE token_type = $1 and token = $2', [token_types.AUTH, session_guid]);
  return { user_id: response.rows[0].users_fk };
};

exports.selectUserByIdDAO = async ({ user_id }) => {
  const response = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
  return {
    user: {
      name: response.rows[0].name,
      email: response.rows[0].email,
      email_confirmation: !!response.rows[0].email_confirmation,
    },
  };
};
