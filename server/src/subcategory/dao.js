const db = require('../config/database');

exports.selectSubcategoryDAO = async ({ id, category, costing, name, user_id }) => {
  const response = await db.query(
    `
      SELECT
        subcategories.id as id,
        subcategories.name as name,
        subcategories.costing as costing,
        categories.transaction_type as transaction_type,
        categories.id as category_id,
        categories.name as category_name
      FROM
        subcategories
      JOIN
        categories
      ON
        categories.id = subcategories.categories_fk
      WHERE
        categories.users_fk = ${user_id}
      ${id ? `and subcategories.id = ${id}` : ''}
      ${costing ? `and subcategories.costing = '${costing}'` : ''}
      ${category ? `and categories_fk = ${category}` : ''}
      ${name ? `and subcategories.name = '${name}'` : ''}`,
    []
  );
  return response;
};

exports.insertSubcategoryDAO = async ({ category, costing, name }) => {
  const response = await db.query(
    `INSERT INTO
      subcategories (
        categories_fk,
        name
        ${costing ? ', costing' : ''}
      )
      VALUES (
        $1,
        $2
        ${costing ? `, '${costing}'` : ''}
      )
      RETURNING id`,
    [category, name]
  );
  return response;
};

exports.updateSubcategoryDAO = async ({ id, name, costing }) => {
  const response = await db.query(
    `
      UPDATE
        subcategories
      SET 
        name = $1
        ${costing ? `, costing = '${costing}'` : ''}
      WHERE id = $2
    `,
    [name, id]
  );
  return response;
};

exports.deleteSubcategoryDAO = async ({ id }) => {
  const response = await db.query('DELETE FROM subcategories WHERE id = $1', [id]);
  return response;
};
