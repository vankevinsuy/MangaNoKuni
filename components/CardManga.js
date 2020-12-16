import React from 'react';
import { StyleSheet, Image,  Dimensions } from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';



export default function CardManga(props) {

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();



  const styles = StyleSheet.create({
    container: {
        flex : 1,
        flexDirection: 'row',
    },

    img_container : {
        //backgroundColor : 'red',
    },

    image : {
        width: Dimensions.get('window').width/3,
        height: Dimensions.get('window').height/3,
        resizeMode : 'contain',

    },

    info_container : {
        flex : 1,
        //backgroundColor : 'green',
    }
  });


  return (
    <View style={styles.container}>
        <View style={styles.img_container}>
            <Image style={styles.image} source={{uri: props.mangaData.image_url}}/>
        </View>

        <View style={styles.info_container}>
            <Text>{props.mangaData.title_japanese}</Text>
            <Text>{props.mangaData.title}</Text>
            <Text>{props.mangaData.score} / 10</Text>
        </View>
    </View>
  );

}