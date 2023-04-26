import React, { useEffect, useState } from 'react';
import {
  Dimensions,
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
import { removeKey } from '../../helpers/AsyncStorage';
import { useNavigation } from '@react-navigation/native';

function Home({ navigation }) {
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState('');
  const drs = [
    { online: true },
    { online: false },
    { online: true },
    { online: true },
    { online: true },
  ];
  const client = createClient(
    'SQsOlDuKv74Jy3iwJOvik5rtkIT0STF9IJMykd57nxvDQLlefNbYyCTl'
  );
  const query = 'Nature';

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

  const removeToken = async () => {
    try {
      await removeKey('token');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header screenName="Home" />

      <TouchableOpacity onPress={removeToken} style={{ marginBottom: 20 }}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>

      <MotivationalQuote Quote={quote} Image={image} />

      <View
        style={{
          paddingHorizontal: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: Dimensions.get('screen').width,
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
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {drs.map((d, idx) => (
          <Doctor key={idx} online={d.online} />
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
    backgroundColor: '#fff',
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
