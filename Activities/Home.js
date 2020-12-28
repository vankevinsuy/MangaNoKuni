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
      const mangas = mangaData.data.listMangas.items.sort(            
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
      
      <HeaderSearch toogle = {toogleDrawer} setStateMangas = {setStateMangas}/>

      { 
        Dataloading ?
         (
          <View style = {{flex : 1, alignItems : 'center' , justifyContent : 'center'}}>
            <Spinner size='giant'/>
          </View>
         ) : 
        (
          <FlatList
            style = {styles.data}
            data={StateMangas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )
      }

    </SafeAreaView>
  );

}