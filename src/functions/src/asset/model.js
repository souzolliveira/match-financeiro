const { listDividendsModel } = require('../dividend/model');
const { quantifiable_types } = require('../enumerations/assets');
const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { listInvestimentsModel } = require('../investiment/model');
const { listPortfolioModel } = require('../portfolio/model');
const { listRedemptionsModel } = require('../redemption/model');
const { listSummaryModel } = require('../summary/model');
const { selectAssetsDAO, selectAssetByNameDAO, insertAssetDAO, updateAssetDAO, deleteAssetDAO } = require('./dao');

exports.listAssetsModel = async ({ user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  const assets = await selectAssetsDAO({ user_id });
  if (assets.rowCount > 0) {
    code = httpCode.OK;
    message = 'Ativos retornados com sucesso';
    const response = assets.rows.map(row => {
      return {
        id: row.asset_id,
        name: row.asset_name,
        quantifiable: row.quantifiable ? quantifiable_types.QUANTIFIABLE : quantifiable_types.NOT_QUANTIFIABLE,
        subcategory_id: row.subcategory_id,
        subcategory_name: row.subcategory_name,
        category_id: row.category_id,
        category_name: row.category_name,
      };
    });
    return { code, message, data: response };
  }

  return { code, message };
};

exports.createAssetModel = async ({ name, subcategory, quantifiable }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o nome do ativo';
    return { code, message };
  }

  if (!subcategory) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar uma subcategoria válida para o ativo';
    return { code, message };
  }

  if (!quantifiable) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar se o ativo é quantizável';
    return { code, message };
  }

  const verifyAssetName = await selectAssetByNameDAO({
    name,
    quantifiable,
    subcategory,
  });
  if (verifyAssetName.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message = 'Já existe um ativo cadastrado nessa subcategoria com o nome informado';
    return { code, message };
  }

  const createAsset = await insertAssetDAO({
    name,
    quantifiable: quantifiable === quantifiable_types.QUANTIFIABLE,
    subcategory,
  });
  if (createAsset) {
    code = httpCode.CREATED;
    message = 'Ativo adicionado com sucesso';
    return { code, message };
  }

  return { code, message };
};

// TODO
exports.editAssetModel = async ({ id, name, quantifiable, subcategory, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!id) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o id do ativo';
    return { code, message };
  }

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o nome do ativo';
    return { code, message };
  }

  if (!quantifiable) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar se o ativo é quantizável';
    return { code, message };
  }

  if (!subcategory) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar uma subcategoria válida para o ativo';
    return { code, message };
  }

  const verifyEditedAssetName = await selectAssetByNameDAO({
    id,
    name,
    quantifiable,
    subcategory,
  });
  if (verifyEditedAssetName.Count > 0) {
    code = httpCode.BAD_REQUEST;
    message = 'Já existe um ativo cadastrado nessa subcategoria com o nome informado';
    return { code, message };
  }

  const updateAsset = await updateAssetDAO({
    id,
    quantifiable,
    name,
  });
  if (updateAsset) {
    code = httpCode.OK;
    message = 'Ativo editado com sucesso!';
  }

  return { code, message };
};

// TODO
exports.deleteAssetModel = async ({ id, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!id) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o ativo';
    return { code, message };
  }

  const verifyInvestiments = await listInvestimentsModel({ user_id });
  const verifyRedemptions = await listRedemptionsModel({ user_id });
  const verifyDividends = await listDividendsModel({ user_id });
  const verifySummary = await listSummaryModel({ user_id });
  if (verifyInvestiments.rowCount > 0 || verifyRedemptions.rowCount > 0 || verifyDividends.rowCount > 0 || verifySummary.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message = 'Não é possível apagar o ativo, pois existem transações vinculadas a ele';
    return { code, message };
  }
  const verifyPortfolio = await listPortfolioModel({ user_id });
  if (verifyPortfolio.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message = 'Não é possível apagar o ativo, pois ele está em seu portfólio';
    return { code, message };
  }

  const deleteAsset = await deleteAssetDAO({
    id,
  });
  if (deleteAsset.rowCount > 0) {
    code = httpCode.NO_CONTENT;
    return { code };
  }
  return { code, message };
};
