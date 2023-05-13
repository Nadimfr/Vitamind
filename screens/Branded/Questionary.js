import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Questionary() {
  const [clicked, setClicked] = useState();
  const answers = [
    {
      text: "Option A",
    },
    {
      text: "Option B",
    },
    {
      text: "Option C",
    },
    {
      text: "Option D",
    },
  ];

  const questions = [
    {
      text: "what is your name?",
    },
    {
      text: "What is your age?",
    },
    {
      text: "What is your nationality?",
    },
    {
      text: "What is wrong with you?",
    },
  ];
  return (
    <View style={{ backgroundColor: "#142F21", flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 280,
          backgroundColor: "#B2ECC4",
          borderBottomLeftRadius: 75,
          borderBottomRightRadius: 75,
          paddingHorizontal: 50,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingVertical: 75,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 150,
            backgroundColor: "white",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            marginTop: 110,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingVertical: 75,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "white",
              borderColor: "#B2ECC4",
              borderWidth: 4,
              zIndex: 100,
              borderRadius: 50,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              alignSelf: "center",
              marginTop: -120,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontFamily: "Poppins_Bold",
                alignSelf: "center",
                color: "#142F21",
                padding: 20,
              }}
            >
              1
            </Text>
          </View>
          {questions.map((l, index) => (
            <Text
              style={{
                textAlign: "center",
                fontSize: 22,
                fontFamily: "Poppins_Bold",
                alignSelf: "center",
                color: "#142F21",
                width: "100%",
              }}
            >
              {l.text}
            </Text>
          ))}
        </View>

        <View style={{ width: "100%", paddingHorizontal: 30, marginTop: 15 }}>
          {answers.map((a, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              key={index}
              style={[
                styles.buttons,
                {
                  backgroundColor: index == clicked ? "#B2ECC4" : "white",
                },
              ]}
              onPress={() => setClicked(index)}
            >
              <Text style={styles.titleparagraph2}>{a.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 35,
              alignSelf: "center",
            }}
          >
            <TouchableOpacity style={styles.buttonnext}>
              <Text style={{ color: "#142F21", fontSize: 22 }}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonnext}>
              <Text style={{ color: "#142F21", fontSize: 22 }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Questionary;

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
    color: "#142F21",
    fontFamily: "Poppins_Medium",
    alignSelf: "center",
  },
  buttonnext: {
    display: "flex",
    marginTop: 40,
    width: 130,
    height: 55,
    backgroundColor: "#B2ECC4",
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
    borderColor: "#B2ECC4",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
