import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function signIn({ email, password, handleError }) {
  return api
    .post(
      '/sign-in',
      {
        email,
        password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then(handleResponse)
    .then(session => session)
    .catch(handleError);
}

function signOut({ handleError }) {
  return api
    .delete('/sign-out', {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const authenticateService = {
  signIn,
  signOut,
};

export default authenticateService;
