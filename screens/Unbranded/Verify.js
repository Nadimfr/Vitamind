import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import * as api from '../../controllers/ApiUser';

const Verify = ({ route, navigation }) => {
  //   useLayoutEffect(() => {
  //     navigation.setOptions({ gestureEnabled: false });
  //   }, [navigation]);

  useEffect(() => {
    console.log('USER', route.params.user);
  }, []);

  const fields = [{}, {}, {}, {}];

  const textInputRefs = fields.map(() => useRef(null));

  const [focusedInput, setFocusedInput] = useState(0); // keep track of the current focused TextInput component
  const [formValues, setFormValues] = useState(Array(fields.length).fill('')); // keep track of the current value of each TextInput component
  const [allFieldsFilled, setAllFieldsFilled] = useState(false); // keep track of whether or not all fields have been filled out
  const [loading, setLoading] = useState(false);

  function handleFieldChange(text, idx) {
    const newFormValues = [...formValues];
    newFormValues[idx] = text;
    setFormValues(newFormValues);

    if (text.length === 1 && idx < fields.length - 1) {
      textInputRefs[idx + 1].current.focus(); // set focus on the next TextInput component
    } else if (text.length === 1 && idx === fields.length - 1) {
      textInputRefs[idx].current.blur(); // blur the last TextInput component to trigger a submit action
    }

    setAllFieldsFilled(newFormValues.every((value) => value.length > 0)); // check if all fields have been filled out
  }

  useEffect(() => {
    if (allFieldsFilled) {
      handleRegister(route.params.user);
    }
  }, [allFieldsFilled]);

  const handleRegister = async (userInfo) => {
    setLoading(true);
    if (formValues.join('') == route.params.user.verificationCode) {
      await api
        .userRegister(userInfo)
        .then((res) => {
          storeData('token', res.token);
          storeData('user', res);
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error.response.data);
          Alert.alert('Registration failed', error.response.data.message);
          setLoading(false);
        });
    } else Alert.alert('Not similar codes');
    setLoading(false);
  };

  return (
    <View style={{ paddingTop: 200, paddingHorizontal: 20 }}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins_Bold',
          fontSize: 30,
          marginBottom: 50,
        }}
      >
        Please Verify your account
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {fields.map((f, idx) => (
          <View
            key={idx}
            style={{
              height: 75,
              width: 70,
            }}
          >
            <TextInput
              onChangeText={(text) => handleFieldChange(text, idx)}
              onFocus={() => setFocusedInput(idx)} // update the focusedInput state
              ref={textInputRefs[idx]} // assign a ref to each TextInput component
              keyboardType="numeric"
              maxLength={1}
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                fontSize: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 25,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Verify;
