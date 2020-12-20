import React from 'react';
import { StyleSheet, Image,  Dimensions , Button} from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';



// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';



export default function CardManga({ navigation , mangaData}) {

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
        margin : 10,
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
      navigation.navigate("MangaInfo", params = {mangaID: mangaData.id} )
  }


  return (
    <View style={styles.container}>
        <View style={styles.img_container}>
            <Image style={styles.image} source={{uri: mangaData.image_url}}/>
        </View>

        <View style={styles.info_container}>
            <Text style = {styles.title_japanese}> {mangaData.title_japanese}</Text>
            <Text style = {styles.title} adjustsFontSizeToFit = {true} numberOfLines = {1}>{mangaData.title}</Text>
            <Text style = {styles.score}>Score : {mangaData.score} / 10</Text>

            <Button
                onPress={click}
                title="View More"
                color="tomato"
            />

        </View>
    </View>
  );

}