import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as api from '../../controllers/ApiUser';
import * as WebBrowser from 'expo-web-browser';
import Swiper from 'react-native-swiper';

function Recommender({ navigation, route }) {
  const [recommendations, setRecommendations] = useState([]);

  const _handlePressButtonAsync = async (link) => {
    let result = await WebBrowser.openBrowserAsync(link);
  };

  useEffect(() => {
    api
      .getRecommendationByType(
        route?.params?.emotion == 'sadness' ? 'sad' : route?.params?.emotion
      )
      .then((res) => {
        console.log('RESS', res);
        const randomIndex = Math.floor(Math.random() * (res.length - 3));
        setRecommendations(res.slice(randomIndex, randomIndex + 4));
      });
  }, []);

  return (
    <View
      style={{
        paddingTop: 90,
        paddingHorizontal: 15,
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      <TouchableOpacity
        style={{ width: '33.33%' }}
        onPress={() => navigation?.goBack()}
      >
        <Ionicons name="chevron-back" color={'black'} size={25} />
      </TouchableOpacity>
      <Text style={styles.titleheading}>Vitamind,</Text>
      <Text style={styles.titleheading2}>recommends</Text>
      <Text style={styles.titleheading3}>you to:</Text>
      <ScrollView style={{ paddingHorizontal: '5%', marginTop: 50 }}>
        {recommendations?.map((r, idx) => (
          <View>
            <Text style={{ fontSize: 24, fontFamily: 'Poppins_SemiBold' }}>
              {idx + 1}- {r?.title}
            </Text>

            {/* <ScrollView horizontal={true} style={{ marginTop: 25 }}> */}
            <Swiper height={300} loop={false} activeDotColor="green">
              {r?.details?.map((rd) => {
                return (
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_SemiBold',
                        color: '#42A45C',
                        textTransform: 'capitalize',
                      }}
                    >
                      {rd?.title}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        width: '100%',
                        height: 200,
                        marginTop: 10,
                        borderRadius: 20,
                      }}
                      onPress={() =>
                        rd?.title == 'Journal'
                          ? navigation.navigate('Journals')
                          : _handlePressButtonAsync(rd?.link_url)
                      }
                    >
                      <Image
                        style={{
                          width: '100%',
                          borderTopLeftRadius: 20,
                          borderBottomLeftRadius: 20,
                          borderTopRightRadius: 50,
                          borderBottomRightRadius: 150,
                          height: 200,
                        }}
                        src={`${rd?.image_file}`}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </Swiper>
            {/* </ScrollView> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleheading: {
    textAlign: 'left',
    fontSize: 40,
    fontFamily: 'Poppins_Regular',
    alignSelf: 'flex-start',
    color: '#142F21',
    marginLeft: 10,
  },
  titleheading2: {
    textAlign: 'left',
    fontSize: 30,
    fontFamily: 'Poppins_Bold',
    alignSelf: 'flex-start',
    color: '#42A45C',
    marginLeft: 10,
  },
  titleheading3: {
    textAlign: 'left',
    fontSize: 30,
    fontFamily: 'Poppins_Bold',
    alignSelf: 'flex-start',
    color: '#42A45C',
    marginLeft: 10,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default Recommender;
