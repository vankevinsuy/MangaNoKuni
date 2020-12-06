import React, { useState } from 'react';
import { SafeAreaView,  View,  StyleSheet,  Text, } from 'react-native';
import {  DrawerContentScrollView,  DrawerItemList,  DrawerItem,} from '@react-navigation/drawer';
import { Avatar, Accessory , Image } from 'react-native-elements';

import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);


const CustomSidebarMenu = (props) => {

  const [userName, setUserName] = useState("none");

  // saved username
  Auth.currentAuthenticatedUser()
  .then(user => {
    setUserName(user.username);
  })
  .catch(err => console.log(err))

  const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      resizeMode: 'contain',
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginTop : 30
    },
    user_name : {
      alignSelf : 'center',
      fontSize : 20
    }
  });

  return (
    <SafeAreaView style={{flex: 1}}>

      <Avatar
        size="xlarge"
        rounded
        onPress={() => console.log("Works!")}
        source={{
          uri:
            'https://wallpapercave.com/wp/wp5117151.png',
        }}
        style = {styles.sideMenuProfileIcon}
      >
      </Avatar>

      <Text  style={styles.user_name}>{userName}</Text>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />


      </DrawerContentScrollView>

    </SafeAreaView>
  );
};

export default CustomSidebarMenu;