import React from 'react';
import { Dimensions, ImageBackground, Text, View } from 'react-native';

const MotivationalQuote = ({ Quote, Image }) => {
  const image = { uri: 'Image' };
  return (
    <View
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        width: Dimensions.get('screen').width * 0.9,
        marginBottom: 35,
      }}
    >
      <ImageBackground source={{ uri: Image }} resizeMode="cover">
        <View
          style={{
            backgroundColor: 'rgba(20 47 33 / 0.7)',
            padding: 20,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins_SemiBold',
              fontSize: 24,
              marginBottom: 10,
            }}
          >
            Today's Quote
          </Text>
          <Text style={{ fontFamily: 'Lato', fontSize: 18, color: 'white' }}>
            {/* {Quote} */}
            "Your present circumstances don’t determine where you go; they
            merely determine where you start."{'\n'}— Nido Qubein
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MotivationalQuote;
