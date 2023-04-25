import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function getCards({ handleError }) {
  return api
    .get('/cards', {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

function createCard({ name, expirationDay, paymentDay, type, handleError }) {
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

const cardService = {
  getCards,
  createCard,
};

export default cardService;