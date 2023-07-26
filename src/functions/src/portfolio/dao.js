const db = require("../config/database");

exports.createPortfolioDAO = async ({ asset, value, updated_at }) => {
  const response = await db.query(
    `
        INSERT INTO portfolios
          (
            assets_fk,
            value,
            updated_at
          )
        VALUES ($1, $2, $3)
      `,
    [asset, value, updated_at]
  );
  return response;
};
