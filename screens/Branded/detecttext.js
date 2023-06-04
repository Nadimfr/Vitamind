import React, { useContext, useState } from "react";
import { Alert, StatusBar, StyleSheet, View, TextInput } from "react-native";
import Button from "../../components/Button";
import axios from "axios";
import "url-search-params-polyfill";

function detecttext({ navigation }) {
  const [inputText, setInputText] = useState("");

  const analyzeEmotion = async () => {
    try {
      const options = {
        method: "POST",
        url: "https://emodex-emotions-analysis.p.rapidapi.com/rapidapi/emotions",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "810b2d9819msh010a518e166457dp1d30f3jsnca3431feabfa",
          "X-RapidAPI-Host": "emodex-emotions-analysis.p.rapidapi.com",
        },
        data: {
          sentence: inputText,
        },
      };
      const response = await axios.request(options);
      console.log(response.data);
      const emotions = response.data.sentence;

      // Find the highest emotion
      let highestEmotion = "";
      let highestEmotionValue = 0;

      for (const emotion in emotions) {
        if (emotions[emotion] > highestEmotionValue) {
          highestEmotion = emotion;
          highestEmotionValue = emotions[emotion];
        }
      }

      // Display the highest emotion
      Alert.alert("Emotion in this text is:", highestEmotion);
      // Alert.alert(
      //   "Emotion Values",
      //   `Anger: ${emotions.anger}\n` +
      //     `Disgust: ${emotions.disgust}\n` +
      //     `Fear: ${emotions.fear}\n` +
      //     `Joy: ${emotions.joy}\n` +
      //     `Love: ${emotions.love}\n` +
      //     `No Emotion: ${emotions.noemo}\n` +
      //     `Sadness: ${emotions.sadness}\n` +
      //     `Surprise: ${emotions.surprise}\n` +
      //     `Text: ${emotions.text}`
      // );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={{ marginBottom: 10 }}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter your text"
        />
        <Button title="Analyze" onPress={analyzeEmotion} />
      </View>
    </View>
  );
}

export default detecttext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "start",
    paddingHorizontal: "7%",
    paddingTop: 150,
  },
});
