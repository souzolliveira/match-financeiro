const bindBalanceColor = (balance, styles) => {
  if (balance > 0) return styles.balance__positive;
  if (balance < 0) return styles.balance__negative;
  return styles.balance__neutral;
};

export default bindBalanceColor;
