const md5 = require("md5");

exports.convertStringToMD5 = async (string) => {
  return md5(string);
};
