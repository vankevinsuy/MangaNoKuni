import React from 'react';
import { StyleSheet,TouchableOpacity, Text} from 'react-native';

import * as app_common_style from '../assets/themes/common_style';



const SingnupButton = () =>  {
    return (
        <TouchableOpacity style={styles.TouchableStyleClass}>

            <Text style={styles.TextStyle}>Sign up</Text>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    TouchableStyleClass: app_common_style.signup_button_style, 

    TextStyle:app_common_style.sign_button_text_style
});

export default SingnupButton;