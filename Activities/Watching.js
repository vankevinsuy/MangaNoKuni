import React ,{useState, useEffect} from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Layout as View, useTheme , Spinner , Text} from '@ui-kitten/components';
import { WebView } from 'react-native-webview';

import { SafeAreaView } from 'react-native-safe-area-context';

import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {chapitreByMalId, readingByClienId} from '../graphql/queries';
import { updateReading } from '../graphql/mutations';

import * as Crypto from 'expo-crypto';



export default function Watching({route, navigation}) {

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex : 1,
            backgroundColor: themeDATA['background-basic-color-1'],
        },
        
        container_loading: {
            flex : 1,
            backgroundColor: themeDATA['background-basic-color-1'],
            alignItems : 'center' , 
            justifyContent : 'center'
        },
    
        WebView : {
            backgroundColor: themeDATA['background-basic-color-1'],
        },

        tinyLogo: {
            width: 200,
            height: 200,
          },
    
    });



    return (
        <SafeAreaView style = {{flex : 1}}>

        <StatusBar
        backgroundColor={(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
        />

        </SafeAreaView>

    );

}