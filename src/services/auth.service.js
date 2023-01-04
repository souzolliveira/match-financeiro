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

const authenticateService = {
  signIn,
};

export default authenticateService;
