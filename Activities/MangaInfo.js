import React from 'react';
import { StyleSheet, Image,  Dimensions , Button} from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';



export default function MangaInfo({route, navigation}) {

    const {mangaData} = route.params;

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const styles = StyleSheet.create({
    container: {
        flex : 1,
    },


    });

    return (
    <View style={styles.container}> 
    
    </View>
    );

}