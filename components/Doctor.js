import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';

const Doctor = ({ image, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{
          height: 75,
          width: 75,
          position: 'relative',
          marginRight: 10,
        }}
        imageStyle={{ borderRadius: 50 }}
        src={`${image}`}
        resizeMode="cover"
      ></ImageBackground>
    </TouchableOpacity>
  );
};

export default Doctor;
