import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import * as api from '../controllers/ApiUser';

import happyImage from '../assets/happy.png';
import disgustImage from '../assets/disgust.png';
import angryImage from '../assets/angry.png';
import neutralImage from '../assets/neutral.png';
import sadImage from '../assets/sad.png';
import surprisedImage from '../assets/surprised.png';
import fearImage from '../assets/fear.png';
import LottieView from 'lottie-react-native';

function MoodEveryday() {
  const mood = [
    { value: 'happy', image_file: happyImage },
    { value: 'disgust', image_file: disgustImage },
    { value: 'angry', image_file: angryImage },
    { value: 'neutral', image_file: neutralImage },
    { value: 'sad', image_file: sadImage },
    { value: 'surprised', image_file: surprisedImage },
    { value: 'fear', image_file: fearImage },
  ];
  return (
    <>
      <LottieView
        source={require('../lottieAnimations/gradient.json')}
        autoPlay
        loop
        style={{
          height: '100%',
          position: 'absolute',
          opacity: 0.5,
        }}
      />
      <Swiper loop={false} activeDotColor="green">
        {mood.map((m, idx) => {
          return (
            <View
              key={idx}
              style={{
                paddingTop: 140,
                paddingHorizontal: 50,
                height: '100%',
              }}
            >
              <Text style={styles.titleheading1}>
                How are you feeling today?
              </Text>
              <Image
                style={{
                  width: 300,
                  height: 300,
                  alignSelf: 'center',
                  marginTop: 40,
                }}
                source={m.image_file}
                resizeMode="center"
              />
              <View>
                <TouchableOpacity
                  onPress={() =>
                    api.historyCreate(data).then((res) => {
                      console.log('API REQ', res);
                    })
                  }
                  style={styles.buttonnext1}
                >
                  <Text style={{ color: 'white', fontSize: 22 }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </Swiper>
    </>
  );
}

export default MoodEveryday;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'center',
    color: '#142F21',
  },
  titleheading1: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'center',
    color: '#42A45C',
  },
  titleheading2: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'center',
    color: '#B2ECC4',
  },

  buttonnext: {
    display: 'flex',
    marginTop: 50,
    width: 230,
    height: 55,
    backgroundColor: '#142F21',
    borderColor: '#142F21',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonnext1: {
    display: 'flex',
    marginTop: 50,
    width: 230,
    height: 55,
    backgroundColor: '#42A45C',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonnext2: {
    display: 'flex',
    marginTop: 50,
    width: 230,
    height: 55,
    backgroundColor: '#B2ECC4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
