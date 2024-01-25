/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>"Splashhhh!"</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SplashScreen;*/
import React,{Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import firebase from 'firebase';
import { render } from 'react-dom';
//import {ArrowForwardIosIcon} from '@material-ui/icons/ArrowForwardIos';
//import {LoginScreen} from './LoginScreen';
//import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
//import { useTheme } from '@react-navigation/native';
var allItems=[];
var Name;
var phone;
class SplashScreen extends Component{
    //const { colors } = useTheme();
    getAllItems=()=>{
      allItems=[];
      //let UID = firebase.auth().currentUser.uid;
      firebase.database().ref('users/').on("value", snapshot =>{
          var i=0;
      snapshot.forEach((childSub1) => {
        
        let UID= childSub1.key;
        firebase.database().ref('users/'+UID+'/').on("value", snapshot =>{
        snapshot.forEach((childSub2) => {
        //console.log(userList);
        //console.log(key);

        let key = childSub2.key;
        if(key=="first_name"){
          Name=childSub2.val();
        }
        if(key=="contact_no"){
          phone=childSub2.val();
        }
        if(key=="photos"){
        firebase.database().ref('users/'+UID+'/photos/').on("value", snapshot =>{
        snapshot.forEach((childSub3) => {
          let key = childSub3.key;
          let path='users/'+UID+'/photos/'+key+'/';
          var attributes=[Name,phone];
          firebase.database().ref(path).on("value", snapshot =>{
            snapshot.forEach((childSub4) => {
              attributes.push(childSub4.val());
            });
            allItems.push(attributes);
          });
        });
      });
        }
      });
       });
      });
    });
    }
    componentDidMount(){
      //this.getItems();
      this.getAllItems();
  };
    render(){
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
              <View style={styles.header}>
              <Animatable.Image 
                      animation="bounceIn"
                      duraton="1500"
                  source={require('../assets/logo.png')}
                  style={styles.logo}
                  resizeMode="stretch"
                  />
              </View>
              <Animatable.View 
                  style={[styles.footer]}
                  animation="fadeInUpBig"
              >
                  <Text style={[styles.title]}>Lend and Borrow Items!!</Text>
                  <Text style={styles.text}>Sign in with account</Text>
                  <View style={styles.button}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoadingScreen')}>
                  <LinearGradient
                          colors={['#08d4c4', '#01ab9d']}
                          style={styles.signIn}
                      >
                          <Text style={styles.textSign}>Get Started</Text>
                      </LinearGradient>
                  </TouchableOpacity>
                  </View>
              </Animatable.View>
            </View>
          );
    }
    
};

export default SplashScreen;
export {allItems};

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});