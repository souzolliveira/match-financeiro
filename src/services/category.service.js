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

const categoryService = {
  createCategory,
  listCategory,
};

export default categoryService;
