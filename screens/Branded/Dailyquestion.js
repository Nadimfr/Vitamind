import React, { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Dailyquestion() {
  const [clicked, setClicked] = useState();
  const answers = [
    {
      text: "Improve mood",
    },
    {
      text: "Increase productivity",
    },
    {
      text: "Reduce stress or anxiety",
    },
    {
      text: "Self-improvement",
    },
    {
      text: "Something else",
    },
  ];
  return (
    <View
      style={{
        paddingTop: 100,
        paddingHorizontal: 70,
        height: "100%",
        backgroundColor: "#B2ECC4",
        backgroundColor: "rgba(178 236 196 / 0.6)",
      }}
    >
      <View>
        <Text style={styles.titleheading}>
          Anything specific you’d like to work on?
        </Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.titleparagraph}>
          your answers won’t stop you from accessing any activities.
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        {answers.map((a, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={[
              styles.buttons,
              {
                backgroundColor: index == clicked ? "#142F21" : "white",
              },
            ]}
            onPress={() => setClicked(index)}
          >
            <Text
              style={[
                styles.titleparagraph2,
                { color: index == clicked ? "white" : "#42A45C" },
              ]}
            >
              {a.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TouchableOpacity style={styles.buttonnext}>
          <Text style={{ color: "white", fontSize: 22 }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Dailyquestion;

const styles = StyleSheet.create({
  titleheading: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Poppins_SemiBold",
    alignSelf: "center",
    color: "#142F21",
  },
  titleparagraph: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins_Regular",
    alignSelf: "center",
    color: "#42A45C",
  },
  titleparagraph2: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins_Medium",
    alignSelf: "center",
  },
  buttonnext: {
    display: "flex",
    marginTop: 60,
    width: 130,
    height: 55,
    backgroundColor: "#142F21",
    borderColor: "#142F21",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttons: {
    display: "flex",
    marginTop: 20,
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#142F21",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
