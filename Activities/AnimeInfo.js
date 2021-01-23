import React ,{useState, useEffect} from 'react';
import { StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

import Amplify, { Auth, input } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {getAnime, episodeByMalId, watchingByClienId, userByClienId} from '../graphql/queries';
import {createWatching} from '../graphql/mutations';
import { updateWatching, updateUser } from '../graphql/mutations';

import * as Crypto from 'expo-crypto';



export default function AnimeInfo({route, navigation}) {

    const {animeID} = route.params;
    const [animeData, setAnimeData] = useState()    
    const [episodes_list, setEpisodes_list] = useState([])
    const [nextToken , setNextToken] = useState(null)
    const [episodeLoading, setEpisodeLoading] = useState({flex : 1, alignItems : 'center' , justifyContent : 'center' , marginVertical : 10});
    const [currentEpisode, setCurrentEpisode] = useState(1)   
    const [client_favoris, setClient_favoris] = useState([]);
    const [is_in_lib, set_is_in_lib] = useState(false);
    const [is_in_lib_text, set_is_in_lib_text] = useState("Add to my library");

    const [loadingData, setLoadingData] = useState(true)

    async function hash(username){
        return await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          username)
    }

     useEffect(() => {
        setLoadingData(true)
        init_fetchAnime().then(() => {
            setLoadingData(false)
        })
      }, [])

    //get 20 first episodes
    async function init_fetchAnime() {
        try{
            const anime = await API.graphql(graphqlOperation(getAnime, { id: animeID} ));
            setAnimeData(anime.data.getAnime)
    
            const episode = await API.graphql(graphqlOperation(episodeByMalId, { mal_id: anime.data.getAnime.mal_id, limit: 20, sortDirection: 'DESC'} ))
            setNextToken(episode.data.EpisodeByMalID.nextToken)
    
            var episodedata = episode.data.EpisodeByMalID.items
            setEpisodes_list(episodedata)
            // setLoadingData(false)

            await Auth.currentAuthenticatedUser()
            .then(async (user) => {   
                hash(user.username).then(async(client)=>{
                    const userById = await API.graphql(graphqlOperation(userByClienId, {clienID: client} ));
                    const list_fav = userById.data.UserByClienID.items[0].list_favoris_anime;
                    if(list_fav == null){
                        setClient_favoris([])
                      }
                    else{
                        setClient_favoris(list_fav)
                        if(list_fav.includes(anime.data.getAnime.mal_id)){
                            set_is_in_lib(true)
                            set_is_in_lib_text("In my library")
                        }
                      }
    
                    const current_episode = await API.graphql(graphqlOperation(watchingByClienId, { clienID: client, filter : {mal_id: {eq: anime.data.getAnime.mal_id}} } ))
                    if(current_episode.data.WatchingByClienID.items.length === 0){
                        try{
                            API.graphql(graphqlOperation(createWatching, {input: 
                                {
                                clienID : client,
                                mal_id :  anime.data.getAnime.mal_id,
                                currentEpisode : 1
                                } 
                            }))
                        }
                        catch (err) { console.error(err) }
                    }
                    else{
                        // console.log("donnée existante")
                        setCurrentEpisode(current_episode.data.WatchingByClienID.items[0].currentEpisode)
                    }
                })

            })


        }
        catch (err) { console.error(err) }
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 5;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    //get 100 more episodes
    async function fetchMoreEpisode() {
        if(nextToken === null){
            setEpisodeLoading({display : 'none'})
        }
        else{
            const episode = await API.graphql(graphqlOperation(episodeByMalId, { mal_id: animeData.mal_id, limit: 100, sortDirection: 'DESC', nextToken : nextToken} ))
            setNextToken(episode.data.EpisodeByMalID.nextToken)
    
            var episodedata = episodes_list.concat(episode.data.EpisodeByMalID.items)
            setEpisodes_list(episodedata)
        }
    }

    //update episode watching in db
    async function updateWatchingTable(episode) {

        await Auth.currentAuthenticatedUser()
        .then(async (user) => {   
            hash(user.username).then(async (clientID) => {
                try{
                    const watching = await API.graphql(graphqlOperation(watchingByClienId, {clienID: clientID, filter: {mal_id: {eq: animeData.mal_id}}} )); 
                    const watchingData =  watching.data.WatchingByClienID.items[0]
        
                    await API.graphql(graphqlOperation(updateWatching, {input: {clienID: clientID, currentEpisode: episode.num_episode, mal_id: animeData.mal_id, id: watchingData.id}} ))
                    navigation.navigate("Watching", params = {episodeData: episode, type : 1} )
                }
                catch (err) { console.error(err) }
            })
        })
    }

    async function updateUserFavorite() {

        await Auth.currentAuthenticatedUser()
        .then(async (user) => {   
            hash(user.username).then(async(clientID)=>{
                try{
                    const userByID = await API.graphql(graphqlOperation(userByClienId, {clienID: clientID} )); 
                    const userByIDData = userByID.data.UserByClienID.items[0]
                    
                    //add or remove from user list favorites
                    //remove
                    if(is_in_lib){
                        console.log("remove")
    
                        var i;
                        for (i = 0; i < client_favoris.length; i++) {
                            if(client_favoris[i] === animeData.mal_id){
                                client_favoris.splice(i, 1)
                            }
                        }
                        console.log(client_favoris)
                        await API.graphql(graphqlOperation(updateUser, {input: {id: userByIDData.id, list_favoris_anime: client_favoris} } ))
    
                        //change the button's color
                        set_is_in_lib(!is_in_lib)
                        set_is_in_lib_text("Add to my library")
    
                    }
                    //add
                    else{
                        console.log("add")
                        client_favoris.push(animeData.mal_id)
    
                        console.log(client_favoris)
                        await API.graphql(graphqlOperation(updateUser, {input: {id: userByIDData.id, list_favoris_anime: client_favoris} } ))
    
                        //change the button's color
                        set_is_in_lib(!is_in_lib)
                        set_is_in_lib_text("In my library")
                    }
                }
                catch (err) { console.error(err) }
            })

        })
    }

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
    },

    container_header: {
        flex : 0.8,
        backgroundColor: themeDATA['background-basic-color-1'],
    },

    header_image : {
        flex : 1,
        resizeMode : 'contain',
        marginVertical : 20,
    },

    details : {
        flex : 1,
        marginHorizontal : 20,
        marginBottom : 10
    },

    select_episode : {
        flex : 0.5,
        marginHorizontal : 20,
    },

    slider : {
        width: "100%",
        marginVertical : 20
    },

    button_read : {
        marginVertical : 20
    },

    title_japanese : {
        alignSelf : 'center',
        fontSize : 30
    },

    title: {
        alignSelf : 'center',
        fontSize : 20
    },

    button_add_to_lib : {
        backgroundColor: (is_in_lib ? "green" : "tomato"),
        alignSelf: 'flex-start' , 
        position : 'absolute', 
        top :1, 
        right:1, 
        padding : 5
    },

    });

    return (
        <SafeAreaView style = {{flex : 1}}>

        <StatusBar
        backgroundColor={(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
        />

{
    loadingData ? 
    (   <View style = {{flex : 1, alignItems : 'center' , justifyContent : 'center'}}>
            <Spinner size='giant'/>
        </View>
    ):
    (
        <View style={styles.container}> 
        
            <View style={styles.container_header}>

                <Image
                    style={styles.header_image}
                    source={{
                        uri: animeData.image_url,
                    }}
                />

                <TouchableOpacity style={styles.button_add_to_lib} onPress={()=> {
                    updateUserFavorite()
                }}>
                    <Text style={{fontSize:15}}>{is_in_lib_text}</Text>
                </TouchableOpacity>




                <Text style = {styles.title_japanese}>{animeData.title_japanese}</Text>
                <Text style = {styles.title}>{animeData.title}</Text>

                <TouchableOpacity style = {{backgroundColor:'tomato', alignItems: "center"}} onPress = {() => { navigation.navigate("Watching", params = {episodeData: {mal_id: animeData.mal_id, current_episode:currentEpisode}, type : 0} )} } >
                    <Text style = {{fontSize : 20, marginVertical : 5}}>
                        {"Resume from episode " + currentEpisode.toString()}
                    </Text>
                </TouchableOpacity>
            </View>



            <ScrollView style = {{flex : 1, marginTop : 20}} onScroll={({nativeEvent}) => {if (isCloseToBottom(nativeEvent)) {fetchMoreEpisode(nextToken)} }}>

                <View style={styles.details}>

                    <Text style = {{fontWeight: 'bold'}}>Author(s) :  
                        <Text> {animeData.authors}</Text>
                    </Text>

                    <Text style = {{fontWeight: 'bold'}}>Genres :  
                        <Text> {animeData.genre.join(" - ")}</Text>
                    </Text>

                    <Text style = {{fontWeight: 'bold'}}>MyAnimeList Score :  
                        <Text> {animeData.score}</Text>
                    </Text>

                    <Text style = {{fontWeight: 'bold', fontSize : 20, marginTop : 20, marginBottom : 10}}>Synopsys </Text>
                    <Text style = {{textAlign : 'justify' , marginTop : 20, marginBottom : 5}} numberOfLines={5} >{animeData.synopsys}</Text>
                </View>

                <View style={styles.select_episode}>

                    {
                        episodes_list.map((episode, index) => 
                        
                        <TouchableOpacity key = {index} style = {{margin : 10}} onPress = {() => { updateWatchingTable(episode) } }>
                            <Text style = {{fontWeight: 'bold', fontSize : 20}}>{episode.num_episode}</Text>
                            <Text>{episode.title}</Text>
                        </TouchableOpacity>

                        )
                    }

                </View>

                <View style = {episodeLoading}>
                    <Spinner size='giant'/>
                </View>
                
            </ScrollView>             
            



        </View>
    )
}

        </SafeAreaView>

    );

}