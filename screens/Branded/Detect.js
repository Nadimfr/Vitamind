import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { Camera, CameraType } from "expo-camera";

const Detect = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [active, setActive] = useState(0);
  const cameraRef = useRef();
  const videoRef = useRef();

  return (
    <>
      {active === 1 ? (
        // <Camera type={type} ref={cameraRef} style={{ flex: 1 }} />
        <View>
          <TouchableOpacity style={{ marginTop: 100 }}>
            <Text>hiii</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ImageBackground
          source={require("../../assets/Bg.png")}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "start",
            justifyContent: "space-between",
            paddingTop: 150,
          }}
        >
          <View
            style={{
              paddingHorizontal: "8%",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins_SemiBold",
                color: "white",
                fontSize: 50,
                marginBottom: 15,
                lineHeight: 60,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text
                  style={{ color: "white", fontWeight: "900", fontSize: 40 }}
                >
                  {"<"}
                </Text>
              </TouchableOpacity>
              Vitamind will help you get better!
            </Text>

            <Text
              style={{
                color: "white",
                fontWeight: 500,
                fontFamily: "Lato",
                fontSize: 20,
              }}
            >
              Choose how by swiping...
            </Text>
          </View>

          <Swiper
            style={{ marginTop: 350, marginLeft: 10 }}
            dotStyle={{ display: "none" }}
            activeDotStyle={{ display: "none" }}
            showsButtons={false}
            onIndexChanged={(e) => setActive(e)}
          >
            <TouchableOpacity
              style={{
                height: 75,
                width: 75,
                borderColor: "white",
                borderWidth: 4,
                borderRadius: 100,
                alignSelf: "center",
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 75,
                width: 75,
                borderColor: "white",
                borderWidth: 4,
                borderRadius: 100,
                alignSelf: "center",
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 75,
                width: 75,
                borderColor: "white",
                borderWidth: 4,
                borderRadius: 100,
                alignSelf: "center",
              }}
            ></TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 75,
                width: 75,
                borderColor: "white",
                borderWidth: 4,
                borderRadius: 100,
                alignSelf: "center",
              }}
            ></TouchableOpacity>
          </Swiper>
        </ImageBackground>
      )}
    </>
  );
};

export default Detect;
