import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function createCategory({ name, transactionType, handleError }) {
  return api
    .post(
      '/category',
      {
        transaction_type: transactionType,
        name,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

function listCategory({ transactionType, handleError }) {
  let url = '/category';
  if (transactionType) {
    url += `/${transactionType}`;
  }
  return api
    .get(url, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .then(data => data.data)
    .catch(handleError);
}

function updateCategory({ name, newName, transactionType, handleError }) {
  return api
    .put(
      '/category',
      {
        transaction_type: transactionType,
        name,
        newName,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

const categoryService = {
  createCategory,
  listCategory,
  updateCategory,
};

export default categoryService;
