import React, { useState } from "react";
import { StyleSheet,TextInput} from 'react-native';

import * as app_common_style from '../assets/themes/common_style';
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';


const PasswordTextInput = (props) =>   {
  const [input_password, setPassword] = useState("");

  const styles = StyleSheet.create({
    TextInputStyleClass: app_common_style.text_input_style,
    theme_adjustement : {
      color : (props.darkSelected) ? dark_theme.text_color : light_theme.text_color
    }
  });

  return (
        <TextInput
        placeholder="Password"
        style={[styles.TextInputStyleClass, styles.theme_adjustement]} 
        placeholderTextColor= {app_common_style.text_input_text_color}         
        onChangeText={text => setPassword(text)}
        value={input_password}/>
    );
}

export default PasswordTextInput;