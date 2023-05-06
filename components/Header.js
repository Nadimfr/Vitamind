import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Header({ dots, screenName, onBack }) {
  const [appTheme, setAppTheme] = useState();

  useEffect(() => {
    AsyncStorage.getItem('theme').then((theme) => {
      console.log('APPP', theme);
      if (theme) {
        setAppTheme(theme);
      }
    });
  }, []);

  return (
    <>
      {dots ? (
        <View style={styles.Header}>
          <TouchableOpacity onPress={onBack}>
            <Ionicons
              name="chevron-back"
              color={appTheme == 'dark' ? 'white' : 'black'}
              size={25}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.Title,
              {
                color: appTheme == 'dark' ? 'white' : 'black',
              },
            ]}
          >
            {screenName}
          </Text>

          <TouchableOpacity>
            <Entypo
              name="dots-three-horizontal"
              color={appTheme == 'dark' ? 'white' : 'black'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.Header1}>
          <Text
            style={[
              styles.Title,
              {
                color: appTheme == 'dark' ? 'white' : 'black',
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
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins_SemiBold',
    textAlign: 'center',
  },
});
export default Header;
