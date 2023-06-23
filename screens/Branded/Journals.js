import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiJournal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Journals = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [journals, setJournals] = useState([]);
  const [theme, setTheme] = useState();
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const whatTheme = await AsyncStorage.getItem('theme');
      setTheme(whatTheme);
    }
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

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
        setJournals(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [journals]);

  // const handleDeleteJournal = async (journalId) => {
  //   console.log('first', journalId);
  //   try {
  //     const deletedJournal = await api.journalDelete(journalId);
  //     console.log('Journal deleted:', deletedJournal.data);
  //     // Perform any additional actions upon successful deletion
  //   } catch (error) {
  //     console.error('Failed to delete journal:', error);
  //     // Handle error
  //   }
  // };

  const handleDeleteJournal = async (journalId) => {
    console.log(journalId);
    try {
      const response = await axios.delete(
        `http://192.168.1.10:8080/api/journal/delete/${journalId}`
      );

      // Check the response status and handle accordingly
      if (response.status === 200) {
        api.getAllJournalsByUserId(userId).then((res) => {
          setJournals(res);
        });
        setPopup(true);
      } else {
        console.log('Error deleting journal');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Journal not found');
      } else {
        console.error('Delete Journal Error:', error);
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme == 'dark' ? '#142F21' : 'white',
      }}
    >
      <Header screenName="Journals" dots onBack={() => navigation.goBack()} />

      {popup && (
        <Popup
          title="Journal Deleted"
          description="Journal deleted successfully"
          onPress={() => setPopup(false)}
        />
      )}

      <ScrollView
        style={{
          paddingHorizontal: 20,
          height: '100%',
        }}
      >
        <Button
          theme={theme}
          title="Create"
          onPress={() => navigation.navigate('Journal')}
        />

        {journals.map((j, idx) => {
          const date = new Date(j.date);
          const options = { weekday: 'long', month: 'long', day: 'numeric' };
          const formattedDate = date.toLocaleDateString(undefined, options);

          if (
            idx === 0 ||
            formattedDate !==
              new Date(journals[idx - 1].date).toLocaleDateString(
                undefined,
                options
              )
          ) {
            return (
              <View key={idx}>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.titleheading}>{formattedDate}</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 90,
                    borderRadius: 25,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: 'green',
                    marginVertical: 15,
                    marginBottom: idx === journals.length - 1 && 200,
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ width: '90%' }} numberOfLines={3}>
                    {j.text}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteJournal(j._id)}
                    activeOpacity={0.5}
                  >
                    <Ionicons name="trash" color={'black'} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else {
            return (
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
                  marginBottom: idx === journals.length - 1 && 200,
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ width: '90%' }} numberOfLines={3}>
                  {j.text}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDeleteJournal(j._id)}
                  activeOpacity={0.5}
                >
                  <Ionicons name="trash" color={'black'} size={25} />
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default Journals;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: 'left',
    fontSize: 22,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'flex-start',
    color: '#142F21',
    paddingHorizontal: 15,
  },
});
