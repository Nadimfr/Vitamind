import axios from 'axios';

export let APIKIT = axios.create({
  baseURL: 'http://192.168.1.10:8080/api/',
  timeout: 1000000,
});
