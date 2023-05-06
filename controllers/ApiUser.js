import { Alert } from 'react-native';
import { APIKIT } from './ApiKit';

export const VerificationCodeReception = async (email) => {
  return await APIKIT.post('users/sendVerification', { email }).then((res) => {
    console.log(res.data);
    if (res.data) return res.data;
    else Alert.alert('Invalid User');
  });
};

export const userRegister = async (userInfo) => {
  return await APIKIT.post('users/register', userInfo).then((res) => {
    if (res.status == 200) {
      Alert.alert('User created successfully!');
      return res.data;
    } else Alert.alert('Error');
  });
};

export const userLogin = async (userInfo) => {
  return await APIKIT.post('users/login', userInfo).then((res) => {
    console.log(res.data);
    if (res.data) return res.data;
    else Alert.alert('Invalid User');
  });
};

export const userDelete = async (userId) => {
  return await APIKIT.post('users/delete', userId).then((res) => {
    console.log(res.data);
    // if (res.data) return res.data;
    // else Alert.alert('Invalid User');
  });
};

export const getUserDetails = async (id) => {
  return await APIKIT.get(`users/${id}`).then((res) => {
    if (res.data) return res.data;
    else Alert.alert(res.data);
  });
};
