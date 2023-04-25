import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function getUser({ handleError }) {
  return api
    .get('/user', {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

function updateUser({ name, email, handleError }) {
  return api
    .put(
      '/user',
      {
        name,
        email,
      },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

const userService = {
  getUser,
  updateUser,
};

export default userService;
