import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Header from '../../components/Header';

const Settings = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header onBack={() => navigation.goBack()} dots screenName="Settings" />

      <View style={styles.Layout}>
        <View style={{ marginBottom: 25, width: '100%' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.option}
            //   onPress={m.onPress}
          >
            <Text style={styles.optionstitle}>Delete Account</Text>
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
};

export default Settings;

const styles = StyleSheet.create({
  Layout: {
    paddingHorizontal: 25,
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
