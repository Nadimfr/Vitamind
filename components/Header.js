import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Header({ dots, screenName, onBack }) {
  const [theme, setTheme] = useState();

  useEffect(() => {
    async function fetchData() {
      const whatTheme = await AsyncStorage.getItem('theme');
      setTheme(whatTheme);
    }
    setInterval(() => {
      fetchData();
    }, 100);
  }, []);

  return (
    <>
      {dots ? (
        <View style={styles.Header}>
          <TouchableOpacity style={{ width: '33.33%' }} onPress={onBack}>
            <Ionicons
              name="chevron-back"
              color={theme == 'dark' ? 'white' : 'black'}
              size={25}
            />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={[
              styles.Title,

              {
                color: theme == 'dark' ? 'white' : 'black',
              },
            ]}
          >
            {screenName}
          </Text>

          <View style={{ width: '33.33%' }} />
        </View>
      ) : (
        <View style={styles.Header1}>
          <Text
            style={[
              styles.Title,

              {
                color: theme == 'dark' ? 'white' : 'black',
              },
            ]}
          >
            {screenName}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  Header: {
    display: 'flex',

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 30,

    paddingHorizontal: 25,

    marginTop: '15%',
  },

  Header1: {
    display: 'flex',

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 30,

    paddingHorizontal: 25,

    marginTop: '15%',
  },

  Title: {
    width: '33.33%',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins_SemiBold',
    textAlign: 'center',
  },
});

export default Header;
