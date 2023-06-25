import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const TextField = ({
  onFocus,
  onBlur,
  label,
  placeholder,
  value,
  password,
  onChange,
  inputStyle,
  journal,
  textDetector,
}) => {
  const textInputRef = useRef(null);

  const handleOutsideClick = () => {
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={textInputRef}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          multiline={journal && true}
        />
      </View>
    </TouchableWithoutFeedback>
    // <View style={styles.container}>
    //   <Text style={styles.label}>{label}</Text>
    //   <TextInput
    //     ref={textInputRef}
    //     onFocus={onFocus}
    //     onBlur={onBlur}
    //     value={value}
    //     style={[
    //       styles.input,
    //       inputStyle,
    //       {
    //         paddingTop: journal && 30,
    //       },
    //     ]}
    //     placeholder={placeholder}
    //     secureTextEntry={password && true}
    //     onChangeText={onChange}
    //     multiline={journal || (textDetector && true)}
    //   />
    // </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  label: {
    color: '#142F21',
    fontSize: 16,
    fontFamily: 'Lato',
    marginLeft: 20,
  },

  input: {
    marginTop: 5,
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#142F21',
    backgroundColor: 'white',
    paddingTop: 15,
  },
});
