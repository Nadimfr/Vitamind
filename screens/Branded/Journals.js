import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiJournal';

const Journals = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
    }
    fetchData();
  }, []);

  useEffect(() => {
    try {
      api.getAllJournalsByUserId(userId).then((res) => {
        console.log(res, 'LOL');
        setJournals(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [journals]);

  return (
    <View>
      <Header screenName="Journals" dots onBack={() => navigation.goBack()} />

      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* <TouchableOpacity>
            <Text>Add</Text>
        </TouchableOpacity> */}
        <Button title="Create" onPress={() => navigation.navigate('Journal')} />
        {journals.map((j, idx) => (
          <View
            key={idx}
            style={{
              width: '100%',
              height: 100,
              borderRadius: 25,
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: 'green',
              marginVertical: 15,
              marginBottom: idx == journals.length - 1 && 200,
              padding: 15,
            }}
          >
            <Text>{j.text}</Text>
            <Text>{j.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Journals;
