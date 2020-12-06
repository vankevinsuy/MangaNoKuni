import React from 'react';
import { StyleSheet , TouchableOpacity, Image} from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SearchBar } from 'react-native-elements';

// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';


const Header = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const themeDATA = useTheme();

    const styles = StyleSheet.create({
        container: {
          flex: 0.15,
          alignItems: 'center', 
          backgroundColor : (themeContext.theme === "dark") ? themeDATA["background-basic-color-1"] : app_common_style.splash_screen_color,
          flexDirection: "row",
        }, 
        drawerButton : {
            width: 40, 
            height: 40,
            marginLeft: 10
        },
    });



    return (
    <View style = {styles.container}>
        <TouchableOpacity onPress = {props.toogle}>
            <Image
                source= {require('../assets/drawerButton/drawerDark.png')}
                style={styles.drawerButton}
            />
        </TouchableOpacity>

    </View>
    );
}

export default Header;