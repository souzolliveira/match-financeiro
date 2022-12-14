import api from 'services/conf.service';

export default function authHeader() {
  const currentSession = api.defaults.headers?.session_guid;
  if (!currentSession) return { session_guid: JSON.parse(localStorage.getItem('@match-financeiro:session'))?.session_guid };
  return {};
}
