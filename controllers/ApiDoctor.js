import { Alert } from 'react-native';
import { APIKIT } from './ApiKit';

export const getDoctors = async () => {
  return await APIKIT.get(`/doctors/`).then((res) => {
    // console.log('hiii', res);
    if (res.status == 200) return res.data;
    else Alert.alert(res.data);
  });
};

export const getDoctor = async (id) => {
  return await APIKIT.get(`/doctors/${id}`).then((res) => {
    // console.log('hiii', res);
    if (res.status == 200) return res.data;
    else Alert.alert(res.data);
  });
};
