import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

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
  listSubcategory,
};

export default subcategoryService;
