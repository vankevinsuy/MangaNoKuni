import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';


export default function ConfirmSignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');

  const themeDATA = useTheme();

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log('<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> Code confirmed');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(
        '<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> Verification code does not match. Please enter a valid verification code.',
        error.code
      );
    }
  }


  const styles = StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: themeDATA["background-alternative-color-1"]
    },
    container: {
      flex: 1,
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
      marginVertical: 15
    }
  });

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={authCode}
          onChangeText={text => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  );
}