const { httpCode, httpMessage } = require("../enumerations/httpResponse");
const { getUserBySessionGuid } = require("../user/model");
const { createSummaryModel } = require("./model");

exports.listSummaryController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};

exports.createSummaryController = async (req, res) => {
  const { session_guid } = req.headers;
  const { asset, quantity, unitary_value, total, last_update } = req.body;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }

  try {
    const { code, message } = await createSummaryModel({
      asset,
      quantity,
      unitary_value,
      total,
      last_update,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editSummaryController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};

exports.deleteSummaryController = async (req, res) => {
  const { session_guid } = req.headers;

  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
    return;
  }
};
