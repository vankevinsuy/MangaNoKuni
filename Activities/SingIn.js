import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image,  Switch, StatusBar, Alert } from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

// aws import
import { Auth } from 'aws-amplify';

// components import
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';


// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';



export default function SignIn({ navigation, updateAuthState}) {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();

  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log('loggin Success');
      updateAuthState('loggedIn');
    } catch (error) {
      console.log('Error signing in...', error.message);

      Alert.alert(
        "Error signing",
        error.message,
        [{ text: "OK"}],
      );

    }

  }



  const styles = StyleSheet.create({
      safeAreaContainer: {
        flex: 1,
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
      },
      banner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: 'center'
      }

  });

  //androidOnBackPressed();
  
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      
      <StatusBar 
        backgroundColor = {themeDATA['background-basic-color-1']}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
      />

      <View style={styles.container}>
        <Text>Sign in to your account</Text>

        <Image
            style={styles.banner}
            source= {(themeContext.theme === "dark") ? require('../assets/app_images/banner_dark.jpg') :  require('../assets/app_images/banner_light.jpg')}
        />

        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
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
        <AppButton title="Login" onPress={signIn} />

        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
    </View>


    <View style={app_common_style.switch_theme_style}>
      <Text>Light</Text>
        <Switch
        trackColor={{ false: app_common_style.switch_trackColor_false, true: app_common_style.switch_trackColor_true }}
        thumbColor={themeContext.theme === "dark" ? app_common_style.switch_thumbColor_true : app_common_style.switch_thumbColor_false}
        ios_backgroundColor= {app_common_style.switch_trackColor_false}
        onValueChange={themeContext.toggleTheme}
        value={themeContext.theme === "dark"}
        />
      <Text>Dark</Text>
    </View>


  </SafeAreaView>
  );


}