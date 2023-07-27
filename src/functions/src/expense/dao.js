const db = require('../config/database');
const { group_by_types } = require('../enumerations/group_by');

exports.listExpensesDAO = async ({ start_date, end_date, payment, category, subcategory, card, group_by, user_id }) => {
  const response = await db.query(
    `
      SELECT
        ${
          !group_by
            ? `expenses.id as id,
              categories.id as category_id,
              categories.name as category_name,
              subcategories.id as subcategory_id,
              subcategories.name as subcategory_name,
              subcategories.costing as costing,
              cards.id as card_id,
              cards.name as card_name,
              expenses.value as value,
              expenses.payment as payment,
              expenses.installments as installments,
              expenses.installment as installment,
              expenses.expense_root as expense_root,
              expenses.expense_date as expense_date,
              expenses.observation as observation,
              expenses.date as date`
            : ''
        }
        ${
          group_by === group_by_types.CATEGORY
            ? `categories.id as category_id,
              categories.name as category_name,
              sum(expenses.value) as value`
            : ''
        }
        ${
          group_by === group_by_types.SUBCATEGORY
            ? `categories.id as category_id,
              categories.name as category_name,
              subcategories.id as subcategory_id,
              subcategories.name as subcategory_name,
              sum(expenses.value) as value`
            : ''
        }
        ${
          group_by === group_by_types.PAYMENT
            ? `expenses.payment as payment,
              sum(expenses.value) as value`
            : ''
        }
        ${
          group_by === group_by_types.COSTING
            ? `subcategories.costing as costing,
              sum(expenses.value) as value`
            : ''
        }
      FROM cards
      FULL JOIN expenses
        ON expenses.cards_fk = cards.id
      JOIN subcategories
        ON expenses.subcategories_fk = subcategories.id
      JOIN categories
        ON subcategories.categories_fk = categories.id
      WHERE categories.users_fk = ${user_id} 
        ${start_date ? `and expenses.expense_date >= '${`${start_date} 00:00:00`}'` : ''}
        ${end_date ? `and expenses.expense_date <= '${`${end_date} 23:59:59`}'` : ''}
        ${category ? `and subcategories.categories_fk = '${category}'` : ''}
        ${subcategory ? `and expenses.subcategories_fk = '${subcategory}'` : ''}
        ${payment ? `and expenses.payment = '${payment}'` : ''}
        ${card ? `and expenses.cards_fk = '${card}'` : ''}
        ${
          group_by === group_by_types.CATEGORY
            ? `GROUP BY 
              category_id,
              category_name`
            : ''
        }
        ${
          group_by === group_by_types.SUBCATEGORY
            ? `GROUP BY 
              category_id,
              category_name,
              subcategory_id,
              subcategory_name`
            : ''
        }
        ${group_by === group_by_types.PAYMENT ? `GROUP BY payment` : ''}
        ${group_by === group_by_types.COSTING ? `GROUP BY costing` : ''}
      ORDER BY expense_date DESC
    `,
    []
  );
  return response;
};

exports.insertExpenseDAO = async ({ subcategory, expense_date, value, payment, installments, installment, card_id, expense_root, observation, date }) => {
  const response = await db.query(
    `
      INSERT INTO expenses
        (
        subcategories_fk,
        value,
        payment,
        installments,
        installment,
        cards_fk,
        expense_root,
        expense_date,
        observation,
        date
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `,
    [subcategory, value, payment, installments, installment, card_id, expense_root, expense_date, observation, date]
  );
  return response;
};

exports.editExpenseDAO = async ({}) => {};

exports.removeExpenseDAO = async ({}) => {};
