import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { Camera } from "expo-camera";
import axios from "axios";
import Loader from "../../components/Loader";

function FaceExpression({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [loader, setLoader] = useState(false);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      setLoader(true);

      uploadImage(uri);
    }
  };

  const uploadImage = async (imageUri) => {
    const url = "https://api.imgbb.com/1/upload";
    const apiKey = "e400225c1aca3fbc13a11be33e2bb24d";
    const expiration = 1000000;
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("key", apiKey);
    formData.append("expiration", expiration);
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const response = await axios.post(url, formData, headers);
      console.log("UPLOAD SUCCESS", response.data.data.url);
      detectEmotions(response.data.data.url);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const detectEmotions = async (imageData) => {
    const headers = {
      "X-RapidAPI-Key": "6e3a44137cmshf321fbccc5cb04dp132bf2jsnbb7f3808ab4a",
      "X-RapidAPI-Host": "emotion-detection2.p.rapidapi.com",
      "Content-Type": "application/json",
    };

    const data = {
      url: imageData,
    };

    try {
      const response = await axios.post(
        "https://emotion-detection2.p.rapidapi.com/emotion-detection",
        data,
        { headers }
      );
      console.log("EMOTIONSS", response.data);
      setLoader(false);
      Alert.alert(response.data[0].emotion.value);
    } catch (error) {
      setLoader(false);
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera type={type} style={styles.camera} ref={cameraRef}>
        <View style={{ marginTop: 650, alignSelf: "center" }}>
          <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 5,
              borderColor: "white",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_Bold",
              }}
            >
              SCAN
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {loader && (
        <View
          style={{
            position: "absolute",
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
          }}
        >
          <Loader />
        </View>
      )}
    </View>
  );
}

const Detect = ({ navigation }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      {active === 1 ? (
        <FaceExpression />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  camera: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
});
