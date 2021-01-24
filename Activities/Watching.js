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
import { episodeByMalId, watchingByClienId } from '../graphql/queries';
import { updateWatching } from '../graphql/mutations';

import * as Crypto from 'expo-crypto';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function Watching({ route, navigation }) {

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeDATA['background-basic-color-1'],
            alignItems: 'center',
            justifyContent: 'center'
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

    const [current_episode, setCurrent_episode] = useState(route.params.episodeData.num_episode);
    const [episodeData, setEpisodeData] = useState(route.params.episodeData);
    const [loadingStyle, setLoadingStyle] = useState(styles.container_loading);
    const [webViewSource, setwebViewSource] = useState({ uri: route.params.episodeData.url });
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
            fetchEpisode(episodeData).then((val) => {
                setEpisodeData(val);
                setwebViewSource({ uri: val.url })
                setLoadingStyle(styles.container_loading)
                setwebViewStyle({ display: 'none' })
                setCurrent_episode(val.current_episode)
            })
        }

    }, [])

    //get chapter data
    async function fetchEpisode(Data) {
        try {
            const episode = await API.graphql(graphqlOperation(episodeByMalId, { mal_id: Data.mal_id, num_episode: { eq: Data.current_episode } }));
            setEpisodeData(episode.data.EpisodeByMalID.items[0])
            return episode.data.EpisodeByMalID.items[0]
        }
        catch (err) { console.error(err) }
    }

    //get next chapter data
    async function fetchNextEpisode() {

        try {
            const episode = await API.graphql(graphqlOperation(episodeByMalId, { mal_id: episodeData.mal_id, num_episode: { eq: episodeData.num_episode + 1 } }));

            const newEpisodeData = episode.data.EpisodeByMalID.items[0]

            if (newEpisodeData != undefined) {
                setwebViewStyle({ display: 'none' })
                setLoadingStyle(styles.container_loading)

                setEpisodeData(newEpisodeData)
                setwebViewSource({ uri: newEpisodeData.url })

                updateWatchingTable()
            }
            else {
                Alert.alert("Oups", "This is the last episode 🤓")
            }

        }
        catch (err) { console.error(err) }
    }

    //update chapter reading in db
    async function updateWatchingTable() {

        try {
            const watching = await API.graphql(graphqlOperation(watchingByClienId, { clienID: clientID, filter: { mal_id: { eq: episodeData.mal_id } } }));
            const watchingData = watching.data.WatchingByClienID.items[0]

            await API.graphql(graphqlOperation(updateWatching, { input: { clienID: clientID, currentEpisode: episodeData.num_episode + 1, mal_id: episodeData.mal_id, id: watchingData.id } }))
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

                <Video
                    source={{ uri: webViewSource.uri }}
                    isMuted={false}
                    rate={1.0}
                    shouldPlay
                    resizeMode="contain"
                    useNativeControls
                    style={{ width: "100%", height: "50%" }}
                    onLoad = {() => {
                        setLoadingStyle({ display: 'none' })
                    }}                    
                />

            </View>

        </SafeAreaView>

    );

}