import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,  Switch, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../assets/themes/theme-context';

// aws import
import { Auth } from 'aws-amplify';

// components import
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { changeTheme, getTheme } from '../CustomFunctions/CommonVariable';


// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';

// import functions
import { androidOnBackPressed } from '../CustomFunctions/Android';


export default function SignIn({ navigation, updateAuthState }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [themeGet, setGetted] = useState(false);
  const [DarkSelected, setTheme] = useState(false);

  const themeContext = React.useContext(ThemeContext);

  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log('loggin Success');
      updateAuthState('loggedIn');
    } catch (error) {
      console.log('Error signing in...', error);
    }
  }

  console.log("-------------------SIGNIN------------------------");



  // set DarkSelected state value once
  if(themeGet === false){
    console.log("theme data not saved");
    getTheme().then((value) => {
      console.log("Singin theme " + value);
  
      if(value === "dark"){
        setTheme(true);
      }
      if(value === "light"){
        setTheme(false);
      }
    });
    console.log("DarkSelected = " + DarkSelected);
  }
  else{
    console.log("theme data already saved");
  }


  const toggleSwitch = async () => {

    setTheme(previousState => !previousState);    
    setGetted(true);

    if(!DarkSelected === true){
      changeTheme("dark");
    }
    else{
      changeTheme("light");
    }
  };




  const styles = StyleSheet.create({
      safeAreaContainer: {
        flex: 1,
        backgroundColor: (DarkSelected) ? dark_theme.background_color : light_theme.background_color,
      },
      container: {
        flex: 1,
        alignItems: 'center'
      },
      title: {
        fontSize: 20,
        color: (DarkSelected) ? dark_theme.text_color : light_theme.text_color,
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
      },

      text : {
        color: (DarkSelected) ? dark_theme.text_color : light_theme.text_color,
      }

  });

  androidOnBackPressed();
  
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar 
        backgroundColor = {(DarkSelected) ? dark_theme.background_color : light_theme.background_color}
        barStyle = {(DarkSelected) ?  'light-content' :  'dark-content'}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>

        <Image
              style={styles.banner}
              source= {(DarkSelected) ? require('../assets/app_images/banner_dark.jpg') :  require('../assets/app_images/banner_light.jpg')}
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
        <Text style = {styles.text}>Light</Text>
          <Switch
          trackColor={{ false: app_common_style.switch_trackColor_false, true: app_common_style.switch_trackColor_true }}
          thumbColor={DarkSelected ? app_common_style.switch_thumbColor_true : app_common_style.switch_thumbColor_false}
          ios_backgroundColor= {app_common_style.switch_trackColor_false}
          // onValueChange={toggleSwitch}
          onValueChange={themeContext.toggleTheme}
          value={DarkSelected}
          />
        <Text style = {styles.text} >Dark</Text>
      </View>

    </SafeAreaView>
  );


}