import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import Button from '../../components/Button';
import axios from 'axios';
import TextField from '../../components/TextField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../../controllers/ApiUser';
import Header from '../../components/Header';
import * as WebBrowser from 'expo-web-browser';

function DetectText({ onBack, navigation }) {
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const _handlePressButtonAsync = async (link) => {
    let result = await WebBrowser.openBrowserAsync(link);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [Keyboard]);

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
          const randomIndex = Math.floor(Math.random() * (res.length - 3));
          setRecommendations(res.slice(randomIndex, randomIndex + 4));
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
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
      setUser(JSON.parse(userString));
      console.log(user?.image_url);
    }

    fetchData();
  }, []);

  const today = new Date(Date.now());

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Header onBack={onBack} dots />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
              position: 'relative',
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {message}
            </Text>
            <View>
              <Image
                style={{
                  position: 'absolute',
                  height: 35,
                  width: 35,
                  backgroundColor: 'black',
                  borderRadius: 50,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                  left: 0,
                }}
                src={`${user?.image_url}`}
                resizeMode="cover"
              />
            </View>
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
                Hello {user?.username}, your message looks like {response}!
                {'\n'}
                {'\n'}Here is some recommendations VITAMIND will give you :{' '}
                {'\n'}
                {'\n'}
                {recommendations.map((r, idx) => {
                  return (
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 18,
                          textDecorationLine: 'underline',
                          marginBottom: 5,
                        }}
                      >
                        {r.title}
                      </Text>
                      {r.details.map((r, idx) => (
                        <TouchableOpacity
                          onPress={() =>
                            r?.title == 'Journal'
                              ? navigation.navigate('Journals')
                              : _handlePressButtonAsync(r?.link_url)
                          }
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              marginVertical: 5,
                            }}
                          >
                            • {r.title ? r.title : r.link_url}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                })}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{ paddingBottom: !keyboardOpen ? 100 : 0 }}>
        <View style={{ marginBottom: 10 }}>
          <TextField
            value={inputText}
            onChange={(e) => setInputText(e)}
            placeholder="Type your message..."
            textDetector
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
