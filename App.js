import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { init_user_app_config, isFirstUse,resetDatas } from './CustomFunctions/CommonVariable';

import { ActivityIndicator} from 'react-native';
import Amplify, { Auth } from 'aws-amplify';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignIn from './Activities/SingIn';
import SignUp from './Activities/SignUp';
import ConfirmSignUp from './Activities/ConfirmSignUp';

import Home from './Activities/Home';
import Favoris from './Activities/Favoris';
import Settings from './Activities/Settings';
import User from './Activities/User';

import * as app_common_style from './assets/themes/common_style';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout as View} from '@ui-kitten/components';
import { ThemeContext } from './assets/themes/theme-context';
import { default as Mytheme } from './assets/themes/theme.json'; // <-- Import app theme

import CustomSidebarMenu from './components/CustomSidebarMenu';

//import { androidOnBackPressed } from '../CustomFunctions/Android';

import config from './aws-exports';
Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const Drawer = createDrawerNavigator();

async function beforeLaunch () {
  try {
    // display splashscreen
    await SplashScreen.preventAutoHideAsync();

    //  it is the first we use the app, so we initialise some global variable stored in CommonVariable.js
    isFirstUse().then((val) => { 
      if(val !== "1"){
        console.log("initialisation variables")
        init_user_app_config();
      }
      else{
        console.log("welcome back");
      }
    });

    
    // close splashscreen
    await SplashScreen.hideAsync();
  } 
  
  catch (e) {
    console.warn(e);
  }
}

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">

      <AuthenticationStack.Screen name="SignIn" >
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState}/>
        )}
      </AuthenticationStack.Screen>

      <AuthenticationStack.Screen name="SignUp" component={SignUp} />

      <AuthenticationStack.Screen name="ConfirmSignUp" component={ConfirmSignUp}/>

    </AuthenticationStack.Navigator>
  );
};

const AppNavigator = props => {
   return (
    <Drawer.Navigator 
    initialRouteName="Home"
    drawerContentOptions={{
      activeTintColor: app_common_style.splash_screen_color,
      itemStyle: {
        marginVertical: 10, 
      },
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}>


      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={User} />
      <Drawer.Screen name="Favoris" component={Favoris} />
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




//resetDatas();

const App  = () => {  
  //beforeLaunch();

  //androidOnBackPressed();
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [theme, setTheme] = React.useState('light');


  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    console.log("theme = " + theme);
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