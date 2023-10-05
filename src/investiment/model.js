const { selectAssetsDAO } = require('../asset/dao');
const { selectCategoryDAO } = require('../category/dao');
const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { transaction_types } = require('../enumerations/transactions');
const { now, timezone } = require('../helpers/time');
const { selectSubcategoryDAO } = require('../subcategory/dao');
const { updateSummaryModel } = require('../summary/model');
const { insertInvestimentDAO, listInvestimentsDAO } = require('./dao');

exports.listInvestimentsModel = async ({ start_date, end_date, category, subcategory, asset, group_by, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let data = [];

  if (category) {
    const verifyCategory = await selectCategoryDAO({
      transaction_type: transaction_types.INVESTIMENT,
      id: category,
      user_id,
    });
    if (verifyCategory.rowCount === 0) {
      code = httpCode.BAD_REQUEST;
      message = 'É necessário informar uma categoria válida';
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
      message = 'É necessário informar uma subcategoria válida';
      return { code, message };
    }
  }

  if (asset) {
    const verifyAsset = await selectAssetsDAO({
      id: asset,
      user_id,
    });
    if (verifyAsset.rowCount === 0) {
      code = httpCode.BAD_REQUEST;
      message = 'É necessário informar um ativo válido';
      return { code, message };
    }
  }

  const listInvestiments = await listInvestimentsDAO({
    start_date,
    end_date,
    category,
    subcategory,
    asset,
    group_by,
    user_id,
  });
  if (listInvestiments.rowCount > 0) {
    code = httpCode.OK;
    message = 'Investimentos retornados com sucesso!';
    data = listInvestiments.rows.map(investiment => {
      return {
        id: investiment.id || null,
        category_id: investiment.category_id || null,
        category_name: investiment.category_name || null,
        subcategory_id: investiment.subcategory_id || null,
        subcategory_name: investiment.subcategory_name || null,
        asset_id: investiment.asset_id || null,
        asset_name: investiment.asset_name || null,
        quantity: investiment.quantity || null,
        unitary_value: investiment.unitary_value || null,
        total: investiment.total || null,
        investiment_date: timezone(investiment.investiment_date) || null,
        observation: investiment.observation || null,
        date: timezone(investiment.date) || null,
      };
    });
  } else {
    code = httpCode.OK;
    message = 'Nenhum investimento encontrado';
    data = [];
  }

  return { code, message, data };
};

exports.createInvestimentModel = async ({ asset, quantity, unitary_value, total, investiment_date, observation, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  const date = now();

  if (!asset) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o ativo do investimento';
    return { code, message };
  }

  const verifyAsset = await selectAssetsDAO({ id: asset, user_id });
  if (verifyAsset.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar um id de ativo válido';
    return { code, message };
  }

  if (verifyAsset.rows[0].quantifiable && (quantity === null || unitary_value === null)) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar a quantidade de cotas e o valor unitário do aporte para esse ativo';
    return { code, message };
  }

  if (!verifyAsset.rows[0].quantifiable && total === null) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o valor total do aporte para esse ativo';
    return { code, message };
  }

  if (!investiment_date) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar a data do aporte do investimento';
    return { code, message };
  }

  const investiment = total !== null ? total : parseFloat(parseFloat(parseFloat(quantity) * parseFloat(unitary_value))).toFixed(2);

  const createInvestiment = await insertInvestimentDAO({
    asset,
    quantity,
    unitary_value,
    total: investiment,
    investiment_date,
    observation,
    date,
  });
  if (createInvestiment.rowCount > 0) {
    code = httpCode.CREATED;
    message = `Investimento criado com sucesso!`;
    // todo: gerar log de investimento
    const updateSummary = await updateSummaryModel({
      asset,
      quantity,
      unitary_value,
      total: investiment,
      last_update: investiment_date,
      user_id,
    });
    if (updateSummary.code === httpCode.CREATED) {
      // todo: gera log de ok
    } else {
      // todo: gera log de erro
    }
  }

  return { code, message };
};
