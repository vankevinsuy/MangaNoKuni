import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Layout as View, useTheme, Spinner, Text } from '@ui-kitten/components';
import { WebView } from 'react-native-webview';

import { SafeAreaView } from 'react-native-safe-area-context';

import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import { API, graphqlOperation } from 'aws-amplify';
import { chapitreByMalId, readingByClienId } from '../graphql/queries';
import { updateReading } from '../graphql/mutations';

import * as Crypto from 'expo-crypto';



export default function Reading({ route, navigation }) {

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeDATA['background-basic-color-1'],
        },

        container_loading: {
            flex: 1,
            backgroundColor: themeDATA['background-basic-color-1'],
            alignItems: 'center',
            justifyContent: 'center'
        },

        WebView: {
            backgroundColor: themeDATA['background-basic-color-1'],
        },

        tinyLogo: {
            width: 200,
            height: 200,
        },

    });

    const [current_chap, setCurrent_chap] = useState(route.params.chapitreData.num_chapitre);
    const [chapitreData, setChapitreData] = useState(route.params.chapitreData);
    const [loadingStyle, setLoadingStyle] = useState(styles.container_loading);
    const [webViewSource, setwebViewSource] = useState({ uri: route.params.chapitreData.url });
    const [webViewStyle, setwebViewStyle] = useState({ display: 'none' });

    const [clientID, setclientData] = useState();

    async function hash(username) {
        return await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            username)
    }

    useEffect(() => {

        Auth.currentAuthenticatedUser().
            then(user => {
                hash(user.username).then((hashed) => {
                    setclientData(hashed)
                })
            })

        if (route.params.type == 0) {
            fetchChapter(chapitreData).then((val) => {
                setChapitreData(val);
                setwebViewSource({ uri: val.url })
                setLoadingStyle(styles.container_loading)
                setwebViewStyle({ display: 'none' })
                setCurrent_chap(val.current_chap)
            })
        }

    }, [])

    //get chapter data
    async function fetchChapter(Data) {
        try {
            const chapitre = await API.graphql(graphqlOperation(chapitreByMalId, { mal_id: Data.mal_id, num_chapitre: { eq: Data.current_chap } }));
            setChapitreData(chapitre.data.ChapitreByMalID.items[0])
            return chapitre.data.ChapitreByMalID.items[0]
        }
        catch (err) { console.error(err) }
    }

    //get next chapter data
    async function fetchNextChapter() {

        try {
            const chapitre = await API.graphql(graphqlOperation(chapitreByMalId, { mal_id: chapitreData.mal_id, num_chapitre: { eq: chapitreData.num_chapitre + 1 } }));

            const newChapData = chapitre.data.ChapitreByMalID.items[0]

            console.log(typeof newChapData)

            if (newChapData != undefined) {
                setwebViewStyle({ display: 'none' })
                setLoadingStyle(styles.container_loading)

                setChapitreData(newChapData)
                setwebViewSource({ uri: newChapData.url })

                updateReadingTable()
            }
            else {
                console.log("pas de chapitre suivant")
                Alert.alert("Oups", "This is the last chapter 🤓")
            }

        }
        catch (err) { console.error(err) }
    }

    //update chapter reading in db
    async function updateReadingTable() {

        try {
            const reading = await API.graphql(graphqlOperation(readingByClienId, { clienID: clientID, filter: { mal_id: { eq: chapitreData.mal_id } } }));
            const readingData = reading.data.ReadingByClienID.items[0]

            await API.graphql(graphqlOperation(updateReading, { input: { clienID: clientID, currentChapter: chapitreData.num_chapitre + 1, mal_id: chapitreData.mal_id, id: readingData.id } }))
        }
        catch (err) { console.error(err) }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar
                backgroundColor={(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
                barStyle={(themeContext.theme === "dark") ? 'light-content' : 'dark-content'}
            />

            <View style={styles.container} >

                <View style={loadingStyle}>
                    <Spinner size='giant' />
                </View>

                <WebView
                    style={[webViewStyle, styles.WebView]}
                    source={webViewSource}

                    onLoad={() => {
                        setwebViewStyle({ display: 'none' })
                    }}

                    onLoadEnd={() => {
                        setLoadingStyle({ display: 'none' })
                        //setwebViewSource({ html: chapitreData.images_html })
                        setwebViewStyle({ flex: 1 })
                    }}
                    pullToRefreshEnabled={true}
                />

                <TouchableOpacity onPress={() => { fetchNextChapter(); }} style={{ backgroundColor: 'tomato', alignItems: "center" }}>
                    <Text style={{ fontSize: 20, marginVertical: 5 }} >Next chapter</Text>
                </TouchableOpacity>


            </View>

        </SafeAreaView>

    );

}