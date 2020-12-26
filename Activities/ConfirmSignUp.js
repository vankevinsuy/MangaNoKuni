import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

//graphql
import {API, graphqlOperation} from 'aws-amplify';
import {createUser} from '../graphql/mutations';

import {avatars_url} from '../assets/Avatars'



export default function ConfirmSignUp({ navigation, updateAuthState, route}) {
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');

  const {password} = route.params;

  const themeDATA = useTheme();

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log('---------------------------------------------Code confirmed');

      try {
        await Auth.signIn(username, password);
        console.log('loggin Success');
        updateAuthState('loggedIn');

        Auth.currentAuthenticatedUser()
        .then(user => {
          try {
            API.graphql(graphqlOperation(createUser, {input: 
              {
                clienID : user.pool.clientId,
                imgProfil : avatars_url[Math.floor(Math.random() * avatars_url.length)],
                pseudo : username
              } 
            }))
          } catch (err) {
            console.log('error creating user:', err)
          }
        })

        navigation.navigate('Home');
      } catch (error) {
        console.log('Error signing in...', error);
      }

      //navigation.navigate('SignIn');
    } catch (error) {
      console.log(
        '--------------------------------------------- Verification code does not match. Please enter a valid verification code.',
        error.code
      );
    }
  }

  async function addUser() {
    try {
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } 
    catch (err) {
      console.log('error creating user:', err)
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