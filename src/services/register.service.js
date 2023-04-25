import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function register({ name, email, password, handleError }) {
  return api
    .post(
      '/register',
      {
        name,
        email,
        password,
      },
      {}
    )
    .then(handleResponse)
    .catch(handleError);
}

const registerService = {
  register,
};

export default registerService;
