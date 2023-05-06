import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';

const Doctor = ({ online, image, onPress }) => {
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
      >
        {online && (
          <View
            style={{
              height: 13,
              width: 13,
              borderRadius: 50,
              backgroundColor: '#42A45C',
              position: 'absolute',
              bottom: 0,
              right: 10,
            }}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Doctor;
