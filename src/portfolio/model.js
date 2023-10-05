const { selectAssetsDAO } = require('../asset/dao');
const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { now } = require('../helpers/time');
const { createPortfolioDAO } = require('./dao');

// TODO
exports.listPortfolioModel = async () => {};

exports.createPortfolioModel = async ({ asset, value, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  const date = now();

  if (!asset) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o ativo que gerou o dividendo';
    return { code, message };
  }

  const verifyAsset = await selectAssetsDAO({ id: asset, user_id });
  if (verifyAsset.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar um id de ativo válido';
    return { code, message };
  }

  if (!value) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar a porcentagem do ativo em seu portfolio';
    return { code, message };
  }

  const createPortfolio = await createPortfolioDAO({
    asset,
    value,
    updated_at: date,
  });
  if (createPortfolio.rowCount > 0) {
    code = httpCode.CREATED;
    message = `Portfolio criado com sucesso!`;
  }

  return { code, message };
};

// TODO
exports.editPortfolioModel = async () => {};
// TODO

exports.deletePortfolioModel = async () => {};
