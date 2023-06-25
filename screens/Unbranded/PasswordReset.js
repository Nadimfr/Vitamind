import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import LottieView from 'lottie-react-native';

const PasswordReset = ({ navigation }) => {
  const [step, setStep] = useState(0);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <Header dots onBack={() => navigation.goBack()} />

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
            />
            <View style={{ marginTop: 15 }}>
              <Button title="Send Instructions" onPress={() => setStep(1)} />
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
            We have sent a password recover instructions to your email.
          </Text>

          <Button title="Next" onPress={() => setStep(2)} />

          <TouchableOpacity
            style={{ marginTop: 35 }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{ fontFamily: 'Lato', fontSize: 16, color: '#142F21' }}
            >
              Skip, I'll confirm later
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
              Did not receive the email? Check your spam filter, or try another
              email address
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
              <TextField label="Verification Code" />

              <TextField label="New Password" password />
              <TextField label="Confirm New Password" password />
            </View>

            <Button
              title="Reset Password"
              onPress={() => navigation.navigate('Login')}
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
