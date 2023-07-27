const db = require('../config/database');
const { group_by_types } = require('../enumerations/group_by');

exports.listIncomesDAO = async ({ start_date, end_date, category, subcategory, group_by, user_id }) => {
  const response = await db.query(
    `
      SELECT
        ${
          !group_by
            ? `incomes.id as id,
              categories.id as category_id,
              categories.name as category_name,
              subcategories.id as subcategory_id,
              subcategories.name as subcategory_name,
              incomes.value as value,
              incomes.income_date as income_date,
              incomes.observation as observation,
              incomes.date as date`
            : ''
        }
        ${
          group_by === group_by_types.CATEGORY
            ? `categories.id as category_id,
              categories.name as category_name,
              sum(incomes.value) as value`
            : ''
        }
        ${
          group_by === group_by_types.SUBCATEGORY
            ? `categories.id as category_id,
              categories.name as category_name,
              subcategories.id as subcategory_id,
              subcategories.name as subcategory_name,
              sum(incomes.value) as value`
            : ''
        }
      FROM incomes
      JOIN subcategories
        ON incomes.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 
        ${start_date ? `and incomes.income_date >= '${`${start_date} 00:00:00`}'` : ''}
        ${end_date ? `and incomes.income_date <= '${`${end_date} 23:59:59`}'` : ''}
        ${category ? `and subcategories.categories_fk = '${category}'` : ''}
        ${subcategory ? `and incomes.subcategories_fk = '${subcategory}'` : ''}
        ${
          group_by === group_by_types.CATEGORY
            ? `GROUP BY 
              category_id,
              category_name`
            : ''
        }
        ${
          group_by === group_by_types.CATEGORY
            ? `GROUP BY
              category_id,
              category_name,
              subcategory_id,
              subcategory_name`
            : ''
        }
      ORDER BY income_date DESC
    `,
    []
  );
  return response;
};

exports.insertIncomeDAO = async ({ subcategory, value, income_date, observation, date }) => {
  const response = await db.query(
    `
      INSERT INTO incomes
        (
          subcategories_fk,
          value,
          income_date,
          observation,
          date
        )
      VALUES ($1, $2, $3, $4, $5)
    `,
    [subcategory, value, income_date, observation, date]
  );
  return response;
};

exports.editIncomeDAO = async ({}) => {};

exports.removeIncomeDAO = async ({}) => {};
