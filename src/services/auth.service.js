import handleResponse from 'helpers/handleResponse';
import api from './conf.service';

function authenticate(username, password, handleError) {
  return api
    .post(
      '/session',
      JSON.stringify({
        username,
        password,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then(handleResponse)
    .then(session => session)
    .catch(handleError);
}

function logout(sessionGuid, handleError) {
  return api.delete(`/session/${sessionGuid}`).then(handleResponse).catch(handleError);
}

const authenticateService = {
  authenticate,
  logout,
};

export default authenticateService;
