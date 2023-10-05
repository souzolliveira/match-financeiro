const { selectCategoryDAO } = require('../category/dao');
const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { transaction_types } = require('../enumerations/transactions');
const { now, timezone } = require('../helpers/time');
const { selectSubcategoryDAO } = require('../subcategory/dao');
const { insertIncomeDAO, listIncomesDAO } = require('./dao');

exports.listIncomesModel = async ({ start_date, end_date, category, subcategory, group_by, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let data = [];

  if (category) {
    const verifyCategory = await selectCategoryDAO({
      transaction_type: transaction_types.INCOME,
      id: category,
      user_id,
    });
    if (verifyCategory.rowCount === 0) {
      code = httpCode.BAD_REQUEST;
      message = `É necessário informar uma categoria válida`;
      return { code, message };
    }
  }

  if (subcategory) {
    const verifySubcategory = await selectSubcategoryDAO({
      category,
      id: subcategory,
      user_id,
    });
    if (verifySubcategory.rowCount === 0) {
      code = httpCode.BAD_REQUEST;
      message = `É necessário informar uma subcategoria válida`;
      return { code, message };
    }
  }

  const listIncomes = await listIncomesDAO({
    start_date,
    end_date,
    category,
    subcategory,
    group_by,
    user_id,
  });
  if (listIncomes.rowCount > 0) {
    code = httpCode.OK;
    message = 'Receitas retornadas com sucesso!';
    data = listIncomes.rows.map(income => {
      return {
        id: income.id || null,
        category_id: income.category_id || null,
        category_name: income.category_name || null,
        subcategory_id: income.subcategory_id || null,
        subcategory_name: income.subcategory_name || null,
        value: income.value || null,
        income_date: timezone(income.income_date) || null,
        observation: income.observation || null,
        date: timezone(income.date) || null,
      };
    });
  } else {
    code = httpCode.OK;
    message = 'Nenhuma receita encontrada';
    data = [];
  }

  return { code, message, data };
};

exports.createIncomeModel = async ({ subcategory, value, income_date, observation, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  const date = now();

  if (!subcategory) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar a subcategoria da receita';
    return { code, message };
  }

  const verifySubcategory = await selectSubcategoryDAO({
    id: subcategory,
    user_id,
  });
  if (verifySubcategory.rows[0].transaction_type !== transaction_types.INCOME) {
    code = httpCode.BAD_REQUEST;
    message = 'Subcategoria não válida para cadastrar receita';
    return { code, message };
  }

  if (!value) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o valor da receita';
    return { code, message };
  }

  if (!income_date) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar a data do recebimento da receita';
    return { code, message };
  }

  const createIncome = await insertIncomeDAO({
    subcategory,
    value,
    income_date,
    observation,
    date,
  });
  if (createIncome.rowCount > 0) {
    code = httpCode.CREATED;
    message = `Receita criada com sucesso!`;
  }

  return { code, message };
};
