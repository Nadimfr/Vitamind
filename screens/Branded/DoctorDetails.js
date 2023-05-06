import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Popup from '../../components/Popup';
import * as apiDr from '../../controllers/ApiDoctor';

const DoctorDetails = ({ route }) => {
  const [doctor, setDoctor] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState();
  useEffect(() => {
    apiDr.getDoctor(route.params.id).then((res) => {
      setDoctor(res);
    });
  }, []);

  const generateZoomAccessToken = async () => {
    try {
      const response = await axios.post('https://zoom.us/oauth/token', {
        grant_type: 'client_credentials',
        client_id: 'zZ6SOHKjQdiIUKUGEy7avA',
        client_secret: 'pdA47ZpGOI3uy9mq9RwWvYEc1t1DufMj',
      });

      const accessToken = response.data.access_token;

      console.log('Zoom API Access Token:', accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const generateZoomMeetingInvitation = async () => {
    try {
      const response = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        {
          topic: 'Vitamind Zoom Meeting',
          type: 2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer tcVkOEuUv3LojNt98aAImkyN1gNyEtRzoC0a`,
          },
        }
      );

      const joinUrl = response.data.join_url;
      const inviteUrl = `https://zoom.us/j/${response.data.id}`;

      Linking.openURL(
        `mailto:?subject=Vitamind Zoom Meeting&body=Join URL: ${joinUrl}%0D%0AInvite URL: ${inviteUrl}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          width: '100%',
          height: 250,
          backgroundColor: '#8EC89D',
          borderBottomLeftRadius: 75,
          borderBottomRightRadius: 75,
        }}
      />

      <Image
        resizeMode="cover"
        src={`${doctor?.image_url}`}
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'white',
          borderRadius: 50,
          alignSelf: 'center',
          marginTop: -50,
        }}
      />
      <Text
        style={{
          marginTop: 5,
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 20,
          fontFamily: 'Poppins',
          alignSelf: 'center',
        }}
      >
        {doctor?.name}
      </Text>

      <View
      // style={{
      //   paddingLeft: 20,
      // }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {doctor?.availability?.map((a, idx) => (
            <TouchableOpacity
              onPress={() => setSelected(idx)}
              key={idx}
              activeOpacity={0.8}
              style={{
                marginBottom: 10,
                backgroundColor: '#A0D1AD',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                borderRadius: 50,
                shadowOpacity: 0.25,
                borderWidth: 2,
                borderColor: selected === idx ? '#42A45C' : '#A0D1AD',
                shadowRadius: 1,
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginLeft: 10,
              }}
            >
              <Text style={{ fontFamily: 'Lato' }}>{a}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selected && (
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 50,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                generateZoomAccessToken();
                setShowPopup(true);
              }}
            >
              <Text style={{ fontFamily: 'Poppins_SemiBold' }}>
                Make appointment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={{ fontFamily: 'Poppins_SemiBold', color: '#42A45C' }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Popup visible={showPopup} onPress={() => setShowPopup(false)} />
    </View>
  );
};

export default DoctorDetails;
