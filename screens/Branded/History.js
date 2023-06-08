import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiUser';

const History = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
    }

    fetchData();

    api.getHistoryByUserId(userId).then((res) => {
      setHistory(res);
    });
  }, [history, userId]);

  return (
    <View>
      <Header screenName="History" dots onBack={() => navigation.goBack()} />
      {history.map((h, idx) => {
        const date = new Date(h.created_at);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        return (
          <View
            style={{
              marginHorizontal: '10%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottomColor: 'lightgrey',
              borderBottomWidth: 2,
              paddingBottom: 10,
              marginBottom: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins_SemiBold',
                  width: 150,
                }}
              >
                {h.text.split(',')[0]}
              </Text>
              <Text
                style={{
                  color: '#42A45C',
                  textTransform: 'capitalize',
                  fontSize: 16,
                  fontFamily: 'Lato',
                }}
              >
                {h.text.split(',')[1] == 'noemo'
                  ? 'No Emotions'
                  : h.text.split(',')[1]}
              </Text>
            </View>
            <Text style={{ color: 'grey', marginTop: 5 }}>{formattedDate}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default History;
