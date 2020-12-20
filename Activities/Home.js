import React, { useState, useEffect  } from 'react';
import { StyleSheet,  StatusBar, FlatList } from 'react-native';
import { Layout as View,  useTheme , Spinner } from '@ui-kitten/components';

import { SafeAreaView } from 'react-native-safe-area-context';


// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// components import 
import HeaderSearch from '../components/Header_search';


// graphQL
import {API, graphqlOperation} from 'aws-amplify';
import {listMangas} from '../graphql/queries';

//component
import CardManga from '../components/CardManga';




export default function Home({ navigation }) {

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();
  const [StateMangas, setStateMangas] = useState([])
  const [Dataloading, setDataloading] = useState(true);


  useEffect(() => {
    setDataloading(true)
    fetchMangas()
  }, [])

  function toogleDrawer() {
    navigation.openDrawer()
  }

  async function fetchMangas() {
    try {
      const mangaData = await API.graphql(graphqlOperation(listMangas))
      const mangas = mangaData.data.listMangas.items
      setStateMangas(mangas)
      setDataloading(false)
    } 
    catch (err) { console.error(err) }

  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeDATA['background-basic-color-1']
    }, 

     data : {
      flex : 1,
     },
  });

  const renderItem = ({ item }) => (
    <CardManga mangaData={item} navigation={navigation}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
              backgroundColor={(themeContext.theme === "dark") ? themeDATA['background-basic-color-1'] : app_common_style.splash_screen_color}
        barStyle = {(themeContext.theme === "dark") ?  'light-content' :  'dark-content'}
      />
      
      <HeaderSearch toogle = {toogleDrawer}/>

      { 
        Dataloading ?
         (<Spinner size='giant'/>) : 
        (
          <FlatList
            style = {styles.data}
            data={StateMangas}
            renderItem={renderItem}
            keyExtractor={manga => manga.id}
          />
        )
      }

    </SafeAreaView>
  );

}