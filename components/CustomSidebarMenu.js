import React, { useState , useEffect} from 'react';
import { SafeAreaView,  View,  StyleSheet,  Text, Modal, Button, ScrollView} from 'react-native';
import {  DrawerContentScrollView,  DrawerItemList,  DrawerItem,} from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';

import Amplify, { Auth, input } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

import {avatars_url} from '../assets/Avatars'

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {userByClienId} from '../graphql/queries'
import {updateUser} from '../graphql/mutations'

const CustomSidebarMenu = (props) => {

  const [userPseudo, setUserPseudo] = useState("none");
  const [clientData, setclientData] = useState();
  const [profilePic, setProfilePic] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser().
    then(user => {   
      fetchUser(user.pool.clientId)
    })
  }, [])

  async function fetchUser(client_ID) {
    try {
      const x = await API.graphql(graphqlOperation(userByClienId, {clienID : client_ID}))
      const user = x.data.UserByClienID.items[0]
      // console.log(user)
      setclientData(user)

      setUserPseudo(user.pseudo);
      setProfilePic(user.imgProfil)
    }
    catch (err) { console.error(err) }
}

  async function changeProfilPic(new_url){
    try{
      await API.graphql(graphqlOperation(updateUser, {input : {id : clientData.id ,  imgProfil : new_url, pseudo : clientData.pseudo , clienID : clientData.clienID} } ))
      .then(
        setProfilePic(new_url)
      )
    }
    catch (err) { console.error(err) }
  }

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

      <Text  style={styles.user_name}>{userPseudo}</Text>

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
                        onPress={() => { changeProfilPic(url) ; setModalVisible(!modalVisible);}}
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