import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Button, FlatList, RefreshControl } from 'react-native';
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
import CardManga from '../components/CardManga';

// graphQL
import { API, graphqlOperation } from 'aws-amplify';
import { userByClienId, listMangas } from '../graphql/queries';

import * as Crypto from 'expo-crypto';


export default function Mylibrary({ navigation }) {

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();

  const [clientID, setclientID] = useState();
  const [client_favoris, setClient_favoris] = useState();
  const [Mangas, setMangas] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  async function hash(username){
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      username)
}

  useEffect(() => {
    Auth.currentAuthenticatedUser().
      then((user) => {
        hash(user.username).then((hashed)=>{
          setclientID(hashed)
          init_fetchUserData(hashed);
        })
      })

    console.log("useEffect")
  }, [])

  //get user data
  async function init_fetchUserData(ID) {
    try {
      const user = await API.graphql(graphqlOperation(userByClienId, { clienID: ID }));
      const list_fav = user.data.UserByClienID.items[0].list_favoris

      if (list_fav == null) {
        setClient_favoris([])
      }
      else {
        setClient_favoris(user.data.UserByClienID.items[0].list_favoris)
        var i;
        var temp_list = []
        for (i = 0; i < list_fav.length; i++) {
          fetchMangas(list_fav[i]).then((val) => { 
            temp_list.push(val); 
            
            temp_list.sort(            
              function(a, b) {
              var nameA = a.title_search;
              var nameB = b.title_search;
              if (nameA < nameB) {
                return -1; //nameA comes first
              }
              if (nameA > nameB) {
                return 1; // nameB comes first
              }
              return 0;  // names must be equal
            })

            setMangas(temp_list) })
        }
      }

      return 1;
    }
    catch (err) { console.error(err) }
  }

  async function fetchMangas(malId) {

    try {
      const mangas = await API.graphql(graphqlOperation(listMangas, { filter: { mal_id: { eq: malId } } }));
      //console.log(mangas.data.listMangas.items[0])
      return mangas.data.listMangas.items[0]
    }
    catch (err) { console.error(err) }

  }


  function toogleDrawer() {
    navigation.openDrawer()
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeDATA["background-basic-color-1"]
    },

    data: {
      flex: 1,
    },

  });

  const renderItem = ({ item }) => (
    <CardManga mangaData={item} navigation={navigation} />
  );


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    Auth.currentAuthenticatedUser().
    then((user) => {
      hash(user.username).then((hashed)=>{
        init_fetchUserData(hashed).then(() => setRefreshing(false));
      })
    })

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle={(themeContext.theme === "dark") ? 'light-content' : 'dark-content'}
      />

      <Header toogle={toogleDrawer} />

      <FlatList
        style={styles.data}
        data={Mangas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

    </SafeAreaView>
  );
}