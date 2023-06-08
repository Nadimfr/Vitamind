import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatGrid } from 'react-native-super-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as api from '../../controllers/ApiUser';

function Recommender({ navigation, route }) {
  const [items, setItems] = useState([
    { name: 'TURQUOISE', code: '#142F21' },
    { name: 'EMERALD', code: '#B2ECC4' },
    { name: 'PETER RIVER', code: '#42A45C' },
    { name: 'TURQUOISE', code: '#142F21' },
    { name: 'EMERALD', code: '#B2ECC4' },
    { name: 'PETER RIVER', code: '#42A45C' },
    { name: 'TURQUOISE', code: '#142F21' },
    { name: 'EMERALD', code: '#B2ECC4' },
    { name: 'PETER RIVER', code: '#42A45C' },
  ]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    console.log('PARAMS', route.params);

    api
      .getRecommendationByType(
        route.params.emotion == 'sadness' ? 'sad' : route.params.emotion
      )
      .then((res) => {
        console.log('RESS', res);
        setRecommendations(res);
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
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" color={'black'} size={25} />
      </TouchableOpacity>
      <Text style={styles.titleheading}>Vitamind,</Text>
      <Text style={styles.titleheading2}>recommends</Text>
      <Text style={styles.titleheading3}>you to:</Text>
      <View style={{ paddingHorizontal: '5%', marginTop: 50 }}>
        {recommendations.map((r, idx) => (
          <View>
            <Text style={{ fontSize: 20, fontFamily: 'Poppins_SemiBold' }}>
              {idx + 1}- {r.title}
            </Text>

            <View style={{ marginTop: 25 }}>
              {r.details.map((rd) => {
                console.log('first', rd.image_file);
                return (
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'Poppins_SemiBold',
                        color: '#42A45C',
                      }}
                    >
                      {rd.title}
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 200,
                        marginTop: 10,
                        borderRadius: 20,
                      }}
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
                        src={`${rd.image_file}`}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleheading: {
    textAlign: 'Left',
    fontSize: 40,
    fontFamily: 'Poppins_Regular',
    alignSelf: 'left',
    color: '#142F21',
    marginLeft: 10,
  },
  titleheading2: {
    textAlign: 'Left',
    fontSize: 30,
    fontFamily: 'Poppins_Bold',
    alignSelf: 'left',
    color: '#42A45C',
    marginLeft: 10,
  },
  titleheading3: {
    textAlign: 'Left',
    fontSize: 30,
    fontFamily: 'Poppins_Bold',
    alignSelf: 'left',
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
