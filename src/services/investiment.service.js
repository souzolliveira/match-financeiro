import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function create({ asset, quantity, unitaryValue, total, date, observation, handleError }) {
  return api
    .post(
      '/investiment',
      { asset, quantity, unitary_value: unitaryValue, total, investiment_date: date, observation },
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
      '/investiment',
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
    .delete(`/investiment?${params}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const investimentService = {
  create,
  update,
  remove,
};

export default investimentService;
