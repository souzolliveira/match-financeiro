const { selectAssetsDAO } = require("../asset/dao");
const { selectCategoryDAO } = require("../category/dao");
const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { transaction_types } = require("../enumerations/transactions");
const { now, timezone } = require("../helpers/time");
const { selectSubcategoryDAO } = require("../subcategory/dao");
const { createDividendDAO, listDividendsDAO } = require("./dao");

exports.listDividendsModel = async ({
  start_date,
  end_date,
  category,
  subcategory,
  asset,
  group_by,
  user_id,
}) => {
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
      message = "É necessário informar uma categoria válida";
      return { code, message };
    }
  }

  if (subcategory) {
    const verifySubcategory = await selectSubcategoryDAO({
      category,
      id: subcategory,
      user_id,
    });
    if (verifySubcategory?.rowCount === 0) {
      code = httpCode.BAD_REQUEST;
      message = "É necessário informar uma subcategoria válida";
      return { code, message };
    }
  }

  if (asset) {
    const verifyAsset = await selectAssetsDAO({
      id: asset,
      user_id,
    });
    if (verifyAsset?.rowCount === 0) {
      code = httpCode.BAD_REQUEST;
      message = "É necessário informar um ativo válido";
      return { code, message };
    }
  }

  const listDividends = await listDividendsDAO({
    start_date,
    end_date,
    category,
    subcategory,
    asset,
    group_by,
    user_id,
  });
  if (listDividends.rowCount > 0) {
    code = httpCode.OK;
    message = "Dividendos retornados com sucesso!";
    data = listDividends?.rows?.map((dividend) => {
      return {
        id: dividend.id ?? null,
        category_id: dividend.category_id ?? null,
        category_name: dividend.category_name ?? null,
        subcategory_id: dividend.subcategory_id ?? null,
        subcategory_name: dividend.subcategory_name ?? null,
        asset_id: dividend.asset_id ?? null,
        asset_name: dividend.asset_name ?? null,
        value: dividend.value ?? null,
        dividend_date: timezone(dividend.dividend_date) ?? null,
        observation: dividend.observation ?? null,
        date: timezone(dividend.date) ?? null,
      };
    });
  } else {
    code = httpCode.OK;
    message = "Nenhum dividendo encontrado";
    data = [];
  }

  return { code, message, data };
};

exports.createDividendModel = async ({
  asset,
  value,
  dividend_date,
  observation,
  user_id,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  const date = now();

  if (!asset) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o ativo que gerou o dividendo";
    return { code, message };
  }

  const verifyAsset = await selectAssetsDAO({ id: asset, user_id });
  if (verifyAsset?.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar um id de ativo válido";
    return { code, message };
  }

  if (!value) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o valor recebido dos dividendos";
    return { code, message };
  }

  if (!dividend_date) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar a data do recebimento do dividendo";
    return { code, message };
  }

  const createDividend = await createDividendDAO({
    asset,
    value,
    dividend_date,
    observation,
    date,
  });
  if (createDividend?.rowCount > 0) {
    code = httpCode.CREATED;
    message = `Dividendo criado com sucesso!`;
  }

  return { code, message };
};
