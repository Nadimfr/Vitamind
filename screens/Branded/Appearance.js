import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Appearance = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    try {
      await AsyncStorage.setItem('Dark', isEnabled ? 'd' : 'l');
    } catch (error) {
      console.error('Error saving dark mode value: ', error);
    }
  };

  const getDarkMode = async () => {
    try {
      const darkModeValue = await AsyncStorage.getItem('Dark');
      const parsedValue = JSON.parse(darkModeValue);

      // Check if parsedValue is not a boolean value
      if (typeof parsedValue !== 'boolean') {
        throw new Error('Value is not a boolean');
      }

      return parsedValue;
    } catch (error) {
      console.error('Error retrieving dark mode value: ', error);
    }
  };

  useEffect(() => {
    getDarkMode().then((value) => {
      if (value !== null) {
        setIsDarkModeEnabled(value);
      }
    });
  }, [isDarkModeEnabled]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isEnabled ? '#142F21' : 'white',
      }}
    >
      <Header
        dots
        screenName="Appearance"
        onBack={() => navigation.navigate('Home')}
      />

      <View style={styles.Layout}>
        <Text style={styles.Title}>Dark Mode</Text>
        <Switch
          trackColor={{
            false: 'rgba(178 236 196 / 0.4)',
            true: 'rgba(178 236 196 / 0.4)',
          }}
          thumbColor={isEnabled ? '#42A45C' : '#B2ECC4'}
          ios_backgroundColor="#fff"
          onValueChange={toggleSwitch}
          on
          value={isEnabled}
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
});
