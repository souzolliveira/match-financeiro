import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function create({ subcategory, date, value, observation, handleError }) {
  return api
    .post(
      '/income',
      { subcategory, income_date: date, value, observation },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

// todo
function update({ handleError }) {
  return api
    .put(
      '/income',
      {},
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

// todo
function remove({ params, handleError }) {
  return api
    .delete(`/income?${params}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const incomeService = {
  create,
  update,
  remove,
};

export default incomeService;
