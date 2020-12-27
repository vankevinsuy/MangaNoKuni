import React ,{useState, useEffect} from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';


import { SafeAreaView } from 'react-native-safe-area-context';


// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {} from '../graphql/queries';



export default function Reading({route, navigation}) {

    const {chapitreData} = route.params;

    const [webViewSource, setwebViewSource] = useState({ uri: chapitreData.url });
    const [webViewStyle, setwebViewStyle] = useState({display : 'none'});

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
    }

    });

    const [loadingStyle, setLoadingStyle] = useState(styles.container_loading);



    return (
        <SafeAreaView style = {{flex : 1}}>

        <StatusBar
        backgroundColor={(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
        />

        <View style={styles.container}> 

            <View style = {loadingStyle}>
                <Spinner size='giant'/>
            </View>

            <WebView
                style={[webViewStyle, styles.WebView]}
                source={webViewSource}

                onLoad = {() => {
                    setwebViewStyle({display : 'none'})
                }}

                onLoadEnd = {() => {
                    setLoadingStyle({display : 'none'})
                    setwebViewSource({ html: chapitreData.images_html })
                    setwebViewStyle({flex : 1})
                }}
            />
        </View>

        </SafeAreaView>

    );

}