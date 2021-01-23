import React from 'react';
import { StyleSheet, Image,  Dimensions , Button} from 'react-native';
import { Layout as View, Text, useTheme  } from '@ui-kitten/components';



// themes import 
import { ThemeContext } from '../assets/themes/theme-context';



export default function CardAnime({ navigation , animeData}) {

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();

  const styles = StyleSheet.create({
    container: {
        flex : 1,
        flexDirection: 'row',
        marginHorizontal : 30,
        marginTop : 10,
    },

    img_container : {
        margin : 10
    },

    image : {
        width: Dimensions.get('window').width/3.5,
        height: Dimensions.get('window').height/4,
        resizeMode : 'contain',
    },

    info_container : {
        flex : 1,
        margin : 10,
    },

    title_japanese : {
        marginVertical : 10,
        fontSize : 20,
        fontWeight: "bold"
    },

    title : {
        margin : 10,
        fontSize : 15,
    },

    score : {
        margin : 10,
    },


  });

  const click = () =>{
      navigation.navigate("AnimeInfo", params = {animeID: animeData.id} )
  }


  return (
    <View style={styles.container}>
        <View style={styles.img_container}>
            <Image style={styles.image} source={{uri: animeData.image_url}}/>
        </View>

        <View style={styles.info_container}>
            <Text style = {styles.title_japanese} adjustsFontSizeToFit = {true} numberOfLines = {1}> {animeData.title_japanese}</Text>
            <Text style = {styles.title} adjustsFontSizeToFit = {true} numberOfLines = {1}>{animeData.title}</Text>
            <Text style = {styles.score}>Score : {animeData.score} / 10</Text>

            <Button
                onPress={click}
                title="View More"
                color="tomato"
            />

        </View>
    </View>
  );

}