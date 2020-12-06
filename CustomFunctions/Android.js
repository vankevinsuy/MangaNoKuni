import { useEffect } from "react";
import {BackHandler, Alert} from 'react-native';


function androidOnBackPressed(){
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to quit ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove();
  }, []);
};



export { androidOnBackPressed };