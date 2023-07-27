const md5 = require('md5');

exports.convertStringToMD5 = async text => {
  return md5(text);
};
