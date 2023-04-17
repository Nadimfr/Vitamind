import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Header from "../../components/Header";

function Home() {
  return (
    <View style={styles.container}>
      <Header screenName="Home" />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 42,
    fontFamily: "Poppins",
    textAlign: "left",
  },
  register: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text1: {
    fontFamily: "Lato",
    fontSize: 14,
    color: "#9E9C9B",
  },
  leftLine: {
    height: 2,
    width: "32%",
    marginHorizontal: 5,
  },
});
