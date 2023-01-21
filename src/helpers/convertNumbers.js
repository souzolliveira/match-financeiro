function convertToFloat(s) {
  return parseFloat(s?.replace(',', '.')).toFixed(2);
}

function convertToString(n) {
  return n?.replace('.', ',');
}

const convertNumbers = { convertToFloat, convertToString };

export default convertNumbers;
