import React from 'react';
import {
  Dimensions,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from './Button';

const Popup = ({ visible, onPress }) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0 0 0 / 0.5)',
        }}
      >
        <View
          style={{
            width: Dimensions.get('screen').width / 1.25,
            height: 250,
            backgroundColor: 'white',
            borderRadius: 25,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 25,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_Bold',
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            Appointment made successfully!
          </Text>
          <Text
            style={{
              fontFamily: 'Lato',
              textAlign: 'center',
              marginTop: 10,
              fontSize: 15,
              marginHorizontal: 12,
              marginBottom: 50,
            }}
          >
            Make sure to check your email in order to receive your zoom link.
          </Text>
          <View style={{ width: '75%' }}>
            <Button
              //   onPress={() => {
              //     Linking.openURL('googlegmail://');
              //   }}
              onPress={onPress}
              title="Okay"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
