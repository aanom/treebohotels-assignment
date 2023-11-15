import React from 'react';
import { WebView } from 'react-native-webview';
import { NativeModules } from 'react-native';

const { SumModule } = NativeModules;

// Define your stack navigator params and screens
type RootStackParamList = {
  Assignment02: { uri: string }; // Define the param as uri of type string
  // Add other screens if needed
};

type Assignment02ScreenRouteProp = RouteProp<RootStackParamList, 'Assignment02'>;

interface Assignment02Props {
  route: Assignment02ScreenRouteProp;
}

const Assignment02: React.FC<Assignment02Props> = ({ route }) => {
  //const result = SumModule.sum(5, 10);
  //console.log('Sum:', result); 
  console.log("Assignment02")
  const url:string = route.params?.uri;
  console.log("Assignment02",url)
  return <WebView source={{ uri: `https://www.treebo.com/${url ? url.replace('assignmentapp://', ''): ""}` }} style={{ flex: 1 }} />;
}

export default Assignment02;
