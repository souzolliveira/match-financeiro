const db = require('../config/database');
const { group_by_types } = require('../enumerations/group_by');

exports.listRedemptionsDAO = async ({ start_date, end_date, category, subcategory, asset, group_by, user_id }) => {
  const response = await db.query(
    `
    SELECT
      ${
        !group_by ?
          `redemptions.id as id,
            categories.id as category_id,
            categories.name as category_name,
            subcategories.id as subcategory_id,
            subcategories.name as subcategory_name,
            assets.id as asset_id,
            assets.name as asset_name,
            redemptions.quantity as quantity,
            redemptions.unitary_value as unitary_value,
            redemptions.total as total,
            redemptions.result as result,
            redemptions.redemption_date as redemption_date,
            redemptions.observation as observation,
            redemptions.date as date` :
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
            sum(redemptions.total) as total,
            sum(redeptions.result) as result
            sum(redemptions.quantity) as quantity,
            sum(redemptions.unitary_value * redemptions.quantity) as unitary_value` :
          ''
      }
    FROM redemptions
    JOIN assets
      ON redemptions.assets_fk = assets.id
    JOIN subcategories
      ON assets.subcategories_fk = subcategories.id
    JOIN categories
      ON subcategories.categories_fk = categories.id
    WHERE categories.users_fk = ${user_id} 
      ${start_date ? `and redemptions.redemption_date >= '${`${start_date} 00:00:00`}'` : ''}
      ${end_date ? `and redemptions.redemption_date <= '${`${end_date} 23:59:59`}'` : ''}
      ${category ? `and subcategories.categories_fk = '${category}'` : ''}
      ${subcategory ? `and assets.subcategories_fk = '${subcategory}'` : ''}
      ${asset ? `and redemptions.assets_fk = '${asset}'` : ''}
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
            result,
            quantity,
            unitary_value` :
          ''
      }
    ORDER BY redemption_date DESC
  `,
    []
  );
  return response;
};

exports.insertRedemptionDAO = async ({ asset, quantity, unitary_value, total, result, redemption_date, observation, date }) => {
  const response = await db.query(
    `
        INSERT INTO redemptions
          (
            assets_fk,
            quantity,
            unitary_value,
            total,
            result,
            redemption_date,
            observation,
            date
          )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
    [asset, quantity, unitary_value, total, result, redemption_date, observation, date]
  );
  return response;
};

exports.editRedemptionDAO = async ({}) => {};

exports.removeRedemptionDAO = async ({}) => {};
