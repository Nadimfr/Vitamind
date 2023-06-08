import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header';

const Appearance = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme).then(() => {});
  };

  useEffect(() => {
    AsyncStorage.getItem('theme').then((theme) => {
      console.log(theme);
      if (theme) {
        setCurrentTheme(theme);
      }
    });
  }, [currentTheme]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: currentTheme == 'dark' ? '#142F21' : 'white',
      }}
    >
      {/* <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons
            name="chevron-back"
            color={currentTheme == 'dark' ? 'white' : 'black'}
            size={25}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.Title,
            {
              color: currentTheme == 'dark' ? 'white' : 'black',
            },
          ]}
        >
          Apperance
        </Text>

        <TouchableOpacity>
          <Entypo
            name="dots-three-horizontal"
            color={currentTheme == 'dark' ? 'white' : 'black'}
            size={20}
          />
        </TouchableOpacity>
      </View> */}

      <Header
        screenName="Appearance"
        onBack={() => navigation.navigate('Profile')}
        dots
      />

      <View style={styles.Layout}>
        <Text
          style={{
            fontFamily: 'Poppins_SemiBold',
            fontSize: 20,
            color: currentTheme == 'dark' ? 'white' : 'black',
          }}
        >
          Dark Mode
        </Text>
        <Switch
          trackColor={{
            false: 'rgba(178 236 196 / 0.4)',
            true: 'rgba(178 236 196 / 0.4)',
          }}
          thumbColor={currentTheme == 'dark' ? '#42A45C' : '#B2ECC4'}
          ios_backgroundColor="#fff"
          onValueChange={toggleSwitch}
          on
          value={currentTheme == 'dark' && true}
        />
      </View>
    </View>
  );
};

export default Appearance;

const styles = StyleSheet.create({
  Layout: {
    paddingHorizontal: 25,
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Title: {
    fontFamily: 'Poppins_SemiBold',
    fontSize: 20,
  },
  Header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 25,
    marginTop: '15%',
  },
  Title: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins_SemiBold',
    textAlign: 'center',
  },
});
