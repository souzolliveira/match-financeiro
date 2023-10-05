const { selectCategoryDAO } = require('../category/dao');
const { costing_types } = require('../enumerations/costing');
const { httpCode, httpMessage } = require('../enumerations/httpResponse');
const { transaction_types } = require('../enumerations/transactions');
const { listTransactionsDAO } = require('../transaction/dao');
const { insertSubcategoryDAO, selectSubcategoryDAO, updateSubcategoryDAO, deleteSubcategoryDAO } = require('./dao');

exports.listSubcategoryModel = async ({ transaction_type, category_name, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let data = [];

  let category_fk = null;
  if (category_name) {
    category_fk = await selectCategoryDAO({
      transaction_type,
      name: category_name,
      user_id,
    });
    if (category_fk.rows.length === 0) {
      code = httpCode.BAD_REQUEST;
      message = `Não existe uma categoria com esse nome: ${category_name}`;
      return { code, message };
    }
  }

  const listSubcategory = await selectSubcategoryDAO({
    category: category_name ? category_fk.rows[0].id : null,
    user_id,
  });
  if (listSubcategory) {
    code = httpCode.OK;
    data = listSubcategory.rows.map(row => {
      return {
        id: row.id,
        category_id: row.category_id,
        category_name: row.category_name,
        costing: row.costing,
        subcategory_name: row.name,
        transaction_type: row.transaction_type,
      };
    });
    return { code, data };
  }

  return { code, message };
};

exports.createSubcategoryModel = async ({ category, name, costing, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let id = null;

  if (!category) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar a qual categoria a subcategoria fará parte';
    return { code, message };
  }

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o nome da subcategoria';
    return { code, message };
  }

  const verifySubcategoryName = await selectSubcategoryDAO({
    category,
    name,
    user_id,
  });
  if (verifySubcategoryName.rows.length > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Já existe uma subcategoria: ${name}, para a categoria informada`;
    return { code, message };
  }
  const verifyCategory = await selectCategoryDAO({ id: category, user_id });
  if (verifyCategory.rows[0].transaction_type === transaction_types.EXPENSE && (!costing || !costing_types[costing])) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o tipo de custo da subcategoria: FIXO ou VARIÁVEL';
    return { code, message };
  }

  const createSubcategory = await insertSubcategoryDAO({
    category,
    costing: verifyCategory.rows[0].transaction_type === transaction_types.EXPENSE ? costing_types[costing] : null,
    name,
  });
  if (createSubcategory) {
    code = httpCode.CREATED;
    message = `Subcategoria ${name.toUpperCase()} de categoria ${verifyCategory.rows[0].name.toUpperCase()} criada com sucesso!`;
    id = createSubcategory.rows[0].id;
  }
  return { code, message, id };
};

exports.editSubcategoryModel = async ({ id, name, costing, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o nome da subcategoria';
    return { code, message };
  }

  const verifySubcategoryName = await selectSubcategoryDAO({
    name,
    costing,
    user_id,
  });
  if (verifySubcategoryName.rows.length > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Já existe uma subcategoria com o nome: ${name}`;
    return { code, message };
  }

  const verifyCategory = await selectSubcategoryDAO({
    id,
    user_id,
  });
  if (verifyCategory.rows[0].transaction_type === transaction_types.EXPENSE && (!costing || !costing_types[costing])) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o tipo de custo da subcategoria válido: FIXO ou VARIÁVEL';
    return { code, message };
  }

  const updateSubcategory = await updateSubcategoryDAO({
    id,
    costing: verifyCategory.rows[0].transaction_type === transaction_types.EXPENSE ? costing_types[costing] : null,
    name,
  });
  if (updateSubcategory) {
    code = httpCode.CREATED;
    message = `Subcategoria ${name.toUpperCase()} editada com sucesso!`;
  }

  return { code, message };
};

exports.deleteSubcategoryModel = async ({ id, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!id) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar o id da subcategoria';
    return { code, message };
  }

  const verifySubcategory = await selectSubcategoryDAO({
    id,
    user_id,
  });
  if (verifySubcategory.rowCount === 0) {
    code = httpCode.BAD_REQUEST;
    message = 'É necessário informar um id de subcategoria válido';
    return { code, message };
  }

  const verifyTransactions = await listTransactionsDAO({
    transaction_type: verifySubcategory.rows[0].transaction_type,
    subcategory: id,
    user_id,
  });
  if (verifyTransactions.rowCount > 0) {
    code = httpCode.BAD_REQUEST;
    message = 'Não é possível apagar a subcategoria, pois existem transações vinculadas a ela';
    return { code, message };
  }

  const deleteCategory = await deleteSubcategoryDAO({
    id,
  });
  if (deleteCategory.rowCount > 0) {
    code = httpCode.NO_CONTENT;
    return { code };
  }

  return { code, message };
};
