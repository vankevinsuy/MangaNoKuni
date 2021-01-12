import React, { useState, useEffect } from 'react';
import { StyleSheet,  StatusBar , Button} from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';

// themes import 
import * as light_theme from '../assets/themes/light';
import * as dark_theme from '../assets/themes/dark';
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

// import components
import Header from '../components/Header';

// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {userByClienId, listMangas} from '../graphql/queries';

export default function Mylibrary({props, navigation}) {

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();

  const [clientID, setclientData] = useState("");
  const [client_favoris, setClient_favoris] = useState();
  const [Mangas, setMangas] = useState(["e"])


  useEffect(() => {
    Auth.currentAuthenticatedUser().
    then(user => {   
      setclientData(user.pool.clientId);
      init_fetchUserData(user.pool.clientId);
    })

  }, [])

  //get user data
  async function init_fetchUserData(ID) {

        try{
            const user = await API.graphql(graphqlOperation(userByClienId, {clienID: ID} ));
            const list_fav = user.data.UserByClienID.items[0].list_favoris

            if(list_fav == null){
              setClient_favoris([])
            }
            else{
              setClient_favoris(user.data.UserByClienID.items[0].list_favoris)
              var i;
              for (i = 0; i < list_fav.length; i++) {
                fetchMangas(list_fav[i])
              } 
            }
        }
        catch (err) { console.error(err) }
  }

  async function fetchUserFav() {

    try{
        const user = await API.graphql(graphqlOperation(userByClienId, {clienID: clientID} ));
        const list_fav = user.data.UserByClienID.items[0].list_favoris

        if(list_fav == null){
          setClient_favoris([])
        }
        else{
          setClient_favoris(user.data.UserByClienID.items[0].list_favoris)
          var i;
          for (i = 0; i < list_fav.length; i++) {
            fetchMangas(list_fav[i])
          } 
        }
    }
    catch (err) { console.error(err) }

  }

  async function fetchMangas(malId) {

    try{
        const mangas = await API.graphql(graphqlOperation(listMangas, { filter: {mal_id: {eq: malId}} } ));
        //console.log(mangas.data.listMangas.items[0])
        const temp = Mangas
        console.log(temp)
        //temp.push(mangas.data.listMangas.items[0])
        //setMangas(temp)
    }
    catch (err) { console.error(err) }

  }

  function toogleDrawer() {
    props.navigation.openDrawer()
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeDATA["background-basic-color-1"]
    }, 
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor = {(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
      />

      <Header toogle = {toogleDrawer}/>
      <Text>Library</Text>
      <Button title = "refresh" onPress={()=> {
        fetchUserFav()
      }}/>

    </SafeAreaView>
  );
}