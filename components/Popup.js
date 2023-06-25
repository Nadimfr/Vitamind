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

const Popup = ({ visible, onPress, title, description, button_title }) => {
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
            backgroundColor: 'white',
            borderRadius: 25,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 25,
            paddingHorizontal: 10,
            gap: !description && 30,
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins_Bold',
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
          {description && (
            <Text
              style={{
                fontFamily: 'Lato',
                textAlign: 'center',
                marginTop: 10,
                fontSize: 15,
                marginHorizontal: 12,
                marginBottom: 50,
                lineHeight: 20,
              }}
            >
              {description}
            </Text>
          )}
          <View style={{ width: '75%' }}>
            <Button
              //   onPress={() => {
              //     Linking.openURL('googlegmail://');
              //   }}
              onPress={onPress}
              title={button_title ? button_title : 'Okay'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
