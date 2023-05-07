import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const TextField = ({
  label,
  placeholder,
  value,
  password,
  onChange,
  inputStyle,
  journal,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        style={[
          styles.input,
          inputStyle,
          {
            paddingTop: journal && 30,
          },
        ]}
        placeholder={placeholder}
        secureTextEntry={password && true}
        onChangeText={onChange}
        multiline={journal && true}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    color: "#142F21",
    fontSize: 16,
    fontFamily: "Lato",
    marginLeft: 20,
  },

  input: {
    marginTop: 5,
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#142F21",
  },
});
