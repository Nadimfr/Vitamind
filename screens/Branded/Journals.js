import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiJournal';

const Journals = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [journals, setJournals] = useState([]);
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

  return (
    <View
      style={{
        backgroundColor: theme == 'dark' ? '#142F21' : 'white',
      }}
    >
      <Header screenName="Journals" dots onBack={() => navigation.goBack()} />

      <ScrollView
        style={{
          paddingHorizontal: 20,
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
                  }}
                >
                  <Text numberOfLines={3}>{j.text}</Text>
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
                }}
              >
                <Text numberOfLines={3}>{j.text}</Text>
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
    textAlign: 'Left',
    fontSize: 22,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'left',
    color: '#142F21',
    paddingHorizontal: 15,
  },
});
