const { insertTokenDAO, deleteTokenDAO, deleteAllTokensDAO } = require('./dao');

exports.createTokenModel = async ({ token, token_type, user_id }) => {
  await deleteAllTokensDAO({ user_id, token_type });
  try {
    const insertToken = await insertTokenDAO({ token, token_type, user_id });
    return insertToken;
  } catch (error) {
    return null;
  }
};

exports.removeTokenModel = async ({ user_id, token, token_type }) => {
  try {
    const removeToken = await deleteTokenDAO({ token, token_type, user_id });
    if (removeToken.rowCount > 0) return removeToken;
    return null;
  } catch (error) {
    return null;
  }
};
