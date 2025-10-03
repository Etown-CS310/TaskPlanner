import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const LoginButton = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Login</Text>
    </Pressable>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    width: '65%',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});