const { selectCardByIdDAO } = require("../card/dao");
const { selectCategoryDAO } = require("../category/dao");
const { cardTypes } = require("../enumerations/card");
const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { paymentTypes } = require("../enumerations/payments");
const { transaction_types } = require("../enumerations/transactions");
const { now } = require("../helpers/time");
const { selectSubcategoryDAO } = require("../subcategory/dao");
const { insertExpenseDAO, listExpensesDAO } = require("./dao");

exports.listExpensesModel = async ({
  start_date,
  end_date,
  payment,
  category,
  subcategory,
  card,
  group_by,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let data = [];

  if (category) {
    const verifyCategory = await selectCategoryDAO({
      transaction_type: transaction_types.EXPENSE,
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
    if (verifySubcategory?.rowCount === 0) {
      code = httpCode.BAD_REQUEST;
      message = `É necessário informar uma subcategoria válida`;
      return { code, message };
    }
  }

  const listExpenses = await listExpensesDAO({
    start_date,
    end_date,
    payment,
    category,
    subcategory,
    card,
    group_by,
  });
  if (listExpenses.rowCount > 0) {
    code = httpCode.OK;
    message = "Despesas retornadas com sucesso!";
    data = listExpenses?.rows?.map((expense) => {
      return {
        id: expense.id ?? null,
        category_id: expense.category_id ?? null,
        category_name: expense.category_name ?? null,
        subcategory_id: expense.subcategory_id ?? null,
        subcategory_name: expense.subcategory_name ?? null,
        costing: expense.costing ?? null,
        card_id: expense.card_id ?? null,
        card_name: expense.card_name ?? null,
        value: expense.value ?? null,
        payment: expense.payment ?? null,
        installments: expense.installments ?? null,
        installment: expense.installment ?? null,
        expense_root: expense.expense_root ?? null,
        expense_date: expense.expense_date ?? null,
        observation: expense.observation ?? null,
        date: expense.date ?? null,
      };
    });
  } else {
    code = httpCode.OK;
    message = "Nenhuma despesa encontrada";
    data = [];
  }

  return { code, message, data };
};

exports.createExpenseModel = async ({
  subcategory,
  value,
  payment,
  card,
  installments,
  expense_date,
  observation,
  user_id,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  const date = now();

  console.log(0);

  if (!subcategory) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar a subcategoria da despesa";
    return { code, message };
  }

  const verifySubcategory = await selectSubcategoryDAO({
    id: subcategory,
    user_id,
  });
  if (
    verifySubcategory?.rows?.[0]?.transaction_type !== transaction_types.EXPENSE
  ) {
    code = httpCode.BAD_REQUEST;
    message = "Subcategoria não válida para cadastrar despesa";
    return { code, message };
  }

  if (!value) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o valor da despesa";
    return { code, message };
  }

  if (!payment || !paymentTypes[payment]) {
    code = httpCode.BAD_REQUEST;
    message = `É necessário informar o modo de pagamento válido para a despesa.  Valores permitidos: ${Object.keys(
      paymentTypes
    )}`;
    return { code, message };
  }

  if (!expense_date) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar a data do pagamento da despesa";
    return { code, message };
  }

  let verifyCard = null;
  if (payment === paymentTypes.CREDIT || payment === paymentTypes.DEBT) {
    if (!card) {
      code = httpCode.BAD_REQUEST;
      message = "É necessário informar o cartão para esse modo de pagamento";
      return { code, message };
    }

    verifyCard = await selectCardByIdDAO({
      id: card,
      user_id,
    });
    if (!verifyCard?.rows?.length) {
      code = httpCode.BAD_REQUEST;
      message = "Houve um erro com o cartão informado";
      return { code, message };
    }
    if (
      verifyCard?.rows?.[0].type !== payment &&
      verifyCard?.rows?.[0].type !== cardTypes.BOTH
    ) {
      code = httpCode.BAD_REQUEST;
      message = "O cartão informado não possui a forma de pagamento informada";
      return { code, message };
    }
  }

  if (payment === paymentTypes.CREDIT) {
    if (!installments) {
      code = httpCode.BAD_REQUEST;
      message =
        "É necessário informar a quantidade de parcelas para pagamento no crédito";
      return { code, message };
    }

    let paymentDate = null;
    let expenseDay = new Date(expense_date).getDate();
    let expenseMonth = new Date(expense_date).getMonth();
    let expenseYear = new Date(expense_date).getFullYear();
    let initialMonth = 0;
    let initialYear = 0;
    const paymentDay = verifyCard?.rows?.[0]?.payment_day;
    const expirationDay = verifyCard?.rows?.[0]?.expiration_day;

    let installment = 0;
    const installmentValues =
      parseInt(parseFloat(parseFloat(value) / parseFloat(installments)) * 100) /
      100;
    let installmentValue = parseFloat(0.0).toFixed(2);
    const rest =
      parseInt((value - installmentValues * installments) * 100) / 100;
    if (expenseDay >= expirationDay) {
      initialMonth = expenseMonth === 11 ? 0 : expenseMonth + 1;
      initialYear = initialMonth === 0 ? expenseYear + 1 : expenseYear;
    } else {
      initialMonth = expenseMonth;
      initialYear = expenseYear;
    }
    const initialDate = new Date(initialYear, initialMonth, paymentDay);
    let i = 0;
    let expense_root = null;
    while (i < installments) {
      if (i === 0) {
        paymentDate = initialDate;
        installmentValue = parseFloat(
          parseFloat(installmentValues) + parseFloat(rest)
        ).toFixed(2);
      } else {
        paymentDate = new Date(
          initialDate.setMonth(initialDate.getMonth() + 1)
        );
        installmentValue = installmentValues;
      }
      i += 1;
      installment = i;
      const createExpense = await insertExpenseDAO({
        subcategory,
        expense_date: paymentDate,
        value: installmentValue,
        payment,
        installments,
        installment,
        card_id: card,
        expense_root,
        observation,
        date,
      });
      if (createExpense.rowCount > 0) {
        expense_root = expense_root ?? createExpense?.rows?.[0]?.id;
        code = httpCode.CREATED;
        message = `Despesa criada com sucesso!`;
      }
    }
    return { code, message };
  } else {
    const createExpense = await insertExpenseDAO({
      subcategory,
      expense_date: expense_date,
      value,
      payment,
      installments: null,
      installment: null,
      card_id: null,
      expense_root: null,
      observation,
      date,
    });
    if (createExpense.rowCount > 0) {
      code = httpCode.CREATED;
      message = `Despesa criada com sucesso!`;
    }
  }

  return { code, message };
};

exports.editExpenseModel = async ({}) => {};

exports.deleteExpenseModel = async ({}) => {};
