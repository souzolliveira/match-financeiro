const db = require("../config/database");
const { group_by_types } = require("../enumerations/group_by");

exports.listDividendsDAO = async ({
  start_date,
  end_date,
  category,
  subcategory,
  asset,
  group_by,
  user_id,
}) => {
  const response = await db.query(
    `
    SELECT
      ${
        !group_by
          ? `dividends.id as id,
            categories.id as category_id,
            categories.name as category_name,
            subcategories.id as subcategory_id,
            subcategories.name as subcategory_name,
            assets.id as asset_id,
            assets.name as asset_name,
            dividends.value as value,
            dividends.dividend_date as dividend_date,
            dividends.observation as observation,
            dividends.date as date`
          : ""
      }
      ${
        group_by === group_by_types.CATEGORY
          ? `categories.id as category_id,
            categories.name as category_name,
            sum(dividends.value) as value`
          : ""
      }
      ${
        group_by === group_by_types.SUBCATEGORY
          ? `categories.id as category_id,
            categories.name as category_name,
            subcategories.id as subcategory_id,
            subcategories.name as subcategory_name,
            sum(dividends.value) as value`
          : ""
      }
      ${
        group_by === group_by_types.ASSET
          ? `categories.id as category_id,
            categories.name as category_name,
            subcategories.id as subcategory_id,
            subcategories.name as subcategory_name,
            assets.id as asset_id,
            assets.name as asset_name,
            sum(dividends.value) as value`
          : ""
      }
    FROM dividends
    JOIN assets
      ON dividends.assets_fk = assets.id
    JOIN subcategories
      ON assets.subcategories_fk = subcategories.id
    JOIN categories
      ON subcategories.categories_fk = categories.id
    WHERE categories.users_fk = ${user_id} 
      ${
        start_date
          ? `and dividends.dividend_date >= '${`${start_date} 00:00:00`}'`
          : ""
      }
      ${
        end_date
          ? `and dividends.dividend_date <= '${`${end_date} 23:59:59`}'`
          : ""
      }
      ${category ? `and subcategories.categories_fk = '${category}'` : ""}
      ${subcategory ? `and assets.subcategories_fk = '${subcategory}'` : ""}
      ${asset ? `and dividends.assets_fk = '${asset}'` : ""}
      ${
        group_by === group_by_types.CATEGORY
          ? `GROUP BY 
            category_id,
            category_name`
          : ""
      }
      ${
        group_by === group_by_types.SUBCATEGORY
          ? `GROUP BY 
            category_id,
            category_name,
            subcategory_id,
            subcategory_name`
          : ""
      }
      ${
        group_by === group_by_types.ASSET
          ? `GROUP BY 
            category_id,
            category_name,
            subcategory_id,
            subcategory_name
            asset_id,
            asset_name`
          : ""
      }
    ORDER BY dividend_date DESC
  `,
    []
  );
  return response;
};

exports.createDividendDAO = async ({
  asset,
  value,
  dividend_date,
  observation,
  date,
}) => {
  const response = await db.query(
    `
      INSERT INTO dividends
        (
          assets_fk,
          value,
          dividend_date,
          observation,
          date
        )
      VALUES ($1, $2, $3, $4, $5)
    `,
    [asset, value, dividend_date, observation, date]
  );
  return response;
};

exports.editDividendDAO = async ({}) => {};

exports.removeDividendDAO = async ({}) => {};
