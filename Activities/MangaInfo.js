import React ,{useState, useEffect} from 'react';
import { StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';


// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {getManga, chapitreByMalId} from '../graphql/queries';



export default function MangaInfo({route, navigation}) {

    const {mangaID} = route.params;

    const [user_chapter, setValue_chapter] = useState(10)
    const [mangaData, setMangaData] = useState({})    
    const [chapters_list, setChapters_list] = useState([])
    const [nextToken , setNextToken] = useState(null)

    const [chapterLoading, setChapterLoading] = useState({flex : 1, alignItems : 'center' , justifyContent : 'center' , marginVertical : 10});


    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        setLoadingData(true)
        init_fetchManga()
      }, [])


    //get 20 first chapters
    async function init_fetchManga() {
        const manga = await API.graphql(graphqlOperation(getManga, { id: mangaID} ));
        setMangaData(manga.data.getManga)

        const chap = await API.graphql(graphqlOperation(chapitreByMalId, { mal_id: manga.data.getManga.mal_id, limit: 20, sortDirection: 'DESC'} ))
        //console.log(chap.data.ChapitreByMalID.nextToken)
        setNextToken(chap.data.ChapitreByMalID.nextToken)

        var chapdata = chap.data.ChapitreByMalID.items
        setChapters_list(chapdata)
        setLoadingData(false)
    }

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 5;
        // console.log(layoutMeasurement.height + contentOffset.y)
        // console.log(contentSize.height)
        // console.log("---------------------------------")

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
        flex : 0.7,
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
            </View>



            <ScrollView style = {{flex : 1}} onScroll={({nativeEvent}) => {if (isCloseToBottom(nativeEvent)) {fetchMoreChapter(nextToken)} }}>

                <View style={styles.details}>
                    <Text style = {styles.title_japanese}>{mangaData.title_japanese}</Text>
                    <Text style = {styles.title}>{mangaData.title}</Text>

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
                        
                        <TouchableOpacity key = {index} style = {{margin : 10}} onPress = {() => { navigation.navigate("Reading", params = {chapitreData: chapitre} ) }  }>
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