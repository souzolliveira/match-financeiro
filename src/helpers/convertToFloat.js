function convertToFloat(s) {
  return parseFloat(s?.replace(',', '.')).toFixed(2);
}

export default convertToFloat;
