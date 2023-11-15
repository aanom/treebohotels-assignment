
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      justifyContent:'center',
    },
    centeredContent: {
      flex:1,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      borderWidth:1,
      borderRadius:5,
      height:50,
      backgroundColor:'#FFF'
    },
    sideBox:{flex: 1, justifyContent: 'center'},
    mainBox:{flex: 4, justifyContent: 'center'},
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5, // for Android shadow
      },
    
  });

  export default styles;