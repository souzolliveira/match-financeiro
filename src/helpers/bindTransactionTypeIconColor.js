import transactionTypes from 'constants/transactionTypes';

const bindTransactionTypeIconColor = transactionType => {
  switch (transactionType) {
    case transactionTypes.INCOME:
      return 'var(--color-success)';
    case transactionTypes.EXPENSE:
      return 'var(--color-danger)';
    case transactionTypes.INVESTIMENT:
      return 'var(--color-info)';
    default:
      return null;
  }
};

export default bindTransactionTypeIconColor;
