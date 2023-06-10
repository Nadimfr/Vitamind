import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Button from '../../components/Button';
import axios from 'axios';
import TextField from '../../components/TextField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../../controllers/ApiUser';
import Ionicons from 'react-native-vector-icons/Ionicons';

function DetectText({ onBack }) {
  const [inputText, setInputText] = useState('');
  const [focus, setFocus] = useState(false);
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const analyzeEmotion = async () => {
    setMessage(inputText);
    setInputText('');
    try {
      const options = {
        method: 'POST',
        url: 'https://emodex-emotions-analysis.p.rapidapi.com/rapidapi/emotions',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key':
            '810b2d9819msh010a518e166457dp1d30f3jsnca3431feabfa',
          'X-RapidAPI-Host': 'emodex-emotions-analysis.p.rapidapi.com',
        },
        data: {
          sentence: inputText,
        },
      };
      const response = await axios.request(options);
      console.log(response.data);
      const emotions = response.data.sentence;

      // Find the highest emotion
      let highestEmotion = '';
      let highestEmotionValue = 0;

      for (const emotion in emotions) {
        if (emotions[emotion] > highestEmotionValue) {
          highestEmotion = emotion;
          highestEmotionValue = emotions[emotion];
        }
      }
      setResponse(highestEmotion);

      await api
        .getRecommendationByType(
          highestEmotion == 'sadness'
            ? 'sad'
            : highestEmotion == 'joy'
            ? 'happy'
            : highestEmotion
        )
        .then((res) => {
          setRecommendations(res);
        });
      let data = {
        user_id: userId,
        text: `Chat with us,${
          highestEmotion == 'sadness'
            ? 'sad'
            : highestEmotion == 'joy'
            ? 'happy'
            : highestEmotion
        }`,
        created_at: today,
      };
      await api.historyCreate(data).then((res) => {
        console.log('API REQ', res);
      });
    } catch (error) {}
  };

  const [userId, setUserId] = useState('');

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
      console.log('IDD', userId);
    }

    fetchData();
  }, []);

  const today = new Date(Date.now());

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={{ flex: 1, marginTop: 100 }}>
        <TouchableOpacity style={{ width: '33.33%' }} onPress={onBack}>
          <Ionicons name="chevron-back" color={'black'} size={25} />
        </TouchableOpacity>
        {message && (
          <View
            style={{
              alignSelf: 'flex-end',
              maxWidth: '75%',
              backgroundColor: '#B2ECC4',
              paddingHorizontal: 25,
              paddingVertical: 10,
              marginBottom: 10,
              borderRadius: 25,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {message}
            </Text>
          </View>
        )}
        {response && (
          <View>
            <Text style={{ marginLeft: 15, marginBottom: 2 }}>Vitamind</Text>
            <View
              style={{
                backgroundColor: '#42A45C',
                maxWidth: '75%',
                paddingHorizontal: 25,
                paddingVertical: 10,
                marginBottom: 10,
                borderRadius: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                }}
              >
                Hello Nadim, your message looks like {response}!{'\n'}
                {'\n'}Here is some recommendations VITAMIND will give you :{' '}
                {'\n'}
                {recommendations.map((r, idx) => {
                  console.log('TITLE', r.title);
                  return <Text>-{r.title}</Text>;
                })}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={{ paddingBottom: !focus ? 100 : 0 }}>
        <View style={{ marginBottom: 10 }}>
          <TextField
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={inputText}
            onChange={(e) => setInputText(e)}
            placeholder="Type your message..."
          />
        </View>
        <Button title="Send" onPress={analyzeEmotion} />
      </View>
    </KeyboardAvoidingView>
  );
}

export default DetectText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingHorizontal: '7%',
    paddingBottom: 25,
  },
});
