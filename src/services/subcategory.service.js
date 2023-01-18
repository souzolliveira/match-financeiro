import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function createSubcategory({ category, costing, name, transactionType, handleError }) {
  return api
    .post(
      '/subcategory',
      {
        transaction_type: transactionType,
        category,
        name,
        costing,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

function listSubcategory({ transactionType, categoryName, handleError }) {
  let url = '/subcategory';
  if (transactionType) {
    url += `/${transactionType}`;
    if (categoryName) {
      url += `/${categoryName}`;
    }
  }
  return api
    .get(url, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .then(data => data.data)
    .catch(handleError);
}

const subcategoryService = {
  createSubcategory,
  listSubcategory,
};

export default subcategoryService;
