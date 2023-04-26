import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import * as Animatable from "react-native-animatable";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    confirmpassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior="position">
        <Text style={[styles.text, { color: "#142F21" }]}>Welcome to</Text>
        <Text
          style={[
            styles.text,
            {
              marginTop: -5,
              fontFamily: "Poppins_SemiBold",
              color: "#42A45C",
              marginBottom: 50,
            },
          ]}
        >
          VitaMind
        </Text>
        <View style={{ marginBottom: 10 }}>
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            value={user.fullname}
            onChange={(text) => setUser({ ...user, fullname: text })}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextField
            label="Email"
            placeholder="Enter your email address"
            value={user.email}
            onChange={(text) => setUser({ ...user, email: text })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <TextField
            label="Password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(text) => setUser({ ...user, password: text })}
          />
        </View>
        <Animatable.View
          style={{ marginBottom: 10 }}
          animation={
            user.confirmpassword.length > 0 &&
            user.confirmpassword !== user.password
              ? "shake"
              : null
          }
        >
          <TextField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={user.confirmpassword}
            onChange={(text) => setUser({ ...user, confirmpassword: text })}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
        </Animatable.View>

        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Button
            onPress={() => navigation.navigate("Home")}
            title="Register"
            disabled={(!user.email || !user.password) && true}
          />
        </View>

        <View style={styles.register}>
          <Text style={styles.text1}>Are you a member? </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={[
                styles.text1,
                { fontFamily: "Poppins_SemiBold", color: "#42A45C" },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <Text style={[styles.text1]}> here</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "start",
    paddingHorizontal: "7%",
    paddingTop: 100,
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
