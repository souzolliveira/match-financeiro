const moment = require("moment");

exports.now = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return moment(date).subtract(offset, "minutes");
};

exports.timezone = (dt) => {
  const date = new Date(dt);
  const offset = date.getTimezoneOffset();
  return moment(date).subtract(offset, "minutes");
};
