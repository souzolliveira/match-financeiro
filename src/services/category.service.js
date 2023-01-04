import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function listCategory({ transactionType, handleError }) {
  return api
    .get(`/category/${transactionType}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .then(data => data.data)
    .catch(handleError);
}

const categoryService = {
  listCategory,
};

export default categoryService;
