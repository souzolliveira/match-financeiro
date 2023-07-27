const db = require('../config/database');

exports.selectAssetsDAO = async ({ id, user_id }) => {
  const response = await db.query(
    `SELECT
        assets.id as asset_id,
        assets.name as asset_name,
        assets.quantifiable as quantifiable,
        subcategories.id as subcategory_id,
        subcategories.name as subcategory_name,
        categories.id as category_id,
        categories.name as category_name
      FROM
        assets
      JOIN 
        subcategories
      ON
        assets.subcategories_fk = subcategories.id
      JOIN
        categories
      ON
        categories.id = subcategories.categories_fk
      WHERE
        categories.users_fk = $1
        ${id ? `and assets.id = ${id}` : ''}
      `,
    [user_id]
  );
  return response;
};

exports.selectAssetByNameDAO = async ({ name, quantifiable, subcategory }) => {
  const response = await db.query(
    `
      SELECT
        name
      FROM
        assets
      WHERE
        name = $1 and
        quantifiable = $2 and
        subcategories_fk = $3`,
    [name, quantifiable, subcategory]
  );
  return response;
};

exports.insertAssetDAO = async ({ name, quantifiable, subcategory }) => {
  const response = await db.query('INSERT INTO assets (name, quantifiable, subcategories_fk) VALUES ($1, $2, $3)', [name, quantifiable, subcategory]);
  return response;
};

exports.updateAssetDAO = async ({ id, name, quantifiable }) => {
  const response = await db.query(
    `UPDATE assets
      SET name = $1,
        quantifiable = $2
      WHERE id = $3`,
    [name, quantifiable, id]
  );
  return response;
};

exports.deleteAssetDAO = async ({ id }) => {
  const response = await db.query(
    `
      DELETE FROM assets
      WHERE id = $1`,
    [id]
  );
  return response;
};
