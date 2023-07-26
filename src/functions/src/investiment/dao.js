const db = require('../config/database');
const { group_by_types } = require('../enumerations/group_by');

exports.listInvestimentsDAO = async ({ start_date, end_date, category, subcategory, asset, group_by, user_id }) => {
  const response = await db.query(
    `
    SELECT
      ${
        !group_by ?
          `investiments.id as id,
            categories.id as category_id,
            categories.name as category_name,
            subcategories.id as subcategory_id,
            subcategories.name as subcategory_name,
            assets.id as asset_id,
            assets.name as asset_name,
            investiments.quantity as quantity,
            investiments.unitary_value as unitary_value,
            investiments.total as total,
            investiments.investiment_date as investiment_date,
            investiments.observation as observation,
            investiments.date as date` :
          ''
      }
      ${
        group_by === group_by_types.ASSET ?
          `categories.id as category_id,
            categories.name as category_name,
            subcategories.id as subcategory_id,
            subcategories.name as subcategory_name,
            assets.id as asset_id,
            assets.name as asset_name,
            sum(investiments.total) as total,
            sum(investiments.quantity) as quantity,
            sum(investiments.unitary_value * investiments.quantity) as unitary_value` :
          ''
      }
    FROM investiments
    JOIN assets
      ON investiments.assets_fk = assets.id
    JOIN subcategories
      ON assets.subcategories_fk = subcategories.id
    JOIN categories
      ON subcategories.categories_fk = categories.id
    WHERE categories.users_fk = ${user_id} 
      ${start_date ? `and investiments.investiment_date >= '${`${start_date} 00:00:00`}'` : ''}
      ${end_date ? `and investiments.investiment_date <= '${`${end_date} 23:59:59`}'` : ''}
      ${category ? `and subcategories.categories_fk = '${category}'` : ''}
      ${subcategory ? `and assets.subcategories_fk = '${subcategory}'` : ''}
      ${asset ? `and investiments.assets_fk = '${asset}'` : ''}
      ${
        group_by === group_by_types.ASSET ?
          `GROUP BY 
            category_id,
            category_name,
            subcategory_id,
            subcategory_name
            asset_id,
            asset_name,
            total,
            quantity,
            unitary_value` :
          ''
      }
    ORDER BY investiment_date DESC
  `,
    []
  );
  return response;
};

exports.insertInvestimentDAO = async ({ asset, quantity, unitary_value, total, investiment_date, observation, date }) => {
  const response = await db.query(
    `
      INSERT INTO investiments
        (
          assets_fk,
          quantity,
          unitary_value,
          total,
          investiment_date,
          observation,
          date
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [asset, quantity, unitary_value, total, investiment_date, observation, date]
  );
  return response;
};

exports.editInvestimentDAO = async ({}) => {};

exports.removeInvestimentDAO = async ({}) => {};
