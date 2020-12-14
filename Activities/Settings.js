import React, { useState } from 'react';
import { StyleSheet, Button, StatusBar, Switch } from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Auth } from 'aws-amplify';

// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';


// import components
import Header from '../components/Header';

export default function Settings(props) {
  async function signOut() {
    try {
      await Auth.signOut();
      props.updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();

  function toogleDrawer() {
    props.navigation.openDrawer()
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeDATA["background-basic-color-1"]
    }, 


  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor = {(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
      />
      <Header toogle = {toogleDrawer}/>

      <View>
        <Text>Settings</Text>
      </View>
      

      <Button title="Sign Out" color="tomato" onPress={signOut} />

      
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