const { costing_types } = require('../enumerations/costing');
const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { transaction_types } = require('../enumerations/transactions');
const { timezone } = require('../helpers/time');
const { listTransactionsDAO, lastUpdateDAO } = require('./dao');

exports.listTransactionsModel = async ({ start_date, end_date, group_by, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let data = [];
  let balance = 0;
  let incomes = 0;
  let expenses = 0;
  let expenses_fixed = 0;
  let expenses_variable = 0;
  let investiments = 0;
  let redemptions = 0;
  let dividends = 0;

  const listTransactions = await listTransactionsDAO({
    start_date,
    end_date,
    group_by,
    user_id,
  });
  if (listTransactions.rowCount > 0) {
    code = httpCode.OK;
    message = 'Transaçãos retornadas com sucesso!';
    data = listTransactions.rows.map(transaction => {
      const value = parseFloat(transaction.value) || 0;
      const total = parseFloat(transaction.total) + (parseFloat(transaction.result) || 0);
      if (transaction.transaction_type === transaction_types.INCOME) incomes += value;
      else if (transaction.transaction_type === transaction_types.EXPENSE) {
        expenses += value;
        if (transaction.costing === costing_types.FIXED) expenses_fixed += value;
        else if (transaction.costing === costing_types.VARIABLE) expenses_variable += value;
      } else if (transaction.transaction_type === transaction_types.INVESTIMENT) investiments += total;
      else if (transaction.transaction_type === transaction_types.REDEMPTION) redemptions += total;
      else if (transaction.transaction_type === transaction_types.DIVIDEND) dividends += value;
      return {
        id: transaction.id || null,
        category_id: transaction.category_id || null,
        category_name: transaction.category_name || null,
        subcategory_id: transaction.subcategory_id || null,
        subcategory_name: transaction.subcategory_name || null,
        asset_id: transaction.asset_id || null,
        asset_name: transaction.asset_name || null,
        costing: transaction.costing || null,
        card_id: transaction.card_id || null,
        card_name: transaction.card_name || null,
        payment: transaction.payment || null,
        installments: transaction.installments || null,
        installment: transaction.installment || null,
        expense_root: transaction.expense_root || null,
        value: value || null,
        quantity: transaction.quantity || null,
        unitary_value: transaction.unitary_value || null,
        total: total || null,
        result: transaction.result || null,
        transaction_date: timezone(transaction.transaction_date) || null,
        observation: transaction.observation || null,
        date: timezone(transaction.date) || null,
        transaction_type: transaction.transaction_type,
      };
    });
  } else {
    code = httpCode.OK;
    message = 'Nenhuma transação encontrada';
    data = [];
  }
  balance = parseFloat(incomes - expenses - investiments + redemptions + dividends)
    .toFixed(2)
    .replace('.', ',');
  incomes = parseFloat(incomes).toFixed(2).replace('.', ',');
  expenses = parseFloat(expenses).toFixed(2).replace('.', ',');
  expenses_fixed = parseFloat(expenses_fixed).toFixed(2).replace('.', ',');
  expenses_variable = parseFloat(expenses_variable).toFixed(2).replace('.', ',');
  investiments = parseFloat(investiments).toFixed(2).replace('.', ',');
  redemptions = parseFloat(redemptions).toFixed(2).replace('.', ',');
  dividends = parseFloat(dividends).toFixed(2).replace('.', ',');
  return {
    code,
    message,
    data,
    balance,
    incomes,
    expenses,
    expenses_fixed,
    expenses_variable,
    investiments,
    redemptions,
    dividends,
  };
};

exports.lastUpdateModel = async ({ user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let date = null;

  const lastUpdate = await lastUpdateDAO({
    user_id,
  });
  if (lastUpdate.rowCount > 0) {
    code = httpCode.OK;
    message = 'Última atualização retornada com sucesso';
    date = timezone(lastUpdate.rows[0].date);
  } else {
    code = httpCode.OK;
    message = 'Não há registros da última transação';
    date = null;
  }
  return { code, message, date };
};
