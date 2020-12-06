import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';



export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const themeDATA = useTheme();

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log('<img draggable="false" class="emoji" alt="✅" src="https://s.w.org/images/core/emoji/11/svg/2705.svg"> Sign-up Confirmed');
      navigation.navigate('ConfirmSignUp');
    } catch (error) {
      console.log('<img draggable="false" class="emoji" alt="❌" src="https://s.w.org/images/core/emoji/11/svg/274c.svg"> Error signing up...', error);
    }
  }

  console.log("-------------------SIGNUP------------------------");



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
    },
    footerButtonContainer: {
      marginVertical: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    forgotPasswordButtonText: {
      color: 'tomato',
      fontSize: 18,
      fontWeight: '600'
    }
  });



  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create a new account</Text>
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
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppTextInput
          value={email}
          onChangeText={text => setEmail(text)}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppButton title="Sign Up" onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.forgotPasswordButtonText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

