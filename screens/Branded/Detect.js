import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ImageBackground,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { Camera, CameraType } from "expo-camera";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const Detect = ({ navigation }) => {
  const [active, setActive] = useState(0);
  const [url, setUrl] = useState("");
  const [mood, setMood] = useState("");

  const detectEmotion = async () => {
    // console.log("Lynn", options);

    await axios
      .request({
        method: "POST",
        url: "https://emotion-detection2.p.rapidapi.com/emotion-detection",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "6e3a44137cmshf321fbccc5cb04dp132bf2jsnbb7f3808ab4a",
          "X-RapidAPI-Host": "emotion-detection2.p.rapidapi.com",
        },
        data: `{"url":"${url}"}`,
      })
      .then(function (response) {
        console.log("Lynn", response.data);
        setMood(response.data[0].emotion.value);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);

  //     const url = "https://api.imgbb.com/1/upload";
  //     const apiKey = "e400225c1aca3fbc13a11be33e2bb24d";
  //     const expiration = 1000000;
  //     const headers = {
  //       "Content-Type": "multipart/form-data",
  //     };

  //     const formData = new FormData();
  //     formData.append("key", apiKey);
  //     formData.append("expiration", expiration);
  //     formData.append("image", {
  //       uri: image,
  //       type: "image/jpeg",
  //       name: "image.jpg",
  //     });

  //     await axios
  //       .post(url, formData, headers)
  //       .then((response) => {
  //         console.log("UPLOAD SUCCESS", response.data.data.url);
  //         setUrl(response.data.data.url);
  //       })
  //       .catch((error) => {
  //         console.log("ERROR", error);
  //       });
  //   }
  // };

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
      setUrl(response.data.data.url);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  return (
    <>
      {active === 1 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <Button title="Test" onPress={detectEmotion} />

          {mood && <Text>You are {mood}</Text>}
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

const styles = StyleSheet.create({});
