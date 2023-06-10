import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const Chart = ({ theme, data }) => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   backgroundColor: '#42A45C',
          backgroundColor: 'rgba(66,164,92/0.25)',
          padding: 20,
          borderRadius: 25,
          height: 200,
          maxHeight: 200,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <View
            style={{
              maxHeight: 150,
              height: data?.sad ? data?.sad : 0.5,
              width: 15,
              backgroundColor: '#142F21',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10 }}>
              {data?.sad ? data?.sad / 10 : ''}
            </Text>
          </View>
          <Text style={{ fontSize: 32 }}>☹️</Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <View
            style={{
              height: data?.fear ? data?.fear : 0.5,
              width: 15,
              backgroundColor: '#142F21',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10 }}>
              {data?.fear ? data?.fear / 10 : ''}
            </Text>
          </View>
          <Text style={{ fontSize: 32 }}>😱</Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <View
            style={{
              maxHeight: 150,
              height: data?.surprised ? data?.surprised : 0.5,
              width: 15,
              backgroundColor: '#142F21',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10 }}>
              {data?.surprised ? data?.surprised / 10 : ''}
            </Text>
          </View>
          <Text style={{ fontSize: 32 }}>😳</Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <View
            style={{
              maxHeight: 150,
              height: data?.disgussed ? data?.disgussed : 0.5,
              width: 15,
              backgroundColor: '#142F21',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10 }}>
              {data?.disgussed ? data?.disgussed / 10 : ''}
            </Text>
          </View>
          <Text style={{ fontSize: 32 }}>🤢</Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <View
            style={{
              maxHeight: 150,
              height: data?.happy ? data?.happy : 0.5,
              width: 15,
              backgroundColor: '#142F21',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 10 }}>
              {data?.happy ? data?.happy / 10 : ''}
            </Text>
          </View>
          <Text style={{ fontSize: 32 }}>😀</Text>
        </View>
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
