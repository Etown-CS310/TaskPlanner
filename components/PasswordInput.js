import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

import showPasswordIcon from '../assets/images/show-password.png';
import hidePasswordIcon from '../assets/images/hide-password.png';

const PasswordInput = ({ value, onChangeText, showPassword, toggleShowPassword }) => {
  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder="Enter Password"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={toggleShowPassword}>
        <Image
          source={showPassword ? hidePasswordIcon : showPasswordIcon}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  passwordContainer: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginVertical: 12,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});