import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function register({ name, email, phone, password, handleError }) {
  return api
    .post(
      '/register',
      {
        name,
        email,
        password,
        phone,
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
