import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

function Notification() {
  return (
    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <Header
        dots
        screenName={'Notifications'}
        onBack={() => navigation.navigate('Home')}
      />
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#42A45C',
          marginTop: 10,
        }}
      ></View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-cen',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            marginLeft: 15,
            width: 10,
            height: 10,
            borderRadius: 50,
            backgroundColor: '#42A45C',
            alignSelf: 'center',
          }}
        ></View>
        <Text style={styles.optionstitle}>You completed 3 tasks today!</Text>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#42A45C',
          marginTop: 10,
        }}
      ></View>
      <View style={{}}>
        <Text style={styles.optionstitle}>You completed 3 tasks today!</Text>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#42A45C',
          marginTop: 10,
        }}
      ></View>
      <View style={{}}>
        <Text style={styles.optionstitle}>You completed 3 tasks today!</Text>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#42A45C',
          marginTop: 10,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionstitle: {
    textAlign: 'left',
    fontSize: 22,
    fontFamily: 'Lato',
    alignSelf: 'flex-start',
    color: '#142F21',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default Notification;
