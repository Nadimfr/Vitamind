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
  return await APIKIT.post('users/login', userInfo)
    .then((res) => {
      if (res.status == 200) {
        return res;
      }
    })
    .catch((error) => {
      // console.log('NOP', error.response.status);
      return error.response.status;
    });
};

export const userDelete = async (userId) => {
  return await APIKIT.post('users/delete', userId).then((res) => {
    console.log(res.data);
    // if (res.data) return res.data;
    // else Alert.alert('Invalid User');
  });
};

export const getUserDetails = async (userId) => {
  return await APIKIT.get(`users/${userId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getQuiz = async () => {
  return await APIKIT.get(`/quiz/`).then((res) => {
    // console.log('hiii', res);
    if (res.status == 200) return res.data;
    else Alert.alert(res.data);
  });
};

export const getHistoryByUserId = async (userId) => {
  return await APIKIT.get(`history/${userId}`).then((res) => {
    return res.data;
  });
};

export const historyCreate = async (history) => {
  return await APIKIT.post('history/create', history).then((res) => {
    if (res.status == 200) {
      return res.data;
    } else Alert.alert('Error');
  });
};

export const getRecommendationByType = async (type) => {
  return await APIKIT.get(`recommendation/${type}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
