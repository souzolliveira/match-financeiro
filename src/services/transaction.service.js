import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function createTransaction({
  transactionType,
  categoryName,
  subcategoryName,
  transactionDate,
  transactionValue,
  transactionObservation,
  handleError,
}) {
  return api
    .post(
      `/transaction`,
      {
        transaction_type: transactionType,
        category: categoryName,
        subcategory: subcategoryName,
        transaction_date: transactionDate,
        value: transactionValue,
        observation: transactionObservation,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .then(data => data.data)
    .catch(handleError);
}

function updateTransaction({
  transaction,
  transactionType,
  categoryName,
  subcategoryName,
  transactionDate,
  transactionValue,
  transactionObservation,
  handleError,
}) {
  return api
    .put(
      '/transaction',
      {
        transaction,
        transactionType,
        categoryName,
        subcategoryName,
        transactionDate,
        transactionValue,
        transactionObservation,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

function deleteTransaction({ params, handleError }) {
  return api
    .delete(`/transaction?${params}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

function listTransactions({ params, handleError }) {
  return api
    .get(`/transactions?${params ?? ''}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

function lastUpdate({ handleError }) {
  return api
    .get('/transactions/last-update', {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const transactionService = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  listTransactions,
  lastUpdate,
};

export default transactionService;
