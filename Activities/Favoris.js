import React, { useState } from 'react';
import { StyleSheet,  StatusBar } from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';

// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// import components
import Header from '../components/Header';

export default function Favoris(props) {

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
        backgroundColor = {themeDATA["background-basic-color-1"]}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
      />

      <Header toogle = {toogleDrawer}/>
      <Text>Favoris</Text>

    </SafeAreaView>
  );
}