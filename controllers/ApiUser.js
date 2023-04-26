import { Alert } from 'react-native';
import { APIKIT } from './ApiKit';

export const userLogin = async (userInfo) => {
  return await APIKIT.post('/login', userInfo).then((res) => {
    console.log(res.data);
    if (res.data) return res.data;
    else Alert.alert('Invalid User');
  });
};

export const getUserDetails = async () => {
  return await APIKIT.get('/api/users').then((res) => {
    if (res.data) return res.data;
    else Alert.alert(res.data);
  });
};
