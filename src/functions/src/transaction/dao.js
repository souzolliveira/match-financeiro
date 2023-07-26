const db = require("../config/database");
const { transaction_types } = require("../enumerations/transactions");

exports.listTransactionsDAO = async ({
  start_date,
  end_date,
  group_by,
  category = null,
  subcategory = null,
  asset = null,
  user_id,
}) => {
  const response = await db.query(
    `
      SELECT
        incomes.id as id,
        categories.id as category_id,
        categories.name as category_name,
        subcategories.id as subcategory_id,
        subcategories.name as subcategory_name,
        0 as asset_id,
        NULL as asset_name,
        NULL as costing,
        0 as card_id,
        NULL as card_name,
        NULL as payment,
        0 as installments,
        0 as installment,
        0 as expense_root,
        incomes.value as value,
        0 as quantity,
        0 as unitary_value,
        0 as total,
        0 as result,
        incomes.income_date as transaction_date,
        incomes.observation as observation,
        incomes.date as date,
        '${transaction_types.INCOME}' as transaction_type
      FROM incomes
      JOIN subcategories
        ON incomes.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 
        ${
          start_date
            ? `and incomes.income_date >= '${`${start_date} 00:00:00`}'`
            : ""
        }
        ${
          end_date
            ? `and incomes.income_date <= '${`${end_date} 23:59:59`}'`
            : ""
        }
        ${category ? `and subcategories.categories_fk = '${category}'` : ""}
        ${subcategory ? `and incomes.subcategories_fk = '${subcategory}'` : ""}

      UNION

      SELECT
        expenses.id as id,
        categories.id as category_id,
        categories.name as category_name,
        subcategories.id as subcategory_id,
        subcategories.name as subcategory_name,
        0 as asset_id,
        NULL as asset_name,
        subcategories.costing as costing,
        cards.id as card_id,
        cards.name as card_name,
        expenses.payment as payment,
        expenses.installments as installments,
        expenses.installment as installment,
        expenses.expense_root as expense_root,
        expenses.value as value,
        0 as quantity,
        0 as unitary_value,
        0 as total,
        0 as result,
        expenses.expense_date as transaction_date,
        expenses.observation as observation,
        expenses.date as date,
        '${transaction_types.EXPENSE}' as transaction_type
      FROM cards
      FULL JOIN expenses
        ON expenses.cards_fk = cards.id
      JOIN subcategories
        ON expenses.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 
        ${
          start_date
            ? `and expenses.expense_date >= '${`${start_date} 00:00:00`}'`
            : ""
        }
        ${
          end_date
            ? `and expenses.expense_date <= '${`${end_date} 23:59:59`}'`
            : ""
        }
        ${category ? `and subcategories.categories_fk = '${category}'` : ""}
        ${subcategory ? `and expenses.subcategories_fk = '${subcategory}'` : ""}

      UNION

      SELECT
        investiments.id as id,
        categories.id as category_id,
        categories.name as category_name,
        subcategories.id as subcategory_id,
        subcategories.name as subcategory_name,
        assets.id as asset_id,
        assets.name as asset_name,
        NULL as costing,
        0 as card_id,
        NULL as card_name,
        NULL as payment,
        0 as installments,
        0 as installment,
        0 as expense_root,
        0 as value,
        investiments.quantity as quantity,
        investiments.unitary_value as unitary_value,
        investiments.total as total,
        0 as result,
        investiments.investiment_date as transaction_date,
        investiments.observation as observation,
        investiments.date as date,
        '${transaction_types.INVESTIMENT}' as transaction_type
      FROM investiments
      JOIN assets
        ON investiments.assets_fk = assets.id
      JOIN subcategories
        ON assets.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 
        ${
          start_date
            ? `and investiments.investiment_date >= '${`${start_date} 00:00:00`}'`
            : ""
        }
        ${
          end_date
            ? `and investiments.investiment_date <= '${`${end_date} 23:59:59`}'`
            : ""
        }
        ${category ? `and subcategories.categories_fk = '${category}'` : ""}
        ${subcategory ? `and assets.subcategories_fk = '${subcategory}'` : ""}
        ${asset ? `and investiments.assets_fk = '${asset}'` : ""}

      UNION

      SELECT
        redemptions.id as id,
        categories.id as category_id,
        categories.name as category_name,
        subcategories.id as subcategory_id,
        subcategories.name as subcategory_name,
        assets.id as asset_id,
        assets.name as asset_name,
        NULL as costing,
        0 as card_id,
        NULL as card_name,
        NULL as payment,
        0 as installments,
        0 as installment,
        0 as expense_root,
        0 as value,
        redemptions.quantity as quantity,
        redemptions.unitary_value as unitary_value,
        redemptions.total as total,
        redemptions.result as result,
        redemptions.redemption_date as transaction_date,
        redemptions.observation as observation,
        redemptions.date as date,
        '${transaction_types.REDEMPTION}' as transaction_type
      FROM redemptions
      JOIN assets
        ON redemptions.assets_fk = assets.id
      JOIN subcategories
        ON assets.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 
        ${
          start_date
            ? `and redemptions.redemption_date >= '${`${start_date} 00:00:00`}'`
            : ""
        }
        ${
          end_date
            ? `and redemptions.redemption_date <= '${`${end_date} 23:59:59`}'`
            : ""
        }
        ${category ? `and subcategories.categories_fk = '${category}'` : ""}
        ${subcategory ? `and assets.subcategories_fk = '${subcategory}'` : ""}
        ${asset ? `and redemptions.assets_fk = '${asset}'` : ""}

      UNION

      SELECT
        dividends.id as id,
        categories.id as category_id,
        categories.name as category_name,
        subcategories.id as subcategory_id,
        subcategories.name as subcategory_name,
        assets.id as asset_id,
        assets.name as asset_name,
        NULL as costing,
        0 as card_id,
        NULL as card_name,
        NULL as payment,
        0 as installments,
        0 as installment,
        0 as expense_root,
        dividends.value as value,
        0 as quantity,
        0 as unitary_value,
        0 as total,
        0 as result,
        dividends.dividend_date as transaction_date,
        dividends.observation as observation,
        dividends.date as date,
        '${transaction_types.DIVIDEND}' as transaction_type
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
      
        ORDER BY transaction_date DESC
    `,
    []
  );
  return response;
};

exports.listTransactionsOnlyCardsDAO = async ({}) => {};

exports.listTransactionsWithoutCardsDAO = async ({}) => {};

exports.lastUpdateDAO = async ({ user_id }) => {
  const response = await db.query(
    `
    SELECT 
      MAX(date) as date
    FROM (

      SELECT 
        MAX(incomes.date) as date
      FROM incomes
      JOIN subcategories
        ON incomes.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id}

      UNION

      SELECT 
        MAX(expenses.date) as date
      FROM expenses
      JOIN subcategories
        ON expenses.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 

      UNION

      SELECT 
        MAX(investiments.date) as date
      FROM investiments
      JOIN assets
        ON investiments.assets_fk = assets.id
      JOIN subcategories
        ON assets.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 

      UNION

      SELECT 
        MAX(redemptions.date) as date
      FROM redemptions
      JOIN assets
        ON redemptions.assets_fk = assets.id
      JOIN subcategories
        ON assets.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id}

      UNION

      SELECT 
        MAX(dividends.date) as date
      FROM dividends
      JOIN assets
        ON dividends.assets_fk = assets.id
      JOIN subcategories
        ON assets.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id}
    
    ) as last_update`,
    []
  );
  return response;
};
