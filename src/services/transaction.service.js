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

function listTransactions({ handleError }) {
  return (api.get(`/transaction`),
  {
    headers: authHeader(),
  })
    .then(handleResponse)
    .then(data => data.data)
    .catch(handleError);
}

const transactionService = {
  createTransaction,
  listTransactions,
};

export default transactionService;
