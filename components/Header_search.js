import React from 'react';
import { StyleSheet , TouchableOpacity, Image} from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SearchBar } from 'react-native-elements';

// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

const HeaderSearch = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

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
                onChangeText={newVal => newVal}
                //onClearText={() => console.log(onClearText())}
                placeholder="Type query here..."
                placeholderTextColor="#888"
                round
                //value={value}
            />
                    
            <TouchableOpacity>
                <Text style = {styles.SearchBar_clear_icon}>Clear</Text>
            </TouchableOpacity>

        </View>


    </View>
    );
}

export default HeaderSearch;