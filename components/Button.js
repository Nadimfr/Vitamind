import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const Button = ({ title, disabled, onPress, loading, theme }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.button,
        {
          opacity: disabled ? 0.6 : 1,
          backgroundColor: theme == 'dark' ? 'white' : '#142F21',
        },
      ]}
    >
      {!loading ? (
        <Text
          style={[
            styles.text,
            {
              color: theme == 'dark' ? '#142F21' : 'white',
            },
          ]}
        >
          {title}
        </Text>
      ) : (
        <ActivityIndicator color="white" size="small" />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#142F21',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins',
    textAlign: 'left',
  },
});
