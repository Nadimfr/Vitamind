import axios from 'axios';

export let APIKIT = axios.create({
  baseURL: 'http://192.168.1.111:8080/api/',
  timeout: 1000000,
});
