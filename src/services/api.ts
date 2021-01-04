import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dev-bfutema-portfolio.com.br/air-cnc',
});

export default api;
