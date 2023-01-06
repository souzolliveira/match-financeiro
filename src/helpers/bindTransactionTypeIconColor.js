import transactionTypes from 'constants/transactionTypes';

const bindTransactionTypeIconColor = transactionType => {
  switch (transactionType) {
    case transactionTypes.INCOME:
      return 'var(--color-success)';
    case transactionTypes.EXPENSE:
      return 'var(--color-danger)';
    default:
      return null;
  }
};

export default bindTransactionTypeIconColor;
