import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function create({ subcategory, date, payment, installments, card, value, observation, handleError }) {
  return api
    .post(
      '/expense',
      { subcategory, value, payment, card, installments, expense_date: date, observation },
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
      '/expense',
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
    .delete(`/expense?${params}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const expenseService = {
  create,
  update,
  remove,
};

export default expenseService;
