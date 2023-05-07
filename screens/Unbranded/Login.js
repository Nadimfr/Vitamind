import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import TextField from '../../components/TextField';
import * as api from '../../controllers/ApiUser';
import { storeData } from '../../helpers/AsyncStorage';

function Login({ navigation }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const handleLogin = (userInfo) => {
    setLoading(true);
    console.log('USER', userInfo);
    api.userLogin(userInfo).then((res) => {
      if (res == 404) {
        setLoading(false);
        setShowPopup(true);
      } else {
        console.log('login screen', res);
        storeData('token', res?.data?.token);
        storeData('user', res?.data?.user);
        navigation.navigate('Home');
        setLoading(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {showPopup && (
        <Popup
          title="Cannot Login"
          description="Invalid user credentials"
          onPress={() => setShowPopup(false)}
        />
      )}
      <KeyboardAvoidingView behavior="position">
        <Text style={[styles.text, { color: '#142F21' }]}>Welcome to</Text>
        <Text
          style={[
            styles.text,
            {
              marginTop: -5,
              fontFamily: 'Poppins_SemiBold',
              color: '#42A45C',
              marginBottom: 50,
            },
          ]}
        >
          VitaMind
        </Text>

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
            password
            label="Password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(text) => setUser({ ...user, password: text })}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ alignSelf: 'flex-end', marginTop: 5 }}
          >
            <Text style={styles.text1}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Button
            onPress={() => handleLogin(user)}
            title="Login"
            disabled={(!user.email || !user.password) && true}
            loading={loading}
          />
        </View>

        <View style={styles.register}>
          <Text style={styles.text1}>Not a member? </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Register')}
          >
            <Text
              style={[
                styles.text1,
                { fontFamily: 'Poppins_SemiBold', color: '#42A45C' },
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
          <Text style={[styles.text1]}> now</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            colors={['transparent', '#42A45C']}
            style={styles.leftLine}
          />
          <Text style={styles.text1}>or continue with</Text>
          <LinearGradient
            end={{ x: 0, y: 0.75 }}
            start={{ x: 1, y: 0.25 }}
            colors={['transparent', '#42A45C']}
            style={styles.leftLine}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginTop: 25,
          }}
        >
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.25,
              shadowRadius: 1,
            }}
          >
            <Image
              resizeMode="cover"
              source={require('../../assets/fb.png')}
              style={{
                height: 60,
                width: 60,
                backgroundColor: 'white',
                borderRadius: 50,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.25,
              shadowRadius: 1,
            }}
          >
            <Image
              resizeMode="cover"
              source={require('../../assets/google.png')}
              style={{
                height: 30,
                width: 30,
                backgroundColor: 'white',
                borderRadius: 50,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'start',
    paddingHorizontal: '7%',
    paddingTop: 150,
  },
  text: {
    fontSize: 42,
    fontFamily: 'Poppins',
    textAlign: 'left',
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text1: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: '#9E9C9B',
  },
  leftLine: {
    height: 2,
    width: '32%',
    marginHorizontal: 5,
  },
});
