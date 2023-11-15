import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import questionsData from '@app/assets/questions.json'
import { Questions, Answers, Answer, Question } from '@app/types/questions';
import styles from './styles';
import ListView from './ListView';
import { screenNames } from '@app/constants';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [data, setData] = useState<Questions>([])
  const [answers, setAnswers] = useState<Set<Answer>>(new Set())

  useEffect(() => {
    async function requestPermissions() {
      const preciseLocationPermission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      const notificationPermission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
      // Add other necessary permissions for notifications

      const preciseLocationStatus = await check(preciseLocationPermission);
      const notificationStatus = await check(notificationPermission);

      if (
        preciseLocationStatus === RESULTS.DENIED ||
        notificationStatus === RESULTS.DENIED
      ) {
        const granted = await PermissionsAndroid.requestMultiple([
          preciseLocationPermission,
          notificationPermission,
        ]);
        if(granted['android.permission.ACCESS_FINE_LOCATION'] != RESULTS.GRANTED || granted['android.permission.POST_NOTIFICATIONS'] != RESULTS.GRANTED){
          await Linking.openSettings();
        }
      }
    }

    requestPermissions();
  }, []);

  useEffect(() => {
    let data = questionsData;
    setData(data.questions);
  }, []);

  const removeObjectByName = (
    setName: Set<Answer>,
    propertyName: keyof Answer,
    propertyValue: string | number
  ): void => {
    for (const obj of setName) {
      if (obj[propertyName] === propertyValue) {
        setName.delete(obj);
        break; 
      }
    }
  };
  
  
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.maincontainer}>
        <View style={styles.centeredContent}>
          <FlatList
            data={data}
            renderItem={({ item }) => 
            <ListView 
              id={item.id} 
              {...item}
              answers={answers} 
              appendQuestions={(value:Question) => {
                console.log("Question.....",value)
                const newData = data.filter(item => item.question_parent_id !== value.question_parent_id);
                const condition = (element:Question) => element.id === value.question_parent_id;
                const index = newData.findIndex(condition);
                console.log("index===>",index)
                newData.splice(index+1, 0, value)
                setData(newData)
                console.log("newData",newData);
              }}
              submit={(value:Answer) => { 
                const found = Array.from(answers).filter(
                  (data: Answer) => data.question_id === item.id
                );
                if(value.answer_value == ""){
                  removeObjectByName(answers,'question_id', value.question_id)
                }else{
                  answers.add(value);
                }
                setAnswers(new Set(answers)); 
              }
            }
            />}
            keyExtractor={item => item.id}
            ListFooterComponent={<TouchableOpacity style={{flex:1, backgroundColor:'blue', padding:10, justifyContent:'center', borderRadius:5, marginTop:20}}><Text style={{color:'#FFF', textAlign:'center'}}>Submit</Text></TouchableOpacity>}
            ItemSeparatorComponent={<View style={{margin:5}}/>}
          />
        </View>
      </View>
    </>
  );
}


export default App;
