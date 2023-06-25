import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../controllers/ApiUser';

const HowAreYou = ({ name, onPress }) => {
  const [histories, setHistories] = useState([]);
  const [userId, setUserId] = useState('');
  const [todayText, setTodayText] = useState('');
  const [hasText, setHasText] = useState(false);

  function hasObjectWithDailyText(objects) {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const dailyText = 'Everyday';

    return objects.some((obj) => {
      const objDate = obj.created_at.slice(0, 10);
      const objText = obj.text.toLowerCase();
      setTodayText(objText);
      return objDate === today && objText.includes(dailyText.toLowerCase());
    });
  }

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
    }

    fetchData();

    api.getHistoryByUserId(userId).then((res) => {
      setHistories(res);
    });

    const varHasText = hasObjectWithDailyText(histories);
    setHasText(varHasText);
    console.log('first', hasText);
    // console.log('histories', histories);
  }, [userId]);

  return (
    <TouchableOpacity
      disabled={hasText}
      onPress={onPress}
      style={{
        width: '100%',
        height: 100,
        backgroundColor: 'red',
        borderRadius: 25,
        marginBottom: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#142F21',
        opacity: hasText && 0.5,
      }}
    >
      {!hasText && (
        <LottieView
          source={require('../lottieAnimations/gradient.json')}
          resizeMode="cover"
          autoPlay
          loop
          style={{
            borderRadius: 25,
            position: 'absolute',
          }}
        />
      )}
      <Text
        style={{ color: 'white', fontFamily: 'Poppins_SemiBold', fontSize: 20 }}
      >
        Hi {name},{'\n'}
        {!hasText
          ? 'How are you today?'
          : `You are${todayText.split(',')[1]} today!`}
      </Text>
    </TouchableOpacity>
  );
};

export default HowAreYou;
