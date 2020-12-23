import AsyncStorage from '@react-native-async-storage/async-storage';

async function isFirstUse() {
    try {
        const first_use = await AsyncStorage.getItem('first_use');
        return first_use;
      } catch (e) {
        console.error(e);
      }
}


async function init_user_app_config() {
    try {
        await AsyncStorage.setItem('first_use', "1");
        await AsyncStorage.setItem('theme', 'light');
      } catch (e) {
        console.error(e);
      }
}

async function changeTheme(val) {
    try {
        await AsyncStorage.setItem('theme', val).then(()=>{
            console.log("theme changed in Async = " + val);
        });
      } catch (e) {
        console.error(e);
      }
}


async function getTheme() {
    try {
        await AsyncStorage.getItem('theme').then((val) => {return val});
      } catch(e) {
        console.error(e);
      }
}

async function getUsername() {
  try {
      const name = await AsyncStorage.getItem('username');
      if(name !== null) {
          return name;
      }
    } catch(e) {
      console.error(e);
    }
}

async function setUsername(val) {
  try {
      await AsyncStorage.setItem('username', val).then(()=>{
          console.log("username changed in Async = " + val);
      });
    } catch (e) {
      console.error(e);
    }
}

async function resetDatas() {
    try {
        await AsyncStorage.clear()
      } catch(e) {
        console.error(e);
      }
    
      console.log(" AsyncStorage's Datas cleared" );
}




export { 
    isFirstUse, 
    init_user_app_config , 
    changeTheme, 
    getTheme, 
    resetDatas,
    getUsername,
    setUsername
};