import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import * as api from "../../controllers/ApiUser";
import Popup from "../../components/Popup";

function Register({ navigation }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    image_url: "",
    verificationCode: null,
  });
  const [matchingPassword, setMatchingPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    console.log("MATCHING", matchingPassword);
  }, [matchingPassword]);

  const validateEmail = (email) => {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email.toLowerCase());
  };

  const validatePassword = (password) => {
    // Check for the password requirements
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one digit.";
    }
    if (!/[a-z]/i.test(password)) {
      return "Password must contain at least one letter.";
    }
    return "";
  };

  const handleCode = useCallback(async () => {
    setLoading(true);
    if (!validateEmail(user.email)) {
      setShowEmailPopup(true);
    } else {
      const passwordError = validatePassword(user.password);
      const confirmPasswordError =
        user.password !== user.confirmPassword ? "Passwords do not match." : "";

      if (passwordError) {
        setPasswordError(passwordError);
        setMatchingPassword(true);
        setConfirmPasswordError("");
      } else if (confirmPasswordError) {
        setPasswordError("");
        setMatchingPassword(false);
        setConfirmPasswordError(confirmPasswordError);
      } else {
        try {
          const res = await api.VerificationCodeReception(user.email);
          navigation.navigate("Verify", {
            user: {
              ...user,
              verificationCode: res,
            },
          });
        } catch (error) {
          console.log("errrorrr", error);
          Alert.alert(error.message);
        } finally {
          setLoading(false);
        }
      }
    }
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      {showEmailPopup && (
        <Popup
          title="Cannot Login"
          description="Invalid email format"
          onPress={() => setShowEmailPopup(false)}
        />
      )}

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
            label="Username"
            placeholder="Enter your username"
            value={user.username}
            onChange={(text) => setUser({ ...user, username: text })}
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
            inputStyle={{ borderColor: !matchingPassword && "red" }}
            password
            label="Password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(text) => setUser({ ...user, password: text })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <TextField
            inputStyle={{ borderColor: !matchingPassword && "red" }}
            password
            label="Confirm Password"
            placeholder="Confirm your password"
            value={user.confirmPassword}
            onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
            secureTextEntry
            onChange={(text) => setUser({ ...user, confirmPassword: text })}
          />

          {!matchingPassword && (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          )}
          {passwordError !== "" && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Button
            onPress={() => handleCode(user.email)}
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
          <Text style={styles.text1}> here</Text>
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginLeft: 15,
    marginTop: 5,
  },
});
