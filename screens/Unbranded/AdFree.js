import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function AdFree() {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#B2ECC4',
        backgroundColor: 'rgba(178 236 196 / 0.6)',
      }}
    >
      <Image
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginTop: 60,
        }}
        source={require('../../assets/dashicons_privacy.png')}
        resizeMode="center"
      />
      <View style={{ marginLeft: 25 }}>
        <View>
          <Text style={styles.titleheading}>
            This app is only about you and your happiness
          </Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.titleaparagraph}>It’s private and permanent</Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={styles.titleparagraph2}>
            It will remain ad-free, and we will never monetize your data without
            your consent.
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.titleparagraph2}>
            To keep it this way we ensure you a good experience with us.
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.buttonnext}>
            <Text style={{ color: 'white', fontSize: 22 }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AdFree;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: 'left',
    fontSize: 22,
    fontFamily: 'Poppins_SemiBold',
    alignSelf: 'flex-start',
    color: '#142F21',
  },
  titleaparagraph: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Poppins_Thin',
    alignSelf: 'flex-start',
    color: '#42A45C',
  },
  titleparagraph2: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Lato_Regular',
    alignSelf: 'flex-start',
    color: '#142F21',
  },
  buttonnext: {
    display: 'flex',
    marginTop: 100,
    width: 130,
    height: 55,
    backgroundColor: '#142F21',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
