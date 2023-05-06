import React, { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";

function moodeveryday() {
  return (
    <Swiper>
      <View
        style={{
          paddingTop: 140,
          paddingHorizontal: 50,
          height: "100%",
          backgroundColor: "#B2ECC4",
          backgroundColor: "rgba(178 236 196 / 0.6)",
        }}
      >
        <Text style={styles.titleheading}>How are you feeling today?</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          source={require("../../assets/happy.png")}
          resizeMode="center"
        />
        <View>
          <TouchableOpacity style={styles.buttonnext}>
            <Text style={{ color: "white", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 140,
          paddingHorizontal: 50,
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Text style={styles.titleheading1}>How are you feeling today?</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          source={require("../../assets/disgust.png")}
          resizeMode="center"
        />
        <View>
          <TouchableOpacity style={styles.buttonnext1}>
            <Text style={{ color: "white", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 140,
          paddingHorizontal: 50,
          height: "100%",
          backgroundColor: "#B2ECC4",
          backgroundColor: "rgba(178 236 196 / 0.6)",
        }}
      >
        <Text style={styles.titleheading}>How are you feeling today?</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          source={require("../../assets/angry.png")}
          resizeMode="center"
        />
        <View>
          <TouchableOpacity style={styles.buttonnext}>
            <Text style={{ color: "white", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 140,
          paddingHorizontal: 50,
          height: "100%",
          backgroundColor: "#42A45C",
        }}
      >
        <Text style={styles.titleheading}>How are you feeling today?</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          source={require("../../assets/neutral.png")}
          resizeMode="center"
        />
        <View>
          <TouchableOpacity style={styles.buttonnext}>
            <Text style={{ color: "white", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 140,
          paddingHorizontal: 50,
          height: "100%",
          backgroundColor: "#142F21",
        }}
      >
        <Text style={styles.titleheading2}>How are you feeling today?</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          source={require("../../assets/sad.png")}
          resizeMode="center"
        />
        <View>
          <TouchableOpacity style={styles.buttonnext2}>
            <Text style={{ color: "#142F21", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 140,
          paddingHorizontal: 50,
          height: "100%",
          backgroundColor: "#B2ECC4",
          backgroundColor: "rgba(178 236 196 / 0.6)",
        }}
      >
        <Text style={styles.titleheading}>How are you feeling today?</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          source={require("../../assets/surprised.png")}
          resizeMode="center"
        />
        <View>
          <TouchableOpacity style={styles.buttonnext}>
            <Text style={{ color: "white", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingTop: 140,
          paddingHorizontal: 50,
          height: "100%",
          backgroundColor: "#142F21",
        }}
      >
        <Text style={styles.titleheading2}>How are you feeling today?</Text>
        <Image
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          source={require("../../assets/fear.png")}
          resizeMode="center"
        />
        <View>
          <TouchableOpacity style={styles.buttonnext2}>
            <Text style={{ color: "#142F21", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>
  );
}

export default moodeveryday;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Poppins_SemiBold",
    alignSelf: "center",
    color: "#142F21",
  },
  titleheading1: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Poppins_SemiBold",
    alignSelf: "center",
    color: "#42A45C",
  },
  titleheading2: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Poppins_SemiBold",
    alignSelf: "center",
    color: "#B2ECC4",
  },

  buttonnext: {
    display: "flex",
    marginTop: 50,
    width: 230,
    height: 55,
    backgroundColor: "#142F21",
    borderColor: "#142F21",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonnext1: {
    display: "flex",
    marginTop: 50,
    width: 230,
    height: 55,
    backgroundColor: "#42A45C",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonnext2: {
    display: "flex",
    marginTop: 50,
    width: 230,
    height: 55,
    backgroundColor: "#B2ECC4",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
