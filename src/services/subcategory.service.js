import transactionTypes from 'constants/transactionTypes';
import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function createSubcategory({ category, costing, name, transactionType, handleError }) {
  return api
    .post(
      '/subcategory',
      {
        category,
        name,
        costing: transactionType === transactionTypes.EXPENSE ? costing : null,
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

function updateSubcategory({ id, name, costing, handleError }) {
  return api
    .put(
      '/subcategory',
      {
        id,
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

function deleteSubcategory({ params, handleError }) {
  return api
    .delete(`/subcategory?${params}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const subcategoryService = {
  createSubcategory,
  listSubcategory,
  updateSubcategory,
  deleteSubcategory,
};

export default subcategoryService;
