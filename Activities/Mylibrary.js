import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Button, FlatList, RefreshControl } from 'react-native';
import { Layout as View, Text, useTheme } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// themes import 
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
import { userByClienId, listMangas, listAnimes } from '../graphql/queries';

import * as Crypto from 'expo-crypto';
import CardAnime from '../components/CardAnime';

function DataScreen({Data, renderItem, refreshing, onRefresh, style}) {
  return (
      <FlatList
        style={style}
        data={Data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
  );
}


const Tab = createMaterialTopTabNavigator();


export default function Mylibrary({ navigation }) {

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();

  const [clientID, setclientID] = useState();
  const [client_favoris_manga, setClient_favoris_manga] = useState();
  const [client_favoris_anime, setClient_favoris_anime] = useState();
  const [Mangas, setMangas] = useState([])
  const [Animes, setAnimes] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  async function hash(username) {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      username)
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser().
      then((user) => {
        hash(user.username).then((hashed) => {
          setclientID(hashed)
          init_fetchUserData(hashed);
        })
      })

  }, [])

  //get user data
  async function init_fetchUserData(ID) {
    try {
      const user = await API.graphql(graphqlOperation(userByClienId, { clienID: ID }));
      const list_fav_manga = user.data.UserByClienID.items[0].list_favoris_manga
      const list_fav_anime = user.data.UserByClienID.items[0].list_favoris_anime

      if (list_fav_manga == null) {
        setClient_favoris_manga([])
      }
      else {
        setClient_favoris_manga(user.data.UserByClienID.items[0].list_favoris_manga)
        var i;
        var temp_list_manga = []
        for (i = 0; i < list_fav_manga.length; i++) {
          fetchMangas(list_fav_manga[i]).then((val) => {
            temp_list_manga.push(val);

            temp_list_manga.sort(
              function (a, b) {
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

            setMangas(temp_list_manga)
          })
        }
      }

      if (list_fav_anime == null) {
        setClient_favoris_anime([])
      }
      else {
        setClient_favoris_anime(user.data.UserByClienID.items[0].list_favoris_anime)
        var i;
        var temp_list_anime = []
        for (i = 0; i < list_fav_anime.length; i++) {
          fetchAnimes(list_fav_anime[i]).then((val) => {
            temp_list_anime.push(val);

            temp_list_anime.sort(
              function (a, b) {
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

            setAnimes(temp_list_anime)
          })
        }
      }

      return 1;
    }
    catch (err) { console.error(err) }
  }

  async function fetchMangas(malId) {

    try {
      const mangas = await API.graphql(graphqlOperation(listMangas, { filter: { mal_id: { eq: malId } } }));
      return mangas.data.listMangas.items[0]
    }
    catch (err) { console.error(err) }

  }

  async function fetchAnimes(malId) {

    try {
      const animes = await API.graphql(graphqlOperation(listAnimes, { filter: { mal_id: { eq: malId } } }));
      return animes.data.listAnimes.items[0]
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
      backgroundColor: themeDATA["background-basic-color-1"]
    },

  });

  const renderItemManga = ({ item }) => (
    <CardManga mangaData={item} navigation={navigation} />
  );

  const renderItemAnime = ({ item }) => (
    <CardAnime animeData={item} navigation={navigation} />
  );



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    Auth.currentAuthenticatedUser().
      then((user) => {
        hash(user.username).then((hashed) => {
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

      <Tab.Navigator >

        <Tab.Screen name="Manga">
          {screenProps => (
            <DataScreen {...screenProps} Data = {Mangas} renderItem = {renderItemManga} refreshing = {refreshing} onRefresh = {onRefresh} style = {styles.data}/>
          )}
        </Tab.Screen>


        <Tab.Screen name="Anime">
          {screenProps => (
            <DataScreen {...screenProps} Data = {Animes} renderItem = {renderItemAnime} refreshing = {refreshing} onRefresh = {onRefresh} style = {styles.data}/>
          )}
        </Tab.Screen>


      </Tab.Navigator>

    </SafeAreaView>
  );
}