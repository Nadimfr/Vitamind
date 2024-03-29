import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Header from '../../components/Header';
import MotivationalQuote from '../../components/MotivationalQuote';
import { createClient } from 'pexels';
import Doctor from '../../components/Doctor';
import * as apiDr from '../../controllers/ApiDoctor';
import Chart from '../../components/Chart';
import * as api from '../../controllers/ApiUser';
import moment from 'moment';
import Button from '../../components/Button';
import Dailyquestion from '../Branded/Dailyquestion';
import MoodEveryday from '../../components/MoodEveryday';
import { Audio } from 'expo-av';
import HowAreYou from '../../components/HowAreYou';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }) {
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');
  const [token, setToken] = useState('');
  const [time, setTime] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [counts, setCounts] = useState({});
  const [dailyMood, setDailyMood] = useState(false);
  const [morning, setMorning] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const today = new Date(Date.now());

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/sounds/Meditation.mp3')
        );
        setSoundObject(sound);
      } catch (error) {
        console.error('Error loading audio', error);
      }
    };

    loadAudio();
  }, []);

  const togglePlayback = async () => {
    if (soundObject) {
      if (isPlaying) {
        await soundObject.pauseAsync();
      } else {
        await soundObject.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const client = createClient(
    'SQsOlDuKv74Jy3iwJOvik5rtkIT0STF9IJMykd57nxvDQLlefNbYyCTl'
  );
  const query = 'nature';

  useEffect(() => {
    client.photos.search({ query, per_page: 1 }).then((photos) => {
      setImage(photos.photos[0].src.landscape);
    });

    // const fetchQuote = async () => {
    //   try {
    //     const options = {
    //       method: 'POST',
    //       url: 'https://qurotel-quotes.p.rapidapi.com/quotes/random',
    //       headers: {
    //         'content-type': 'application/json',
    //         'X-RapidAPI-Key':
    //           '6e3a44137cmshf321fbccc5cb04dp132bf2jsnbb7f3808ab4a',
    //         'X-RapidAPI-Host': 'quotel-quotes.p.rapidapi.com',
    //       },
    //       data: '{}',
    //     };
    //     const response = await axios.request(options);
    //     setQuote(response.data.quote);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchQuote();
  }, []);

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
      } catch (error) {
        console.log('Error fetching token:', error);
      }
    }

    fetchToken();
  }, [token]);

  const [userId, setUserId] = useState('');
  const [user, setUser] = useState();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
      setUser(JSON.parse(userString));
    }

    fetchData();

    api.getHistoryByUserId(userId).then((res) => {
      const texts = res.map((item) => item.text.split(',')[1]);
      setHistory(texts);
      const countsObj = {};
      texts.forEach((text) => {
        if (countsObj[text]) {
          countsObj[text] += 10;
        } else {
          countsObj[text] = 10;
        }
      });
      setCounts(countsObj);
    });
  }, [userId, history]);

  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    async function fetchData() {
      const whatTheme = await AsyncStorage.getItem('theme');
      setCurrentTheme(whatTheme);
    }
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

  useEffect(() => {
    apiDr.getDoctors().then((res) => {
      setDoctors(res);
    });
  }, [doctors]);

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: currentTheme == 'dark' ? '#142F21' : '#fff',
          },
        ]}
      >
        <Header screenName="Home" />

        {dailyMood && (
          <Modal visible>
            <MoodEveryday
              onSubmit={async (e) => {
                let data = {
                  user_id: userId,
                  text: `Everyday, ${e}`,
                  created_at: today,
                };
                await api.historyCreate(data).then((res) => {
                  console.log('API REQ', res);
                });

                setDailyMood(false);
              }}
            />
          </Modal>
        )}

        <StatusBar translucent backgroundColor="black" />

        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 25,
          }}
        >
          {/* HOW ARE YOU */}
          <HowAreYou
            theme={currentTheme}
            // disabled={hasObjectWithDailyText(histories) && true}
            onPress={() => setDailyMood(true)}
            name={user?.username}
            // text={todayText}
          />

          {/* LISTEN TO MUSIC */}
          <View
            style={{
              width: '100%',
              height: 200,
              backgroundColor:
                currentTheme == 'dark' ? '#42A45C' : 'rgba(66,164,92/0.25)',
              borderRadius: 25,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                padding: 20,
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={{ fontFamily: 'Lato' }}>To Do</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Poppins_SemiBold' }}>
                  Listen to Music
                </Text>
              </View>

              <Button
                title={isPlaying ? 'Pause' : 'Play'}
                onPress={togglePlayback}
              />
            </View>

            <Image
              source={{
                uri: 'https://w0.peakpx.com/wallpaper/327/1001/HD-wallpaper-music-alone-badboy-cartoon-iphone-love-music-on-night-pubg-thumbnail.jpg',
              }}
              resizeMode="cover"
              style={{
                width: '35%',
                height: '90%',
                borderBottomRightRadius: 50,
                borderBottomLeftRadius: 50,
                marginRight: 25,
              }}
            />
          </View>
        </View>

        {/* QUOTE */}
        <View style={{ alignSelf: 'center' }}>
          <MotivationalQuote Quote={quote} Image={image} />
        </View>

        {/* DOCTORS - START */}
        <View
          style={{
            paddingHorizontal: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: Dimensions.get('screen').width,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: currentTheme == 'dark' ? 'white' : 'black',
              fontFamily: 'Poppins_SemiBold',
              fontSize: 24,
              width: Dimensions.get('screen').width,
              marginBottom: 10,
            }}
          >
            Doctors available
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {doctors.map((d, idx) => (
            <View
              key={idx}
              style={{ marginRight: idx == doctors.length - 1 && 40 }}
            >
              <Doctor
                image={d.image_url}
                onPress={() =>
                  navigation.navigate('DoctorDetailed', {
                    id: d._id,
                  })
                }
              />
            </View>
          ))}
        </ScrollView>
        {/* DOCTORS - END */}

        {/* JOURNAL */}
        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Journals')}
            style={{ width: '100%', height: 125, borderRadius: 10 }}
          >
            <Image
              source={{
                uri: 'https://rare-gallery.com/thumbs/5401639-notebook-paper-pen-fountain-pen-writing-book-journaling-write-word-journal-nib-bokeh-blur-cursive-ledger-outdoor-literature-creative-commons-images.jpg',
              }}
              resizeMode="cover"
              style={{ width: '100%', height: 125, borderRadius: 10 }}
            />
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(66,164,92/0.5)',
                position: 'absolute',
                borderRadius: 10,
                justifyContent: 'center',
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontFamily: 'Poppins_SemiBold',
                  color: 'white',
                }}
              >
                Journal
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* MOOD BREAKDOWN */}
        <View
          style={{
            paddingHorizontal: 20,
            width: Dimensions.get('screen').width,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: currentTheme == 'dark' ? 'white' : 'black',

              fontFamily: 'Poppins_Regular',
              fontSize: 18,
              marginTop: 15,
            }}
          >
            Mood Breakdown
          </Text>
          <Text
            style={{
              color: 'grey',
              fontFamily: 'Poppins_Regular',
              fontSize: 14,
              marginTop: 2,
              marginBottom: 20,
            }}
          >
            Collected from mood detector activities.
          </Text>
          <Chart data={counts} theme={currentTheme} />
          <Text
            style={{
              color: 'grey',
              fontFamily: 'Poppins_Regular',
              fontSize: 14,
              marginTop: 5,
              marginBottom: 20,
            }}
          >
            NB: This is your all time history.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 42,
    fontFamily: 'Poppins',
    textAlign: 'left',
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text1: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: '#9E9C9B',
  },
  leftLine: {
    height: 2,
    width: '32%',
    marginHorizontal: 5,
  },
});
