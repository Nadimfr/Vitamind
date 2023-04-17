import React from "react";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";

function OnBoard() {
  return (
    <>
      <ImageBackground
        source={require("../../assets/Bg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
      >
        <Swiper
          dotStyle={{ display: "none" }}
          activeDotStyle={{ display: "none" }}
          showsButtons={false}
          style={{
            marginTop: 250,
            marginLeft: 30,
          }}
          loop={false}
        >
          <View
            style={{
              width: 310,
              height: 260,
              backgroundColor: "rgba(178, 236, 196, 0.5)",
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_SemiBold",
                color: "#142F21",
                fontSize: 50,
                marginTop: 0,
                lineHeight: 60,
                textAlign: "center",
              }}
            >
              Tools that work
            </Text>
            <Text
              style={{
                fontFamily: "Lato",
                color: "white",
                fontSize: 22,
                marginTop: 0,
                lineHeight: 0,
                textAlign: "center",
              }}
            >
              Change the way you think with tools that allows you to track your
              mood, manage negative thoughts, and see your progress
            </Text>
          </View>

          <View
            style={{
              width: 310,
              height: 260,
              backgroundColor: "rgba(178, 236, 196, 0.5)",
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_SemiBold",
                color: "#142F21",
                fontSize: 50,
                marginTop: 0,
                lineHeight: 60,
                textAlign: "center",
              }}
            >
              Vitamind
            </Text>
            <Text
              style={{
                fontFamily: "Lato",
                color: "white",
                fontSize: 22,
                marginTop: 0,
                lineHeight: 0,
                textAlign: "center",
              }}
            >
              A place to free your mind
            </Text>

            <TouchableOpacity
              style={{
                borderRadius: 50,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#142F21",
                justifyContent: "center",
                width: 85,
                height: 36,
                marginTop: 40,
              }}
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Poppins_Medium",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 310,
              height: 260,
              backgroundColor: "rgba(178, 236, 196, 0.5)",
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_SemiBold",
                color: "#142F21",
                fontSize: 50,
                marginTop: 0,
                lineHeight: 60,
                textAlign: "center",
              }}
            >
              Tools that work
            </Text>
            <Text
              style={{
                fontFamily: "Lato",
                color: "white",
                fontSize: 22,
                marginTop: 0,
                lineHeight: 0,
                textAlign: "center",
              }}
            >
              Change the way you think with tools that allows you to track your
              mood, manage negative thoughts, and see your progress
            </Text>
          </View>
        </Swiper>
      </ImageBackground>
    </>
  );
}

export default OnBoard;
