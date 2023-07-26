const db = require('../config/database');
const { now } = require('../helpers/time');

exports.insertTokenDAO = async ({ token, token_type, user_id }) => {
  const date = now();
  const response = await db.query(
    'INSERT INTO tokens (token_type, users_fk, date, token) VALUES ($1, $2, $3, $4)',
    token_type,
    user_id,
    date,
    token,
  ]);
  return response;
};

exports.deleteAllTokensDAO = async ({ user_id, token_type }) => {
  await db.query("DELETE FROM tokens WHERE users_fk = $1 and token_type = $2", [
    user_id,
    token_type,
  ]);
  
};

exports.deleteTokenDAO = async ({ user_id, token, token_type }) => {
  const response = await db.query(
    'DELETE FROM tokens WHERE users_fk = $1 and token = $2 and token_type = $3',
    user_id,
    token,
    token_type,
  ]);
  return response;
};
