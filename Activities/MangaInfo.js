import React ,{useState} from 'react';
import { StyleSheet, Image,  Dimensions , Button, ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {getManga} from '../graphql/queries';



export default function MangaInfo({route, navigation}) {

    const {mangaData} = route.params;
    
    // Query using a parameter
    async function fetchMangas() {
        const oneTodo = await API.graphql(graphqlOperation(getManga, { id: mangaData.id} ));
        console.log(oneTodo)
    }

    fetchMangas()

    const [value_chapter, setValue_chapter] = useState(400)

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const styles = StyleSheet.create({
    container: {
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
    );

}