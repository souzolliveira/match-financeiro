const { selectAssetsDAO } = require("../asset/dao");
const { selectCategoryDAO } = require("../category/dao");
const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { transaction_types } = require("../enumerations/transactions");
const { now, timezone } = require("../helpers/time");
const { selectSubcategoryDAO } = require("../subcategory/dao");
const { updateSummaryModel } = require("../summary/model");
const { insertRedemptionDAO, listRedemptionsDAO } = require("./dao");

exports.listRedemptionsModel = async ({
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

  const listRedemptions = await listRedemptionsDAO({
    start_date,
    end_date,
    category,
    subcategory,
    asset,
    group_by,
    user_id,
  });
  if (listRedemptions.rowCount > 0) {
    code = httpCode.OK;
    message = "Resgates retornados com sucesso!";
    data = listRedemptions?.rows?.map((redemption) => {
      return {
        id: redemption.id ?? null,
        category_id: redemption.category_id ?? null,
        category_name: redemption.category_name ?? null,
        subcategory_id: redemption.subcategory_id ?? null,
        subcategory_name: redemption.subcategory_name ?? null,
        asset_id: redemption.asset_id ?? null,
        asset_name: redemption.asset_name ?? null,
        quantity: redemption.quantity ?? null,
        unitary_value: redemption.unitary_value ?? null,
        total: redemption.total ?? null,
        result: redemption.result ?? null,
        redemption_date: timezone(redemption.redemption_date) ?? null,
        observation: redemption.observation ?? null,
        date: timezone(redemption.date) ?? null,
      };
    });
  } else {
    code = httpCode.OK;
    message = "Nenhum resgate encontrado";
    data = [];
  }

  return { code, message, data };
};

exports.createRedemptionModel = async ({
  asset,
  quantity,
  unitary_value,
  total,
  result,
  redemption_date,
  observation,
  user_id,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  const date = now();

  if (!asset) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o ativo do resgate";
    return { code, message };
  }

  const verifyAsset = await selectAssetsDAO({ id: asset, user_id });
  if (verifyAsset?.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar um id de ativo válido";
    return { code, message };
  }

  if (
    verifyAsset?.rows?.[0]?.quantifiable &&
    (quantity === null || unitary_value === null)
  ) {
    code = httpCode.BAD_REQUEST;
    message =
      "É necessário informar a quantidade de cotas e o valor unitário do aporte para esse ativo";
    return { code, message };
  }

  if (!verifyAsset?.rows?.[0]?.quantifiable && total === null) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o valor total do aporte para esse ativo";
    return { code, message };
  }

  if (!redemption_date) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar a data do resgate";
    return { code, message };
  }

  const redemption =
    total !== null
      ? total
      : parseFloat(
          parseFloat(parseFloat(quantity) * parseFloat(unitary_value))
        ).toFixed(2);

  const verifySummary = await selectSummaryDAO({ id: asset, user_id });
  if (verifySummary?.rowCount > 0) {
    if (
      !verifyAsset?.rows?.[0]?.quantifiable &&
      verifySummary?.rows?.[0]?.total < redemption
    ) {
      code = httpCode.BAD_REQUEST;
      message =
        "É necessário informar um valor de resgate menor do que o valor já investido";
      return { code, message };
    } else if (
      verifyAsset?.rows?.[0]?.quantifiable &&
      verifySummary?.rows?.[0]?.quantity < quantity
    ) {
      code = httpCode.BAD_REQUEST;
      message =
        "É necessário informar uma quantidade de cotas para resgate menor do que a quantidade de cotas já compradas";
      return { code, message };
    }
  }

  const createRedemption = await insertRedemptionDAO({
    asset,
    quantity,
    unitary_value,
    total: redemption,
    result,
    redemption_date,
    observation,
    date,
  });
  if (createRedemption.rowCount > 0) {
    code = httpCode.CREATED;
    message = `Resgate criado com sucesso!`;
    // todo: gerar log de resgate
    const updateSummary = await updateSummaryModel({
      asset,
      quantity: quantity * -1,
      unitary_value,
      total: investiment,
      last_update: redemption_date,
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
