import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Picker,
  View,
  AppState,
  Platform
} from 'react-native';
import PushController from './PushController';
import PushNotification from 'react-native-push-notification';

const styles =StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#F5FCFF'
   },
  welcome :{
    fontSize:20,
    textAlign :'center',
    margin:10,
  },
  picker :{
      width:100

    }
});


export default class App extends Component{

constructor(props){
 super(props);
 this.handleAppStateChange = this.handleAppStateChange.bind(this);
 this.state = {
   seconds : 10,
 };

}

componentDidMount(){
AppState.addEventListener('change', this.handleAppStateChange);

}
componentWillUnmount(){
AppState.removeEventListener('change', this.handleAppStateChange);
}


handleAppStateChange(appState) {
  if (appState === 'background') {
    let date = new Date(Date.now() + (5 * 1000));
      PushNotification.localNotificationSchedule({
      message: "My Scheduled Notification Message", // (required)
      date: new Date().now, // in 60 secs
    });

     }
}


 render(){
   return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        Choose your notification time in seconds.
        </Text>
        <Picker
          style = {styles.picker}
          selectedValue = {this.state.seconds}
          onValueChange = {(seconds)=> this.setState({seconds})}
         >
              <Picker.Item label= "5" value = {5}/>
              <Picker.Item label= "10" value = {10}/>
              <Picker.Item label= "15" value = {15}/>
       </Picker>

   </View>
    );
  }
 }
