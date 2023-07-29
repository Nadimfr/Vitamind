import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import LottieView from 'lottie-react-native';
import * as api from '../../controllers/ApiUser';
import Popup from '../../components/Popup';

const PasswordReset = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(null);
  const [popup, setPopup] = useState(false);
  const [enteredCode, setEnteredCode] = useState(null);

  const [user, setUser] = useState({ email: '', password: '' });

  const resetPassword = (userInfo) => {
    console.log('USER', user);
    if (code == enteredCode) {
      api.resetPassword(userInfo).then((res) => {
        console.log('first', res);
        if (res.status == 200) {
          setPopup(true);
        }
      });
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <Header dots onBack={() => navigation.goBack()} />

      {popup && (
        <Popup
          title="Success"
          description="Password updated successfully!"
          onPress={() => {
            setPopup(false);
            navigation.navigate('Login');
          }}
        />
      )}

      {step == 0 ? (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'Poppins_SemiBold',
              color: '#142F21',
            }}
          >
            Reset Password
          </Text>
          <Text
            style={{
              fontFamily: 'Lato',
              fontSize: 16,
              marginTop: 10,
              color: '#9E9C9B',
            }}
          >
            Enter the email associated with your account and we'll send an email
            with instructions to reset your password.
          </Text>

          <View style={{ marginTop: 35 }}>
            <TextField
              label="Email address"
              placeholder="Enter your email..."
              value={user.email}
              onChange={(text) => setUser({ ...user, email: text })}
            />
            <View style={{ marginTop: 15 }}>
              <Button
                title="Send Instructions"
                onPress={async () => {
                  setStep(1);
                  console.log(user.email);
                  await api.getUserDetailsByEmail(user?.email).then((res) => {
                    setCode(res.data.verificationCode);
                    console.log('jjjj', res.data);
                  });
                }}
                disabled={!user.email && true}
              />
            </View>
          </View>
        </View>
      ) : step == 1 ? (
        <View
          style={[styles.container, { alignItems: 'center', paddingTop: 50 }]}
        >
          <LottieView
            source={require('../../lottieAnimations/inbox.json')}
            autoPlay
            loop
            style={{
              width: Dimensions.get('screen').width / 3,
              opacity: 0.75,
            }}
          />
          <Text
            style={{
              fontFamily: 'Poppins_SemiBold',
              fontSize: 24,
              marginTop: 15,
              marginBottom: 10,
              color: '#142F21',
            }}
          >
            Check your mail
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Lato',
              fontSize: 16,
              color: '#9E9C9B',
              marginHorizontal: 10,
              marginBottom: 35,
            }}
          >
            We would like you to check the verification code we sent when you
            created your account. Please verify it accordingly.
          </Text>

          <Button title="Next" onPress={() => setStep(2)} />

          <TouchableOpacity
            style={{ marginTop: 35 }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{ fontFamily: 'Lato', fontSize: 16, color: '#142F21' }}
            >
              Skip, I'll check later
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 200 }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Lato',
                fontSize: 16,
              }}
            >
              Check your spam filter*
            </Text>
          </View>
        </View>
      ) : (
        step == 2 && (
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Poppins_SemiBold',
                color: '#142F21',
              }}
            >
              Create new Password
            </Text>
            <Text
              style={{
                fontFamily: 'Lato',
                fontSize: 16,
                marginTop: 10,
                color: '#9E9C9B',
              }}
            >
              Your new password must be different from previous used passwords.
            </Text>

            <View style={{ marginVertical: 35, gap: 10 }}>
              <TextField
                keyboardType="numeric"
                label="Verification Code"
                value={enteredCode}
                onChange={(text) => setEnteredCode(text)}
              />

              <TextField
                label="New Password"
                password
                value={user.password}
                onChange={(text) => setUser({ ...user, password: text })}
              />
              {/* <TextField label="Confirm New Password" password /> */}
            </View>

            <Button
              title="Reset Password"
              onPress={() => {
                resetPassword(user);
              }}
            />
          </View>
        )
      )}
    </View>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '7%',
    // alignItems: 'center',
  },
});
