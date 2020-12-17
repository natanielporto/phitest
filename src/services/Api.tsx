import axios from 'axios';
import {BASE_URL, TOKEN} from 'react-native-dotenv';

const api = axios.create({
  headers: {
    Authorization: `token ${TOKEN}`,
  },
  baseURL: `${BASE_URL}`,
});

export default api;
