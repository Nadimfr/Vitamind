import axios from 'axios';
import { Audio } from 'expo-av';
import React, { useEffect, useRef } from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

function OnBoard({ navigation }) {
  const swiperRef = useRef(null);

  const handleNextPress = () => {
    swiperRef.current.scrollBy(1, true);
  };

  const array = [
    {
      title: 'Vitamind',
      description: 'A place to free your mind',
      button: 'Next',
      function: handleNextPress,
    },
    {
      title: 'Tools that work',
      description:
        'Change the way you think with tools that allows you to track your mood, manage negative thoughts, and see your progress',
      button: 'Next',
      function: handleNextPress,
    },
    {
      title: 'Every Guided Journey',
      description:
        'Our guided journeys are designed by psychologists to help you build and maintain skills and increase on-the-go activities',
      button: 'Next',
      function: handleNextPress,
    },
    {
      title: 'Mental Health Coaching',
      description:
        'Trained doctors are ready to offer support and guidance based on what works for you all through private meeting',
      button: 'Next',
      function: handleNextPress,
    },
    {
      title: 'Personal Journal',
      description:
        'This app is about you and only you, a place to feel free to write your own thoughts and be sure that is a safe place to keep it',
      button: 'Next',
      function: () => navigation.navigate('Login'),
    },
  ];
  return (
    <>
      <ImageBackground
        source={require('../../assets/Bg.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30,
          paddingTop: Dimensions.get('screen').height / 3,
        }}
      >
        <Swiper
          ref={swiperRef}
          loop={false}
          style={{ alignSelf: 'center' }}
          dotStyle={{ display: 'none' }}
          activeDotStyle={{ display: 'none' }}
          scrollEnabled={false}
        >
          {array.map((a, idx) => (
            <View
              style={{
                backgroundColor: 'rgba(178, 236, 196, 0.5)',
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // paddingVertical: 25,
                paddingHorizontal: 20,
                height: 300,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins_SemiBold',
                  color: '#142F21',
                  fontSize: 34,
                  marginTop: 0,
                  textAlign: 'center',
                }}
              >
                {a.title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato',
                  color: 'white',
                  fontSize: 18,
                  marginTop: 0,
                  lineHeight: 0,
                  textAlign: 'center',
                }}
              >
                {a.description}
              </Text>

              <TouchableOpacity
                style={{
                  borderRadius: 50,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#142F21',
                  justifyContent: 'center',
                  width: 85,
                  height: 36,
                  marginTop: 40,
                }}
                onPress={a.function}
              >
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins_Medium',
                  }}
                >
                  {a.button}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Swiper>
      </ImageBackground>
    </>
  );
}

export default OnBoard;
