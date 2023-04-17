import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ title, disabled, onPress }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.button,
        {
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#142F21",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#142F21",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins",
    textAlign: "left",
    color: "white",
  },
});
