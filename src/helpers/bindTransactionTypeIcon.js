import transactionTypes from 'constants/transactionTypes';

const bindTransactionTypeIcon = transactionType => {
  switch (transactionType) {
    case transactionTypes.INCOME:
      return 'income';
    case transactionTypes.EXPENSE:
      return 'expense';
    case transactionTypes.INVESTIMENT:
      return 'expense';
    default:
      return null;
  }
};

export default bindTransactionTypeIcon;
