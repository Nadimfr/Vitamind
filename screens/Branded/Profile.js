import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAll, getData } from '../../helpers/AsyncStorage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

function Profile({ navigation }) {
  const options = [
    // {
    //   Title: 'Settings',
    //   Icon: <MaterialCommunityIcons name="account" size={26} />,
    //   onPress: () => navigation.navigate('Settings'),
    // },
    {
      Title: 'Appearance',
      Icon: <MaterialCommunityIcons name="account" size={26} />,
      onPress: () => navigation.navigate('Appearance'),
    },
  ];
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState();
  const [theme, setTheme] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const removeToken = async () => {
    try {
      // await setToken('');
      await clearAll();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('TOKEN', token);
        setToken(token);
      } catch (error) {
        console.log('Error fetching token:', error);
      }
    }
    fetchToken();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      const whatTheme = await AsyncStorage.getItem('theme');
      setTheme(whatTheme);
    }
    setInterval(() => {
      fetchData();
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userString = await AsyncStorage.getItem('user');
      setUserId(JSON.parse(userString)._id);
    }

    fetchData();
  }, [userId]);

  useEffect(() => {
    api.getUserDetails(userId).then((res) => {
      setUser(res.data);
      // console.log('jjjj', user);
    });
  }, [user]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // console.log('first');
        setLoading(true);
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Image picking error:', error);
    }
  };

  const uploadImage = async (imageUri) => {
    try {
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

      const response = await axios.post(url, formData, headers);
      const user_id = userId;
      const newValue = response.data.data.url;

      console.log('DATA SENT ===', user_id, newValue);
      const response2 = await axios.put(
        `http://192.168.1.10:8080/api/users/${userId}/image_url`,
        {
          image_url: newValue,
        }
      );
      console.log(response2.data);
      console.log('UPLOAD SUCCESS', response.data.data.url);
      setLoading(false);
    } catch (error) {
      Alert.alert('Image upload error');
      console.log('Image upload error:', error);
    }
  };

  return (
    <View
      style={[
        styles.profile1,
        {
          backgroundColor: theme == 'dark' ? '#142F21' : 'white',
        },
      ]}
    >
      <Header
        dots
        screenName="Profile"
        onBack={() => navigation.navigate('Home')}
      />
      <View style={{ alignSelf: 'center' }}>
        <View>
          <View
            style={[
              styles.image,
              {
                backgroundColor: !user?.image_url && '#B2ECC4',
                marginBottom: 10,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator />
            ) : user?.image_url ? (
              <Image
                style={[
                  styles.image,
                  { backgroundColor: !user?.image_url && '#B2ECC4' },
                ]}
                src={`${user?.image_url}`}
                resizeMode="cover"
              />
            ) : (
              <View>
                <Entypo
                  name="user"
                  color={'white'}
                  size={100}
                  style={{ marginTop: 5 }}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={{
              height: 25,
              width: 25,
              backgroundColor: '#B2ECC4',
              position: 'absolute',
              bottom: 10,
              right: 100,
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={pickImage}
            activeOpacity={0.7}
            disabled={loading && true}
          >
            <Ionicons name="camera-outline" color={'white'} size={15} />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.name,
            {
              color: theme == 'dark' ? 'white' : 'black',
            },
          ]}
        >
          {user?.email}
        </Text>
        <Text style={styles.username}>@{user?.username}</Text>
      </View>
      <View style={styles.options}>
        {options.map((m, idx) => (
          <View key={idx} style={{ marginBottom: 25 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.option}
              onPress={m.onPress}
            >
              <View>{m.Icon}</View>
              <Text style={styles.optionstitle}>{m.Title}</Text>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#42A45C',
                marginTop: 10,
              }}
            />
          </View>
        ))}
        <View style={{ marginBottom: 25 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.option}
            onPress={removeToken}
          >
            <View>
              <MaterialCommunityIcons name="account" size={26} />
            </View>
            <Text style={styles.optionstitle}>Log Out</Text>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#42A45C',
              marginTop: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  profile: {
    backgroundColor: 'white',
    flex: 1,
  },
  profile1: {
    flex: 1,
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins',
    alignSelf: 'center',
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Lato',
    alignSelf: 'center',
    color: '#42A45C',
  },
  image: {
    position: 'relative',
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    height: 600,
    width: '100%',
    backgroundColor: '#B2ECC4',
    backgroundColor: 'rgba(178 236 196 / 0.6)',
    borderTopStartRadius: 85,
    borderTopEndRadius: 85,
    marginTop: 50,
    paddingHorizontal: '15%',
    paddingTop: '10%',
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  optionstitle: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Lato',
    alignSelf: 'center',
    color: '#142F21',
    marginLeft: 10,
  },
});
