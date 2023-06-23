import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as apiDr from '../../controllers/ApiDoctor';
import * as WebBrowser from 'expo-web-browser';
import LottieView from 'lottie-react-native';
import Button from '../../components/Button';

const DoctorDetails = ({ route, navigation }) => {
  const [doctor, setDoctor] = useState();
  const [more, setMore] = useState(false);

  useEffect(() => {
    apiDr.getDoctor(route.params.id).then((res) => {
      console.log(res);
      setDoctor(res);
    });
  }, []);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(doctor?.calendly_url);
    setResult(result);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        paddingHorizontal: 25,
      }}
    >
      <LottieView
        source={require('../../lottieAnimations/gradient.json')}
        autoPlay
        loop
        style={{
          height: '100%',
          position: 'absolute',
          opacity: 0.5,
        }}
      />
      <TouchableOpacity
        style={{ marginTop: 80, marginBottom: 25 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" color={'dark'} size={25} />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <Image
          resizeMode="cover"
          src={`${doctor?.image_url}`}
          style={{
            height: 150,
            width: 150,
            backgroundColor: 'white',
            borderRadius: 25,
            marginRight: 15,
          }}
        />
        <View>
          <Text
            style={{
              // marginTop: 5,
              marginBottom: 10,
              textAlign: 'center',
              fontSize: 20,
              fontFamily: 'Poppins_SemiBold',
              width: '75%',
              textAlign: 'left',
            }}
          >
            Dr. {doctor?.name}
          </Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'green',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => Linking.openURL(`${doctor?.linkedin_url}`)}
            >
              <Entypo name="linkedin" color={'white'} size={18} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'green',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => Linking.openURL(`mailto:${doctor?.email_url}`)}
            >
              <Entypo name="email" color={'white'} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'green',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => Linking.openURL(`${doctor?.insta_url}`)}
            >
              <Entypo name="instagram" color={'white'} size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{ fontFamily: 'Lato', flexWrap: 'wrap', textAlign: 'justify' }}
          // numberOfLines={!more ? 3 : 100}
        >
          {doctor?.description}
        </Text>
        {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setMore(!more)}>
          <Text style={{ color: 'green' }}>Read {!more ? 'more' : 'less'}</Text>
        </TouchableOpacity> */}
      </View>

      <View style={{ marginTop: 25 }}>
        <Button onPress={_handlePressButtonAsync} title="Book an Appointment" />
      </View>
    </View>
  );
};

export default DoctorDetails;
