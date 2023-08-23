const { v4: uuidv4 } = require('uuid');

exports.generateUUID = async () => {
  return uuidv4();
};
