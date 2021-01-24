import React, { useState, useEffect } from 'react';
import { changeTheme } from './CustomFunctions/CommonVariable';

import { ActivityIndicator} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignIn from './Activities/SingIn';
import SignUp from './Activities/SignUp';
import ConfirmSignUp from './Activities/ConfirmSignUp';

import Manga from './Activities/MangaList';
import Mylibrary from './Activities/Mylibrary';
import Settings from './Activities/Settings';
import Anime from './Activities/AnimeList';
import MangaInfo from './Activities/MangaInfo'
import AnimeInfo from './Activities/AnimeInfo'
import Reading from './Activities/Reading'
import Watching from './Activities/Watching'

import * as app_common_style from './assets/themes/common_style';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout as View} from '@ui-kitten/components';
import { ThemeContext } from './assets/themes/theme-context';
import { default as Mytheme } from './assets/themes/theme.json'; // <-- Import app theme

import CustomSidebarMenu from './components/CustomSidebarMenu';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ScreenOrientation from 'expo-screen-orientation';



import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const MangaStack = createStackNavigator();
const Drawer = createDrawerNavigator();



const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">

      <AuthenticationStack.Screen name="SignIn" >
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AuthenticationStack.Screen>

      <AuthenticationStack.Screen name="SignUp" component={SignUp} />

      <AuthenticationStack.Screen name="ConfirmSignUp" >
        {screenProps => (
          <ConfirmSignUp {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AuthenticationStack.Screen>

    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = props => {
   return (
    <Drawer.Navigator 
    initialRouteName="Manga"
    drawerContentOptions={{
      activeTintColor: app_common_style.splash_screen_color,
      itemStyle: {
        marginVertical: 10, 
      },
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}>

      <Drawer.Screen name="Mangas" component={MangaNavigation} />
      <Drawer.Screen name="Animes" component={AnimeNavigation} />
      <Drawer.Screen name="My library" component={MylibraryLNavigation} />
      <Drawer.Screen name="Settings" >
      {screenProps => (
          <Settings {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

function MangaNavigation() {
  return (
    <MangaStack.Navigator screenOptions={{headerShown: false}}>
      <MangaStack.Screen name="Manga" component={Manga} />
      <MangaStack.Screen name="MangaInfo" component={MangaInfo} />
      <MangaStack.Screen name="Reading" component={Reading} />
    </MangaStack.Navigator>
  );
}

function AnimeNavigation() {
  return (
    <MangaStack.Navigator screenOptions={{headerShown: false}}>
      <MangaStack.Screen name="Anime" component={Anime} />
      <MangaStack.Screen name="AnimeInfo" component={AnimeInfo} />
      <MangaStack.Screen name="Watching" component={Watching} />
    </MangaStack.Navigator>
  );
}

function MylibraryLNavigation() {
  return (
    <MangaStack.Navigator screenOptions={{headerShown: false}}>
      <MangaStack.Screen name="My library" component={Mylibrary} />
      <MangaStack.Screen name="MangaInfo" component={MangaInfo} />
      <MangaStack.Screen name="Reading" component={Reading} />
      <MangaStack.Screen name="AnimeInfo" component={AnimeInfo} />
      <MangaStack.Screen name="Watching" component={Watching} />
    </MangaStack.Navigator>
  );
}



const App  = () => {  

  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [theme, setTheme] = React.useState('light');
  ScreenOrientation.unlockAsync()

  // define theme
  AsyncStorage.getItem('theme').then((val) => {setTheme(val)});

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    changeTheme(nextTheme)
  };
  
  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('-------------------------------------------- User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('-------------------------------------------- User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }


  return (
      <ThemeContext.Provider value={{ theme, toggleTheme }} >
        <ApplicationProvider {...eva} theme={{ ...eva[theme], ...Mytheme}}>
          <NavigationContainer >
            {isUserLoggedIn === 'initializing' && <Initializing />}
            {isUserLoggedIn === 'loggedIn' && (
                <AppNavigator updateAuthState={updateAuthState}/>
              )}
              {isUserLoggedIn === 'loggedOut' && (
                <AuthenticationNavigator updateAuthState={updateAuthState}/>
              )}
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
  );

}

export default App;