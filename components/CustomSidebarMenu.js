import React, { useState } from 'react';
import { SafeAreaView,  View,  StyleSheet,  Text, Modal, Button, ScrollView} from 'react-native';
import {  DrawerContentScrollView,  DrawerItemList,  DrawerItem,} from '@react-navigation/drawer';
import { Avatar, Accessory , Image } from 'react-native-elements';

import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

import {avatars_url} from '../assets/Avatars'


const CustomSidebarMenu = (props) => {

  const [userName, setUserName] = useState("none");
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(avatars_url[0]);




  // saved username
  Auth.currentAuthenticatedUser()
  .then(user => {
    setUserName(user.username);
  })
  .catch(err => console.log(err))

  const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      resizeMode: 'contain',
      width: "80%",
      height: "25%",
      alignSelf: 'center',
      marginTop : 30
    },
    user_name : {
      alignSelf : 'center',
      fontSize : 20
    },

    centeredView: {
      flex: 1,
      margin : "10%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },

    scroll_item : {
      flex : 1,
      flexDirection : 'row',
      flexWrap : 'wrap',
      justifyContent: "center",
      alignItems: "center",
    },

    select_avatar : {
      resizeMode: 'contain',
      width: "30%",
      height: "30%",
      margin : 10
    }

  });

  return (
    <SafeAreaView style={{flex: 1}}>

      <Avatar
        size="xlarge"
        rounded
        onPress={() => {setModalVisible(!modalVisible);}}
        source={{
          uri:
            profilePic,
        }}
        style = {styles.sideMenuProfileIcon}
      >
      </Avatar>

      <Text  style={styles.user_name}>{userName}</Text>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
            <View style={{flex:0.1, justifyContent: "center", alignItems: "center",}}>
              <Text style={{fontSize:20}}>Choose your profile picture</Text>
            </View>
            

            <ScrollView style={{flex : 1}}>
              <View style = {styles.scroll_item}>
                {
                  avatars_url.map((url,index) => (
                      <Avatar
                        key = {index}
                        size= 'xlarge'
                        rounded
                        onPress={() => { setProfilePic(url) ; setModalVisible(!modalVisible);}}
                        source={{uri: url }}
                      >
                      </Avatar>
                    )
                  )
                }

              </View>
            </ScrollView>


            <View style={{flex:0.1, justifyContent: "center", alignItems: "center",}}>
              <Button 
              title="Cancel" 
              onPress={() => {setModalVisible(!modalVisible);} }
              color="tomato"
              />
            </View>


        </View>
      </Modal>
      

    </SafeAreaView>
  );
};

export default CustomSidebarMenu;