import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import Loader from '../../components/Loader';
import Popup from '../../components/Popup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetectText from './DetectText';
import Questionary from './Questionary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../../controllers/ApiUser';
import { useNavigation } from '@react-navigation/native';

function FaceExpression({ showPopup, onFinish, setActive }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [loader, setLoader] = useState(false);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [recommender, setRecommender] = useState(false);
  const [emotion, setEmotion] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      setLoader(true);

      uploadImage(uri);
    }
  };

  const uploadImage = async (imageUri) => {
    const url = 'https://api.imgbb.com/1/upload';
    const apiKey = 'e400225c1aca3fbc13a11be33e2bb24d';
    const expiration = 1000000;
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('expiration', expiration);
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    try {
      const response = await axios.post(url, formData, headers);
      console.log('UPLOAD SUCCESS', response.data.data.url);
      detectEmotions(response.data.data.url);
    } catch (error) {
      console.log('ERROR', error);
    }
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

  const detectEmotions = async (imageData) => {
    const headers = {
      'X-RapidAPI-Key': '6e3a44137cmshf321fbccc5cb04dp132bf2jsnbb7f3808ab4a',
      'X-RapidAPI-Host': 'emotion-detection2.p.rapidapi.com',
      'Content-Type': 'application/json',
    };

    const image = {
      url: imageData,
    };
    const today = new Date(Date.now());

    try {
      const response = await axios.post(
        'https://emotion-detection2.p.rapidapi.com/emotion-detection',
        image,
        { headers }
      );
      console.log('EMOTIONSS', response.data);
      setLoader(false);
      await setEmotion(response?.data[0]?.emotion?.value);
      let data = {
        user_id: userId,
        text: `Face Expression Detection,${response?.data[0]?.emotion?.value}`,
        created_at: today,
      };
      await api.historyCreate(data).then((res) => {
        console.log('API REQ', res);
      });
      setRecommender(true);
      navigation.navigate('Recommender', {
        emotion: response?.data[0]?.emotion?.value,
      });
    } catch (error) {
      setLoader(false);
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      {recommender && (
        <Popup
          title={`You are ${emotion}`}
          onPress={() => setRecommender(false)}
        />
      )}
      <Camera type={type} style={styles.camera} ref={cameraRef}>
        <TouchableOpacity
          style={{ marginTop: 75, marginLeft: '8%' }}
          onPress={setActive}
        >
          <Ionicons name="chevron-back" color={'white'} size={35} />
        </TouchableOpacity>
        <View style={{ marginTop: 525, alignSelf: 'center' }}>
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 5,
              borderColor: 'white',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins_Bold',
              }}
            >
              SCAN
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {loader && (
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
          }}
        >
          <Loader />
        </View>
      )}
    </View>
  );
}

const Detect = ({ navigation }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      {active == 1 ? (
        <FaceExpression setActive={() => setActive(0)} />
      ) : active == 2 ? (
        <Questionary />
      ) : active == 3 ? (
        <DetectText onBack={() => setActive(0)} />
      ) : (
        <ImageBackground
          source={require('../../assets/Bg.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: 'start',
            justifyContent: 'space-between',
            paddingTop: 75,
          }}
        >
          <View
            style={{
              paddingHorizontal: '8%',
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons name="chevron-back" color="white" size={40} />
            </TouchableOpacity>
            <View style={{ marginTop: 75 }}>
              <Text
                style={{
                  fontFamily: 'Poppins_SemiBold',
                  color: 'white',
                  fontSize: 50,
                  marginBottom: 15,
                  lineHeight: 60,
                }}
              >
                Vitamind will help you get better!
              </Text>

              <Text
                style={{
                  color: 'white',
                  fontWeight: 500,
                  fontFamily: 'Lato',
                  fontSize: 20,
                }}
              >
                Choose how by swiping...
              </Text>
            </View>
          </View>
        </ImageBackground>
      )}
      <View
        style={{
          width: 300,
          backgroundColor: active == 3 ? 'green' : 'white',
          position: 'absolute',
          height: 60,
          bottom: 50,
          alignSelf: 'center',
          borderRadius: 50,
          opacity: 0.5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 25,
        }}
      >
        <TouchableOpacity onPress={() => setActive(1)}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../assets/facial-recognition.png')}
            resizeMode="center"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(2)}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../assets/question.png')}
            resizeMode="center"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive(3)}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../assets/speech-bubbles.png')}
            resizeMode="center"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Detect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
