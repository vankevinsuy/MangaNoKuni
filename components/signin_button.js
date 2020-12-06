import React from 'react';
import { StyleSheet,TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as app_common_style from '../assets/themes/common_style';



const SingninButton  = () => {

    const getData = async () => {
            try {
            const value = await AsyncStorage.getItem('pseudo')
            console.log(value);
            //   if(value !== null) {
            //     console.log("pseudo null");
            //   }
            } catch(e) {
                console.log(e);
            }
    }
      
      
    
    return (
        <TouchableOpacity 
        style={styles.TouchableStyleClass}
        onPress={() => getData()}>

            <Text style={styles.TextStyle}>Sign in</Text>

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    TouchableStyleClass: app_common_style.signin_button_style, 

    TextStyle:app_common_style.sign_button_text_style
});

export default SingninButton;