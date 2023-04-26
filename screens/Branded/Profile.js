import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';
import * as api from '../../controllers/ApiUser';
import { Appearance, useColorScheme } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

function Profile() {
  const navigation = useNavigation();

  const options = [
    {
      Title: 'Settings',
      Icon: <MaterialCommunityIcons name="account" size={26} />,
      onPress: () => Appearance.addChangeListener,
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
    {
      Title: 'Logout',
      Icon: <MaterialCommunityIcons name="account" size={26} />,
      onPress: '',
    },
  ];

  const [user, setUser] = useState({});

  const sound = new Audio.Sound();

  async function playSound() {
    try {
      await sound.unloadAsync(); // unload previous audio file
      await sound.loadAsync(require('../../assets/sounds/Press.mp3'));
      await sound.playAsync();
    } catch (error) {
      // handle errors here
    }
  }

  useEffect(() => {
    api.getUserDetails().then((res) => {
      setUser(res[0]);
      console.log('first', res);
    });
  }, []);

  return (
    <View style={styles.profile1}>
      <StatusBar barStyle="light-content" />

      <Header
        dots
        screenName="Profile"
        onBack={() => navigation.navigate('Home')}
      />
      <View style={{ alignSelf: 'center' }}>
        <Image
          style={styles.image}
          src={`${user?.image_url}`}
          resizeMode="center"
        />
        <Text style={styles.name}>
          {user?.first_name} {user?.last_name}
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
    backgroundColor: 'white',
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
