import React, { useState } from "react";
import { StyleSheet,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as app_common_style from '../assets/themes/common_style';
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';

const PseudoTextInput = (props) =>   {
  const [input_pseudo, setPseudo] = useState("");
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('pseudo', value)
    } 
    catch (e) {
      console.log(e);
    }
  }

  const store = (val) =>{
    setPseudo(val);
    storeData(val);
    //console.log(val);
  }

  const styles = StyleSheet.create({
    TextInputStyleClass: app_common_style.text_input_style,
    theme_adjustement : {
      color : (props.darkSelected) ? dark_theme.text_color : light_theme.text_color
    }
  });

  return (
        <TextInput
        placeholder="Pseudo"
        style={[styles.TextInputStyleClass, styles.theme_adjustement]} 
        placeholderTextColor= {app_common_style.text_input_text_color} 
        onChangeText={text => store(text)}
        value={input_pseudo}/>
    );
}


export default PseudoTextInput;