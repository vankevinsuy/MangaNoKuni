import React ,{useState, useEffect} from 'react';
import { StyleSheet, Image, Button, ScrollView, StatusBar} from 'react-native';
import Slider from '@react-native-community/slider';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';


// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {getManga, listChapitres} from '../graphql/queries';



export default function MangaInfo({route, navigation}) {

    const {mangaID} = route.params;

    const [value_chapter, setValue_chapter] = useState(400)
    const [mangaData, setMangaData] = useState()    
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        setLoadingData(true)
        fetchManga()
      }, [])


    // Query using a parameter
    async function fetchManga() {
        const manga = await API.graphql(graphqlOperation(getManga, { id: mangaID} ));
        setMangaData(manga.data.getManga)
        setLoadingData(false)


        let filter = {
            mal_id: 116778
        };

        const chap = await API.graphql({ query: listChapitres, variables: { filter: filter}});
        console.log(chap.data)
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

    header_image : {
        flex : 0.7,
        resizeMode : 'contain',
        marginVertical : 20,
    },

    details : {
        flex : 1,
        marginHorizontal : 20,
    },

    select_chapter : {
        flex : 0.5,
        marginHorizontal : 20
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

        <Image
            style={styles.header_image}
            source={{
                uri: mangaData.image_url,
            }}
        />

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

            <Text style = {{fontWeight: 'bold', fontSize : 20, marginTop : 20}}>Synopsys </Text>
            <ScrollView>
                <Text style = {{textAlign : 'justify'}} >{mangaData.synopsys}</Text>
            </ScrollView>
        </View>

        <View style={styles.select_chapter}>

            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={1000}
                step = {1}
                minimumTrackTintColor="red"
                maximumTrackTintColor="blue"
                thumbTintColor = "tomato"
                value = {value_chapter}
                onValueChange = {(value) => {setValue_chapter(value)}}
            />
            
            <Button
                style = {styles.button_read}
                //  onPress={onPressLearnMore}
                title= {"Read chapter " + value_chapter}
                color="tomato"
            />

        </View>

        </View>
    )
}

        </SafeAreaView>

    );

}