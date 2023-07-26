const db = require("../config/database");

exports.selectSummaryDAO = async ({ asset, user_id }) => {
  const response = await db.query(
    `
      SELECT
        summary.quantity as quantity,
        summary.average_price as average_price,
        summary.total as total,
        summary.last_update as last_update,
        assets.id as assetId,
        assets.name as assetName,
        assets.quantifiable as quantifiable,
        subcategories.id as subcategoryId,
        subcategories.name as subcategoryName,
        categories.id as categoryId,
        categories.name as categoryName
      FROM
        summary
      JOIN
        assets
      ON
        assets_fk = assets.id
      JOIN
        subcategories
      ON
        subcategories_fk = subcategories.id
      JOIN
        categories
      ON
        categories_fk = categories.id
      WHERE
        users_fk = $1
        ${asset ? `and assets_fk = ${asset}` : ""}
    `,
    [user_id]
  );
};

exports.insertSummaryDAO = async ({
  asset,
  quantity,
  average_price,
  total,
  last_update,
}) => {
  const response = db.query(
    `INSERT INTO summary
      (
        assets_fk,
        quantity,
        average_price,
        total,
        last_update,
      ) 
    VALEUS ($1, $2, $3, $4, $5)`,
    [asset, quantity, average_price, total, last_update]
  );
  return response;
};

exports.updateSummaryDAO = async ({
  asset,
  quantity,
  average_price,
  total,
  last_update,
}) => {
  const response = db.query(
    `UPDATE cards
    SET quantity = $1,
        average_price = $2,
        total = $3,
        last_update = $4
    WHERE assets_fk = $5`,
    [quantity, average_price, total, last_update, asset]
  );
  return response;
};
