import React from 'react';
import { StyleSheet , TouchableOpacity, Image} from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SearchBar } from 'react-native-elements';

// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';


const Header = ({tabname, toogle}, props) => {

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const styles = StyleSheet.create({
        container: {
          flex: 0.1,
          alignItems: 'center', 
          backgroundColor : (themeContext.theme === "dark") ? themeDATA["background-basic-color-1"] : app_common_style.splash_screen_color,
          flexDirection: "row",
        }, 
        drawerButton : {
            flex: 0.5,
            width : 50,
            resizeMode : 'contain'
        },

        tabname : {
            flex : 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20
        }

    });



    return (
    <View style = {styles.container}>
        <TouchableOpacity onPress = {toogle}>
            <Image
                source= {require('../assets/drawerButton/drawerDark.png')}
                style={styles.drawerButton}
            />
        </TouchableOpacity>

        <Text style = {styles.tabname}>{tabname}</Text>

    </View>
    );
}

export default Header;