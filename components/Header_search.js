import React , {useState} from 'react';
import { StyleSheet , TouchableOpacity, Image} from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SearchBar } from 'react-native-elements';

// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {listMangas} from '../graphql/queries';

const HeaderSearch = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const [myText, setMyText] = useState('');

    async function searchMangas(txt) {

        const formalized_text = txt.toUpperCase().split(" ").join("").replace(/[^a-zA-Z0-9]/g, '')

        try {
          const mangaData = await API.graphql(graphqlOperation(listMangas, {filter : {title_search: {contains: formalized_text}} }))
          props.setStateMangas(mangaData.data.listMangas.items.sort( 

            function(a, b) {
                var nameA = a.title_search; // ignore upper and lowercase
                var nameB = b.title_search; // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1; //nameA comes first
                }
                if (nameA > nameB) {
                  return 1; // nameB comes first
                }
                return 0;  // names must be equal
              })

           ) 

        } 
        catch (err) { console.error(err) }
    }


    const styles = StyleSheet.create({
        container: {
          flex: 0.1,
          alignItems: 'center', 
          backgroundColor :  (themeContext.theme === "dark") ? themeDATA["background-basic-color-1"] : app_common_style.splash_screen_color,
          flexDirection: "row",
        }, 
        drawerButton : {
            flex: 0.5,
            width : 50,
            resizeMode : 'contain'
        }, 

        SearchBar_global_container : {
            flex : 1,
            flexDirection: "row",
            alignItems: 'center', 
            marginRight : 5,
            backgroundColor :  (themeContext.theme === "dark") ? themeDATA["background-basic-color-1"] : app_common_style.splash_screen_color,
        },

        SearchBar_container : {
            flex : 1,
            borderTopWidth : 0,
            borderBottomWidth : 0,
            backgroundColor :  (themeContext.theme === "dark") ? themeDATA["background-basic-color-1"] : app_common_style.splash_screen_color,  
        },

        SearchBar_clear_icon :{
            color : "white",
            marginHorizontal : 5
        }
    });


    return (
    <View style = {styles.container}>
        <TouchableOpacity onPress = {props.toogle}>
            <Image
                source= {require('../assets/drawerButton/drawerDark.png')}
                style={styles.drawerButton}
            />
        </TouchableOpacity>

        <View style = {styles.SearchBar_global_container}>
            
            <SearchBar
                platform="default"
                containerStyle={styles.SearchBar_container}
                inputContainerStyle={{backgroundColor : 'white'}}
                inputStyle={{}}
                leftIconContainerStyle={{}}
                rightIconContainerStyle={{}}
                loadingProps={{}}
                onChangeText={(newVal) => {setMyText(newVal); searchMangas(newVal)} }
                placeholder="Search manga ..."
                placeholderTextColor="#888"
                round
                value={myText}
                onClear = {() => {setMyText(''); }}
            />
        </View>


    </View>
    );
}

export default HeaderSearch;