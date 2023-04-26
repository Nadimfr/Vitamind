import React from 'react';
import { View } from 'react-native';

const Doctor = ({ online }) => {
  return (
    <View
      style={{
        height: 75,
        width: 75,
        borderRadius: 50,
        backgroundColor: 'red',
        position: 'relative',
        marginRight: 10,
      }}
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
    </View>
  );
};

export default Doctor;
