import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import TextField from '../../components/TextField';
import Popup from '../../components/Popup';
import * as api from '../../controllers/ApiJournal';
import AsyncStorage from '@react-native-async-storage/async-storage';

function JournalGeneral() {
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState('');
  const [text, setText] = useState('');
  const currentDate = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const currentDay = currentDate.toLocaleDateString('en-US', options);

  const today = new Date(Date.now());
  const [theme, setTheme] = useState();

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
      console.log('ID', userId);
    }

    fetchData();
  }, []);

  const createJournal = async () => {
    let data = {
      user_id: userId,
      text: text,
      date: today,
    };
    await api.journalCreate(data).then((res) => {
      console.log(res);
    });
    navigation.goBack();
  };

  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: theme == 'dark' ? '#142F21' : 'white',

        flex: 1,
      }}
    >
      <Header
        dots
        screenName={currentDay}
        onBack={() => navigation.navigate('Home')}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <TextField
          journal
          inputStyle={{
            // height: 500,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
          value={text}
          onChange={(text) => setText(text)}
        />
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <TouchableOpacity
          style={styles.buttonnext}
          onPress={() => {
            setShowPopup(true);
            createJournal();
          }}
        >
          <Text style={{ color: 'white', fontSize: 22 }}>Add Journal</Text>
        </TouchableOpacity>
      </View>
      <Popup
        title={'Journal added successfully'}
        visible={showPopup}
        onPress={() => {
          setShowPopup(false);
          // navigation.navigate('Home');
        }}
      />
    </View>
  );
}

export default JournalGeneral;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'flex-start',
    color: '#142F21',
  },

  buttonnext: {
    display: 'flex',
    marginTop: 40,
    width: '100%',
    height: 55,
    backgroundColor: '#142F21',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
