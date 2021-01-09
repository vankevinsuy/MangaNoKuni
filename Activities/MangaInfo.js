import React ,{useState, useEffect} from 'react';
import { StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity, Button} from 'react-native';
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
import {getManga, chapitreByMalId, readingByClienId, userByClienId} from '../graphql/queries';
import {createReading} from '../graphql/mutations';
import { updateReading, updateUser } from '../graphql/mutations';



export default function MangaInfo({route, navigation}) {

    const {mangaID} = route.params;
    const [mangaData, setMangaData] = useState()    
    const [chapters_list, setChapters_list] = useState([])
    const [nextToken , setNextToken] = useState(null)
    const [chapterLoading, setChapterLoading] = useState({flex : 1, alignItems : 'center' , justifyContent : 'center' , marginVertical : 10});
    const [currentChapter, setCurrentChapter] = useState(1)   
    const [client_favoris, setClient_favoris] = useState([]);
    const [is_in_lib, set_is_in_lib] = useState(false);
    const [is_in_lib_text, set_is_in_lib_text] = useState("Add to my library");

    const [loadingData, setLoadingData] = useState(true)

     useEffect(() => {
        setLoadingData(true)
        init_fetchManga().then(() => {
            setLoadingData(false)
        })
      }, [])

    //get 20 first chapters
    async function init_fetchManga() {
        try{
            const manga = await API.graphql(graphqlOperation(getManga, { id: mangaID} ));
            setMangaData(manga.data.getManga)
    
            const chap = await API.graphql(graphqlOperation(chapitreByMalId, { mal_id: manga.data.getManga.mal_id, limit: 20, sortDirection: 'DESC'} ))
            //console.log(chap.data.ChapitreByMalID.nextToken)
            setNextToken(chap.data.ChapitreByMalID.nextToken)
    
            var chapdata = chap.data.ChapitreByMalID.items
            setChapters_list(chapdata)
            // setLoadingData(false)

            await Auth.currentAuthenticatedUser()
            .then(async (user) => {   
                const client =  user.pool.clientId ;
                // console.log(client)
                // console.log(manga.data.getManga.mal_id)

                const userById = await API.graphql(graphqlOperation(userByClienId, {clienID: client} ));
                const list_fav = userById.data.UserByClienID.items[0].list_favoris;
                if(list_fav == null){
                    setClient_favoris([])
                  }
                else{
                    setClient_favoris(list_fav)
                    if(list_fav.includes(manga.data.getManga.mal_id)){
                        set_is_in_lib(true)
                        set_is_in_lib_text("In my library")
                    }
                  }

                const current_chap = await API.graphql(graphqlOperation(readingByClienId, { clienID: client, filter : {mal_id: {eq: manga.data.getManga.mal_id}} } ))
                if(current_chap.data.ReadingByClienID.items.length === 0){
                    // console.log("pas de chapitre on va le créer")
                    try{
                        API.graphql(graphqlOperation(createReading, {input: 
                            {
                            clienID : client,
                            mal_id :  manga.data.getManga.mal_id,
                            currentChapter : 1
                            } 
                        }))
                    }
                    catch (err) { console.error(err) }
                }
                else{
                    // console.log("donnée existante")
                    // console.log(current_chap.data.ReadingByClienID.items[0].currentChapter)
                    setCurrentChapter(current_chap.data.ReadingByClienID.items[0].currentChapter)
                }
            })


        }
        catch (err) { console.error(err) }
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 5;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    //get 100 more chapters
    async function fetchMoreChapter() {
        if(nextToken === null){
            setChapterLoading({display : 'none'})
        }
        else{
            const chap = await API.graphql(graphqlOperation(chapitreByMalId, { mal_id: mangaData.mal_id, limit: 100, sortDirection: 'DESC', nextToken : nextToken} ))
            setNextToken(chap.data.ChapitreByMalID.nextToken)
    
            var chapdata = chapters_list.concat(chap.data.ChapitreByMalID.items)
            setChapters_list(chapdata)
        }
    }

    //update chapter reading in db
    async function updateReadingTable(chapitre) {

        await Auth.currentAuthenticatedUser()
        .then(async (user) => {   
            const clientID =  user.pool.clientId ;
            try{
                const reading = await API.graphql(graphqlOperation(readingByClienId, {clienID: clientID, filter: {mal_id: {eq: mangaData.mal_id}}} )); 
                const readingData =  reading.data.ReadingByClienID.items[0]
    
                await API.graphql(graphqlOperation(updateReading, {input: {clienID: clientID, currentChapter: chapitre.num_chapitre, mal_id: mangaData.mal_id, id: readingData.id}} ))
                navigation.navigate("Reading", params = {chapitreData: chapitre, type : 1} )
            }
            catch (err) { console.error(err) }
        })
    }

    //update chapter reading in db
    async function updateUserFavorite() {

        await Auth.currentAuthenticatedUser()
        .then(async (user) => {   
            const clientID =  user.pool.clientId ;
            try{
                const userByID = await API.graphql(graphqlOperation(userByClienId, {clienID: clientID} )); 
                const userByIDData = userByID.data.UserByClienID.items[0]
                
                //add or remove from user list favorites
                //remove
                if(is_in_lib){
                    console.log("remove")

                    var i;
                    for (i = 0; i < client_favoris.length; i++) {
                        if(client_favoris[i] === mangaData.mal_id){
                            client_favoris.splice(i, 1)
                        }
                    }
                    console.log(client_favoris)
                    await API.graphql(graphqlOperation(updateUser, {input: {id: userByIDData.id, list_favoris: client_favoris} } ))

                    //change the button's color
                    set_is_in_lib(!is_in_lib)
                    set_is_in_lib_text("Add to my library")

                }
                //add
                else{
                    console.log("add")
                    client_favoris.push(mangaData.mal_id)

                    console.log(client_favoris)
                    await API.graphql(graphqlOperation(updateUser, {input: {id: userByIDData.id, list_favoris: client_favoris} } ))

                    //change the button's color
                    set_is_in_lib(!is_in_lib)
                    set_is_in_lib_text("In my library")
                }
            }
            catch (err) { console.error(err) }
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

    select_chapter : {
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
                        uri: mangaData.image_url,
                    }}
                />

                <TouchableOpacity style={styles.button_add_to_lib} onPress={()=> {
                    updateUserFavorite()
                }}>
                    <Text style={{fontSize:15}}>{is_in_lib_text}</Text>
                </TouchableOpacity>




                <Text style = {styles.title_japanese}>{mangaData.title_japanese}</Text>
                <Text style = {styles.title}>{mangaData.title}</Text>

                <TouchableOpacity style = {{backgroundColor:'tomato', alignItems: "center"}} onPress = {() => { navigation.navigate("Reading", params = {chapitreData: {mal_id: mangaData.mal_id, current_chap:currentChapter}, type : 0} )} } >
                    <Text style = {{fontSize : 20, marginVertical : 5}}>
                        {"Resume from chapter " + currentChapter.toString()}
                    </Text>
                </TouchableOpacity>
            </View>



            <ScrollView style = {{flex : 1, marginTop : 20}} onScroll={({nativeEvent}) => {if (isCloseToBottom(nativeEvent)) {fetchMoreChapter(nextToken)} }}>

                <View style={styles.details}>

                    <Text style = {{fontWeight: 'bold'}}>Author(s) :  
                        <Text> {mangaData.authors}</Text>
                    </Text>

                    <Text style = {{fontWeight: 'bold'}}>Genres :  
                        <Text> {mangaData.genre.join(" - ")}</Text>
                    </Text>

                    <Text style = {{fontWeight: 'bold'}}>MyAnimeList Score :  
                        <Text> {mangaData.score}</Text>
                    </Text>

                    <Text style = {{fontWeight: 'bold', fontSize : 20, marginTop : 20, marginBottom : 10}}>Synopsys </Text>
                    <Text style = {{textAlign : 'justify' , marginTop : 20, marginBottom : 5}} numberOfLines={5} >{mangaData.synopsys}</Text>
                </View>

                <View style={styles.select_chapter}>

                    {
                        chapters_list.map((chapitre, index) => 
                        
                        <TouchableOpacity key = {index} style = {{margin : 10}} onPress = {() => { updateReadingTable(chapitre) } }>
                            <Text style = {{fontWeight: 'bold', fontSize : 20}}>{chapitre.num_chapitre}</Text>
                            <Text>{chapitre.title}</Text>
                        </TouchableOpacity>

                        )
                    }

                </View>

                <View style = {chapterLoading}>
                    <Spinner size='giant'/>
                </View>
                
            </ScrollView>             
            



        </View>
    )
}

        </SafeAreaView>

    );

}