import axios from 'axios';

export let APIKIT = axios.create({
  baseURL: 'http://192.168.1.6:8080/api/users',
  timeout: 1000000,
});
