import { Alert } from 'react-native';
import { APIKIT } from './ApiKit';

export const journalCreate = async (journal) => {
  return await APIKIT.post('journal/create', journal).then((res) => {
    if (res.status == 200) {
      Alert.alert('Journal created successfully!');
      return res.data;
    } else Alert.alert('Error');
  });
};

export const getAllJournalsByUserId = async (userId) => {
  return await APIKIT.get(`journal/${userId}`).then((res) => {
    return res.data;
  });
};

export const journalDelete = async (journalId) => {
  return await APIKIT.delete(`journal/delete/${journalId}`).then((res) => {
    if (res.status == 200) {
      Alert.alert('Journal deleted successfully!');
      return res;
    } else Alert.alert('Error');
  });
};
