import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAll, getData } from '../../helpers/AsyncStorage';

function Profile({ navigation }) {
  const options = [
    {
      Title: 'Settings',
      Icon: <MaterialCommunityIcons name="account" size={26} />,
      onPress: () => navigation.navigate('Settings'),
    },
    {
      Title: 'Dashboard',
      Icon: <MaterialCommunityIcons name="account" size={26} />,
      onPress: '',
    },
    {
      Title: 'Appearance',
      Icon: <MaterialCommunityIcons name="account" size={26} />,
      onPress: () => navigation.navigate('Appearance'),
    },
    // {
    //   Title: 'Logout',
    //   Icon: <MaterialCommunityIcons name="account" size={26} />,
    //   onPress: removeToken,
    // },
  ];
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState();
  const [theme, setTheme] = useState('');
  const [token, setToken] = useState('');

  const removeToken = async () => {
    try {
      navigation.navigate('Login');
      setToken('');
      await clearAll();
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
    });
    [];
  });

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
        <Image
          style={[
            styles.image,
            { backgroundColor: !user?.image_url && '#B2ECC4' },
          ]}
          src={`${user?.image_url}`}
          resizeMode="cover"
        />
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
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
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
