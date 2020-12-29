import React ,{useState, useEffect} from 'react';
import { StyleSheet, StatusBar, Button, } from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';


import { SafeAreaView } from 'react-native-safe-area-context';


// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {chapitreByMalId} from '../graphql/queries';




export default function Reading({route, navigation}) {

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

    
    });

    const [current_chap, setCurrent_chap] = useState(route.params.chapitreData.num_chapitre);
    const [chapitreData, setChapitreData] = useState(route.params.chapitreData);
    const [loadingStyle, setLoadingStyle] = useState(styles.container_loading);
    const [webViewSource, setwebViewSource] = useState({ uri: route.params.chapitreData.url });
    const [webViewStyle, setwebViewStyle] = useState({display : 'none'});

    useEffect(() => {

        if(route.params.type == 0){
            fetchChapter(chapitreData).then((val) => {
                setChapitreData(val); 
                setwebViewSource({ uri: val.url })
                setLoadingStyle(styles.container_loading)
                setwebViewStyle({display : 'none'})
                setCurrent_chap(val.current_chap)
            })
        }

      }, [])

    //get chapter data
    async function fetchChapter(chapitreData) {
        try{
            const chapitre = await API.graphql(graphqlOperation(chapitreByMalId, { mal_id: chapitreData.mal_id, num_chapitre: {eq: chapitreData.current_chap} } ));  
            setChapitreData(chapitre.data.ChapitreByMalID.items[0])
            return chapitre.data.ChapitreByMalID.items[0]
        }
        catch (err) { console.error(err) }
    }

    //get next chapter data
    async function fetchNextChapter() {
        setwebViewStyle({display : 'none'})
        setLoadingStyle(styles.container_loading)
        try{
            const chapitre = await API.graphql(graphqlOperation(chapitreByMalId, { mal_id: chapitreData.mal_id, num_chapitre: {eq: chapitreData.num_chapitre + 1} } ));  

            const newChapData = chapitre.data.ChapitreByMalID.items[0]

            setChapitreData(newChapData)
            setwebViewSource({ uri:  newChapData.url })
        }
        catch (err) { console.error(err) }
    }



    return (
        <SafeAreaView style = {{flex : 1}}>

        <StatusBar
        backgroundColor={(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
        />

        <View style={styles.container} > 

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

            <Button title={"Next chapter"} color="tomato" onPress = { () => { fetchNextChapter()  } }/>
        </View>

        </SafeAreaView>

    );

}