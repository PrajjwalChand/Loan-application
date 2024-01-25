import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';

import SplashScreen from './screens/SplashScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import UploadScreen from './screens/UploadScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import MyItemsScreen from './screens/MyItemsScreen';


import * as firebase from 'firebase';
import {firebaseConfig} from './config';
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  checkIfLoggedIn=()=>{
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            this.state.isLoggedIn=true;
        }
    }.bind(this)
    );
};
  render(){
    return (
      <AppNavigator/>
      
    );
  }
}

const AppSwitchNavigator=createSwitchNavigator({
  SplashScreen:SplashScreen,
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen,
  ProfileScreen:ProfileScreen,
  UploadScreen:UploadScreen,
  UpdateProfileScreen:UpdateProfileScreen,
  MyItemsScreen: MyItemsScreen
  
});

const AppNavigator=createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
