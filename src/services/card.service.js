import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function list({ handleError }) {
  return api
    .get('/cards', {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

function create({ name, expirationDay, paymentDay, type, handleError }) {
  return api
    .post(
      '/card',
      {
        name,
        expiration_day: expirationDay,
        payment_day: paymentDay,
        type,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

function update({ id, card, handleError }) {
  return api
    .put(
      '/card',
      {
        id,
        card,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

function remove({ id, handleError }) {
  return api
    .delete(`/card?id=${id}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const cardService = {
  list,
  create,
  update,
  remove,
};

export default cardService;
