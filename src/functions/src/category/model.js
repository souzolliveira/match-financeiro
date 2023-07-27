const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { transaction_types } = require('../enumerations/transactions');
const { selectSubcategoryDAO } = require('../subcategory/dao');
const { listTransactionsDAO } = require('../transaction/dao');
const { selectCategoryDAO, insertCategoryDAO, updateCategoryDAO, deleteCategoryDAO } = require('./dao');

exports.listCategoryModel = async ({ transaction_type, user_id }) => {
  let code = httpCode.ERROR;
  const message = httpMessage.ERROR;
  let data = [];

  const listCategory = await selectCategoryDAO({ transaction_type, user_id });
  if (listCategory) {
    code = httpCode.OK;
    data = listCategory.rows.map(row => {
      return {
        id: row.id,
        transaction_type: row.transaction_type,
        category_name: row.name,
      };
    });
    return { code, data };
  }

  return { code, message };
};

exports.createCategoryModel = async ({ transaction_type, name, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let id = null;

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o nome da categoria';
    return { code, message };
  }

  if (!transaction_type) {
    code = httpCode.BAD_REQUEST;
    message = `É necessário informar o tipo de transação da categoria`;
    return { code, message };
  }

  if (!transaction_types[transaction_type]) {
    code = httpCode.BAD_REQUEST;
    message = `Valor inválido para Tipo de Transação: ${transaction_type}. Valores permitidos: ${Object.keys(transaction_types)}`;
    return { code, message };
  }

  const verifyCategoryName = await selectCategoryDAO({
    transaction_type,
    name,
    user_id,
  });
  if (verifyCategoryName.rows.length > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Já existe uma categoria ${name} para este tipo de transação`;
    return { code, message };
  }

  const createCategory = await insertCategoryDAO({
    transaction_type,
    name,
    user_id,
  });
  if (createCategory) {
    code = httpCode.CREATED;
    message = `Categoria ${name.toUpperCase()} criada com sucesso!`;
    id = createCategory.rows[0].id;
    return { code, message, id };
  }

  return { code, message };
};

exports.editCategoryModel = async ({ id, name, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o nome da categoria';
    return { code, message };
  }

  if (!id) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o id da categoria';
    return { code, message };
  }

  const verifyCategory = await selectCategoryDAO({
    id,
    user_id,
  });
  if (verifyCategory.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar um id de categoria válido';
    return { code, message };
  }

  const verifyCategoryName = await selectCategoryDAO({
    transaction_type: verifyCategory.rows[0].transaction_type,
    name,
    user_id,
  });
  if (verifyCategoryName.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Já existe uma categoria ${name} para este tipo de transação`;
    return { code, message };
  }

  const updateCategory = await updateCategoryDAO({
    id,
    name,
  });
  if (updateCategory.rowCount > 0) {
    code = httpCode.OK;
    message = `Categoria ${name} editada com sucesso!`;
    return { code, message };
  }

  return { code, message };
};

exports.deleteCategoryModel = async ({ id, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!id) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o id da categoria';
    return { code, message };
  }
  const verifyCategory = await selectCategoryDAO({
    id,
    user_id,
  });
  if (verifyCategory.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = `É necessário informar um id de categoria válido`;
    return { code, message };
  }

  const verifySubcategory = await selectSubcategoryDAO({
    category: id,
    user_id,
  });
  if (verifySubcategory.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Não é possível apagar a categoria, pois existem subcategorias vinculadas a ela`;
    return { code, message };
  }

  const verifyTransactions = await listTransactionsDAO({
    category: id,
    user_id,
  });
  if (verifyTransactions.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Não é possível apagar a categoria, pois existem transações vinculadas a ela`;
    return { code, message };
  }

  const deleteCategory = await deleteCategoryDAO({
    id,
    user_id,
  });
  if (deleteCategory.rowCount > 0) {
    code = httpCode.NO_CONTENT;
    return { code };
  }

  return { code, message };
};
