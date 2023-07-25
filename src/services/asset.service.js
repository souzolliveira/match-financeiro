import authHeader from 'helpers/authHeader';
import handleResponse from 'helpers/handleResponse';

import api from './conf.service';

function create({ subcategory, quantifiable, name, handleError }) {
  return api
    .post(
      '/asset',
      { subcategory, name, quantifiable },
      {
        headers: authHeader(),
      }
    )
    .then(handleResponse)
    .catch(handleError);
}

function list({ handleError }) {
  return api
    .get('/assets', {
      headers: authHeader(),
    })
    .then(handleResponse)
    .then(data => data.data)
    .catch(handleError);
}

function update({ handleError }) {
  return api
    .put(
      '/asset',
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
    .delete(`/asset?${params}`, {
      headers: authHeader(),
    })
    .then(handleResponse)
    .catch(handleError);
}

const assetService = {
  create,
  list,
  update,
  remove,
};

export default assetService;
