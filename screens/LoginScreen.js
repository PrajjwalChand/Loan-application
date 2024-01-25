import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
import React, {Component} from "react";
import {View,Text,StyleSheet,Button} from "react-native";
import * as GoogleSignIn from 'expo-google-sign-in';
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import firebase from 'firebase';
//import * as Google from 'expo-google-sign-in';
import * as Expo from 'expo-google-app-auth'
//import firebase from '../firebase';
//import * as Expo from 'expo';
//var userDatabase = firebase.firestore().collection("users");
class LoginScreen extends Component{
  isUserEqual=(googleUser, firebaseUser)=> {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn= googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
    .auth()
    .onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
           googleUser.idToken,
           googleUser.accessToken
        );
  
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
        .then(function(result){
          console.log('user signed in');
          if(result.additionalUserInfo.isNewUser){
          firebase
          .database()
          .ref('/users/'+result.user.uid)
          .set({
            gmail: result.user.email,
            profile_picture: result.additionalUserInfo.profile.picture,
            locale: result.additionalUserInfo.profile.locale,
            first_name: result.additionalUserInfo.profile.given_name,
            last_name: result.additionalUserInfo.profile.family_name,
            created_at: Date.now(),
            contact_no: "1234567890"
            
          })
          .then(function(snapshot){

          });
          }
          else{
          firebase
          .database()
          .ref('/users/'+result.user.uid).update({
            last_logged_in: Date.now()
          })
          }
          
        })
        .catch(error=>{
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this)
    );
  };
    signInWithGoogleAsync=async() =>{
        console.log('Trying google sign in')
        try {
          const result = await Expo.logInAsync({
            androidClientId: '134115365787-jbbi12aj2r5e342fc7ddp3oqgdvq5hds.apps.googleusercontent.com',
            //androidClientId: '134115365787-422o7i3kc9pru0v224bj446sqmf1mp92.apps.googleusercontent.com',
            //iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log(e);
          return { error: true };
        }
      }
      /*signInWithGoogleAsync=async()=>{
        console.log('Trying google sign in')
          try{
              const result=await Google.logInAsync({
                  androidClientId: '134115365787-mh7gm11jm7g56jhvuknitvf1s79q1vd3.apps.googleusercontent.com',
                  scopes:['profile','email'],
              });
              if(result.type ==='success'){
                return result.accessToken;
              }else{
                return {cancelled:true};
              }
          }catch(e){
            console.log(e);
            return{error:true};
          }
      };*/
    render(){
       return(
           <View style = {styles.container}>
               <Button 
               title='Sign In With Google'
               onPress={()=>this.signInWithGoogleAsync()}
               />
               </View>
       ); 
    }
}
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    }
});
