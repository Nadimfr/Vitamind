import axios from 'axios';
import { Audio } from 'expo-av';
import React, { useEffect, useRef } from 'react';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

function OnBoard({ navigation }) {
  const sound = new Audio.Sound();

  async function playSound() {
    try {
      await sound.unloadAsync();
      await sound.loadAsync(require('../../assets/sounds/Press.mp3'));
      await sound.playAsync();
    } catch (error) {
      // handle errors here
    }
  }

  const swiperRef = useRef(null);

  const handleNextPress = () => {
    playSound();
    swiperRef.current.scrollBy(1, true);
  };

  // const text = `Change the way you think with tools that allows you to track your mood, manage negative thoughts, and see your progress.`;

  // const url = 'https://large-text-to-speech.p.rapidapi.com/tts';

  // const payload = {
  //   text: text,
  // };

  // const headers = {
  //   'content-type': 'application/json',
  //   'x-rapidapi-host': 'large-text-to-speech.p.rapidapi.com',
  //   'x-rapidapi-key': '6e3a44137cmshf321fbccc5cb04dp132bf2jsnbb7f3808ab4a',
  // };

  // POST request
  // useEffect(() => {
  //   axios
  //     .post(url, payload, { headers })
  //     .then((response) => {
  //       console.log(response.data);
  //       // get id and eta of the job from the response
  //       const id = response.data.id;
  //       const eta = response.data.eta;
  //       console.log(`Waiting ${eta} seconds for the job to finish...`);
  //       // wait for the job to finish
  //       setTimeout(() => {
  //         // GET the result from the API
  //         axios
  //           .get(url, { headers, params: { id: id } })
  //           .then((response) => {
  //             // if url not returned yet, wait and try again
  //             let url;
  //             while (!url) {
  //               if ('url' in response.data) {
  //                 url = response.data.url;
  //               } else {
  //                 setTimeout(() => {
  //                   axios
  //                     .get(url, { headers, params: { id: id } })
  //                     .then((response) => {
  //                       console.log(response.data);
  //                     })
  //                     .catch((error) => {
  //                       console.error(error);
  //                     });
  //                 }, 5000);
  //               }
  //             }
  //             // download the audio file
  //             FileSystem.downloadAsync(
  //               url,
  //               FileSystem.documentDirectory + 'output.wav'
  //             )
  //               .then(({ uri }) => {
  //                 console.log('File output.wav saved!');
  //                 // play the audio file
  //                 const soundObject = new Audio.Sound();
  //                 soundObject
  //                   .loadAsync({ uri })
  //                   .then(() => {
  //                     soundObject.playAsync();
  //                   })
  //                   .catch((error) => {
  //                     console.error(error);
  //                   });
  //               })
  //               .catch((error) => {
  //                 console.error(error);
  //               });
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //       }, eta * 1000);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

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
        }}
      >
        {/* <Swiper
          ref={swiperRef}
          dotColor="white"
          activeDotColor="green"
          showsButtons={false}
          loop={false}
          style={{ alignSelf: 'center', height: 260 }}
          scrollEnabled={false}
        > */}
        <View
          style={{
            width: 310,
            height: 260,
            backgroundColor: 'rgba(178, 236, 196, 0.5)',
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_SemiBold',
              color: '#142F21',
              fontSize: 50,
              marginTop: 0,
              lineHeight: 60,
              textAlign: 'center',
            }}
          >
            Tools that work
          </Text>
          <Text
            style={{
              fontFamily: 'Lato',
              color: 'white',
              fontSize: 22,
              marginTop: 0,
              lineHeight: 0,
              textAlign: 'center',
            }}
          >
            Change the way you think with tools that allows you to track your
            mood, manage negative thoughts, and see your progress
          </Text>
          <TouchableOpacity
            onPress={() => {
              playSound();
              navigation.navigate('Login');
            }}
          >
            {/* <TouchableOpacity onPress={handleNextPress}> */}
            <Text>Next</Text>
          </TouchableOpacity>
        </View>

        {/* <View
            style={{
              width: 310,
              height: 260,
              backgroundColor: 'rgba(178, 236, 196, 0.5)',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_SemiBold',
                color: '#142F21',
                fontSize: 50,
                marginTop: 0,
                lineHeight: 60,
                textAlign: 'center',
              }}
            >
              Vitamind
            </Text>
            <Text
              style={{
                fontFamily: 'Lato',
                color: 'white',
                fontSize: 22,
                marginTop: 0,
                lineHeight: 0,
                textAlign: 'center',
              }}
            >
              A place to free your mind
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
              onPress={handleNextPress}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins_Medium',
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: 310,
              height: 260,
              backgroundColor: 'rgba(178, 236, 196, 0.5)',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_SemiBold',
                color: '#142F21',
                fontSize: 50,
                marginTop: 0,
                lineHeight: 60,
                textAlign: 'center',
              }}
            >
              Tools that work
            </Text>
            <Text
              style={{
                fontFamily: 'Lato',
                color: 'white',
                fontSize: 22,
                marginTop: 0,
                lineHeight: 0,
                textAlign: 'center',
              }}
            >
              Change the way you think with tools that allows you to track your
              mood, manage negative thoughts, and see your progress
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
              onPress={handleNextPress}
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins_Medium',
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </Swiper> */}
      </ImageBackground>
    </>
  );
}

export default OnBoard;
