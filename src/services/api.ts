import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://cyberate.now.sh/api'
});

export default api;