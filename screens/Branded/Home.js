import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import MotivationalQuote from '../../components/MotivationalQuote';
import { createClient } from 'pexels';
import Doctor from '../../components/Doctor';
import Chart from '../../components/Chart';
import { clearAll, removeKey } from '../../helpers/AsyncStorage';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as apiDr from '../../controllers/ApiDoctor';
import Popup from '../../components/Popup';
import axios from 'axios';
import MoodEveryday from '../../components/MoodEveryday';

function Home({ navigation }) {
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');
  const [token, setToken] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [dailyMood, setDailyMood] = useState(false);

  const client = createClient(
    'SQsOlDuKv74Jy3iwJOvik5rtkIT0STF9IJMykd57nxvDQLlefNbYyCTl'
  );
  const query = 'Mind';

  useEffect(() => {
    setTimeout(() => {
      setDailyMood(true);
    }, 5000);
  }, [dailyMood]);

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

  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    AsyncStorage.getItem('theme').then((theme) => {
      console.log(theme);
      if (theme) {
        setCurrentTheme(theme);
      }
    });
  }, [currentTheme]);

  useEffect(() => {
    apiDr.getDoctors().then((res) => {
      setDoctors(res);
    });
  }, [doctors]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme == 'dark' ? '#000' : '#fff',
        },
      ]}
    >
      {dailyMood && (
        <Modal visible>
          <MoodEveryday />
        </Modal>
      )}

      <Header screenName="Home" />

      <MotivationalQuote Quote={quote} Image={image} />

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
            color: 'black',
            fontFamily: 'Poppins_SemiBold',
            fontSize: 24,
            width: Dimensions.get('screen').width * 0.5,
          }}
        >
          Doctors available today
        </Text>

        <TouchableOpacity>
          <Text>see all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
        }}
      >
        {doctors.map((d, idx) => (
          <Doctor
            key={idx}
            online={d.status}
            image={d.image_url}
            onPress={() =>
              navigation.navigate('DoctorDetailed', {
                id: d._id,
              })
            }
          />
        ))}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 20,
          width: Dimensions.get('screen').width,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins_Regular',
            fontSize: 18,
          }}
        >
          Your mood throughout the week
        </Text>
      </View>

      <Chart />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
