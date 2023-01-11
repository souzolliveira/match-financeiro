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
  return api
    .post(
      `/subcategory/${transactionType}`,
      {
        category_name: categoryName,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .then(data => data.data)
    .catch(handleError);
}

const subcategoryService = {
  createSubcategory,
  listSubcategory,
};

export default subcategoryService;
