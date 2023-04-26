import React, { useEffect, useState } from "react";
import { Dimensions, Text, View, Animated, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(178 236 196 / 0.85)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Lato",
          fontSize: 18,
          color: "white",
          position: "absolute",
          textAlign: "center",
        }}
      >
        We're scanning your{"\n"}face please wait
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.circle,
              {
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.circle,
              {
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.circle,
              {
                opacity: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </Text>
      <LottieView
        source={require("../lottieAnimations/FELoader.json")}
        autoPlay
        loop
        style={{ width: Dimensions.get("screen").width, marginTop: 50 }}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
});
