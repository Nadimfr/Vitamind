import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiUser';
import LottieView from 'lottie-react-native';

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
      {history?.length !== 0 ? (
        <ScrollView style={{ marginBottom: 150 }}>
          {history.map((h, idx) => {
            const date = new Date(h.created_at);
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString(undefined, options);
            const isToday =
              formattedDate ===
              new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              });
            return (
              <TouchableOpacity
                key={idx}
                disabled={!isToday}
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
                // onPress={() => console.log('NADIM', h)}
                onPress={() =>
                  navigation.navigate('Recommender', {
                    history: h,
                  })
                }
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
                <Text style={{ color: 'grey', marginTop: 5 }}>
                  {isToday ? 'Today' : formattedDate}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '75%',
          }}
        >
          <LottieView
            source={require('../../lottieAnimations/History.json')}
            autoPlay
            loop
            style={{
              width: Dimensions.get('screen').width / 1.5,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato',
              color: 'lightgray',
              marginTop: -25,
            }}
          >
            No History
          </Text>
        </View>
      )}
    </View>
  );
};

export default History;
