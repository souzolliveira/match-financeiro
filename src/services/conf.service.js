import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://192.168.15.8:8080/api',
});

export default api;
