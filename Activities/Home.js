import React, { useState, useEffect  } from 'react';
import { StyleSheet,  StatusBar, Image} from 'react-native';
import { Layout as View, Text, useTheme , Spinner } from '@ui-kitten/components';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { SafeAreaView } from 'react-native-safe-area-context';

// themes import 
import * as app_common_style from '../assets/themes/common_style';
import { ThemeContext } from '../assets/themes/theme-context';

// components import 
import HeaderSearch from '../components/Header_search';

// graphQL
import {API, graphqlOperation} from 'aws-amplify'
import {listMangas} from '../graphql/queries'




export default function Home(props) {

  const themeContext = React.useContext(ThemeContext);
  const themeDATA = useTheme();
  const [StateMangas, setStateMangas] = useState([])
  const [Dataloading, setDataloading] = useState(true);

  useEffect(() => {
    setDataloading(true)
    fetchMangas()
  }, [])

  function toogleDrawer() {
    props.navigation.openDrawer()
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
      //alignItems: 'center',
      backgroundColor: themeDATA['background-basic-color-1']
    }, 

     data : {
       flex : 1,
       backgroundColor: themeDATA['background-basic-color-1']
     },

     tinyLogo: {
      width: 300,
      height: 400,
    },

  });


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
        (<View style={styles.data}>
          {
            StateMangas.map((manga, index) => (
              <View key={index}>

                  <Card>
                    <Card.Title>{manga.title}</Card.Title>
                    <Card.Title>{manga.title_japanese}</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{uri: manga.image_url}}  style={styles.tinyLogo}/>
                    <Text style={{marginBottom: 10}}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                      icon={<Icon name='code' color='#ffffff' />}
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='VIEW NOW' />
                  </Card>

              </View>
            ))
          }
        </View>)
      }



      


      
      <Text>{StateMangas.length}</Text>

      <Text>Home</Text>

    </SafeAreaView>
  );

}