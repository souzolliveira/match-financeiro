const db = require("../config/database");

exports.selectCategoryDAO = async ({ id, transaction_type, name, user_id }) => {
  const response = await db.query(
    `SELECT * FROM categories WHERE users_fk = $1
    ${id ? `and id = '${id}'` : ""}
    ${transaction_type ? `and transaction_type = '${transaction_type}'` : ""}
    ${name ? `and name = '${name}'` : ""}`,
    [user_id]
  );
  return response;
};

exports.insertCategoryDAO = async ({ transaction_type, name, user_id }) => {
  const response = await db.query(
    `INSERT INTO categories 
      (users_fk, name, transaction_type) 
    VALUES ($1, $2, $3)
    RETURNING id`,
    [user_id, name, transaction_type]
  );
  return response;
};

exports.updateCategoryDAO = async ({ id, name }) => {
  const response = await db.query(
    "UPDATE categories SET name = $1 WHERE id = $2",
    [name, id]
  );
  return response;
};

exports.deleteCategoryDAO = async ({ id, user_id }) => {
  const response = await db.query(
    "DELETE FROM categories WHERE id = $1 and users_fk = $2",
    [id, user_id]
  );
  return response;
};
