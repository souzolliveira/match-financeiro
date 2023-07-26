const db = require("../config/database");

exports.selectEmailAndPasswordDAO = async ({ email, password }) => {
  const response = await db.query(
    "SELECT id, name, email, plan, payment FROM users WHERE email = $1 and password = $2",
    [email, password]
  );
  return response;
};
