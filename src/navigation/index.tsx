import React, { useEffect} from 'react';
import { RefObject } from 'react';
import { Linking, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenNames } from '../constants/index';
import { Assignment01 } from '@app/scenes';
import Assignment02 from '@app/scenes/assignment02';
const prefix = Linking.getInitialURL();

type NavigationRef = React.RefObject<any>; // Update the type as needed

export const navigationRef: NavigationRef = React.createRef();
export function navigate(name: string, params?: object | undefined): void {
  navigationRef.current?.navigate(name, params);
}


export default function App() {
  const Stack = createNativeStackNavigator();
  const handleURLListener = (event: any) => {
    console.log("handleURLListener",event)
    navigate(screenNames.Assignment02.name,{ uri: event.url })
  };

  useEffect(() => {
    Linking.getInitialURL()
    .then(url => {
      console.log("getInitialURL==>",url)
      
    })
    .catch(err => {
      console.log("error", err);
    });
    Linking.addEventListener("url", handleURLListener);
  },[]);

  return (
    <NavigationContainer fallback={<Text>Loading...</Text>} ref={navigationRef}>
      <Stack.Navigator>
          <Stack.Screen 
            name={screenNames.Assignment01.name} 
            component={Assignment01} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name={screenNames.Assignment02.name} 
            component={Assignment02} 
            options={{ headerShown: false }} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}