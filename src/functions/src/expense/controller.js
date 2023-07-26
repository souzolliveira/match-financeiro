const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { getUserBySessionGuid } = require("../user/model");
const { createExpenseModel } = require("./model");

exports.listExpensesController = async (req, res) => {
  const { session_guid } = req.headers;
  const {
    start_date,
    end_date,
    payment,
    category,
    subcategory,
    card,
    group_by,
  } = req.query;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message, data } = await listExpensesModel({
      start_date,
      end_date,
      payment,
      category,
      subcategory,
      card,
      group_by,
    });
    res.status(code).send({ code, message, data });
    return;
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
    return;
  }
};

exports.createExpenseController = async (req, res) => {
  const { session_guid } = req.headers;
  const {
    subcategory,
    value,
    payment,
    card,
    installments,
    expense_date,
    observation,
  } = req.body;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  console.log(
    "entrou",
    subcategory,
    value,
    payment,
    card,
    installments,
    expense_date,
    observation
  );

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await createExpenseModel({
      subcategory,
      value,
      payment,
      card,
      installments,
      expense_date,
      observation,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editExpenseController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
  } catch {}
};

exports.deleteExpenseController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
  } catch {}
};
