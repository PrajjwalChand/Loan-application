import React, {Component,useState,useEffect} from "react";
import {View,Text,StyleSheet,Button,Image,Pressable,TouchableOpacity,SafeAreaView,ScrollView,Header,Separator,ProfileListItem} from "react-native";
import firebase from 'firebase';
import { Ionicons } from "@expo/vector-icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../Utilities/UserPermissions';
import { PermissionsAndroid } from 'react-native';
import LineSeparator from "../components/LineSeparator";
//import { Header } from "react-native/Libraries/NewAppScreen";
import {Name,emailID,imageURL,RollNo,URIs,contactNo} from './DashboardScreen'; 
import ProfileItems from "../components/ProfileItems";
class ProfileScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
          image: null,
          imagePresent: false
        };
      }
    

    
      
       
    /*pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.state.image=result.uri;
        }
        console.log(this.state.image);
        if(this.state.image==null){
            alert("hello");
        }
      };*/
    
      
    showItems(){
      return(
      <View>
        <Text>Helooooooooo</Text>
      </View>
      )
    }
      
    render(){
        //this.getData();
       return(
         
         
           
                <SafeAreaView style={styles.container}>
                  <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingBottom: 100
          }}
          >
                <TouchableOpacity style={styles.buttons}
                onPress={()=>this.props.navigation.navigate('DashboardScreen')}>
                <Text style={styles.appButtonText}>Home Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>this.props.navigation.navigate('UploadScreen')}>
                <Text style={styles.appButtonText}>Upload Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>this.props.navigation.navigate('UpdateProfileScreen')}>
                <Text style={styles.appButtonText}>Update Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>this.props.navigation.navigate('MyItemsScreen')}>
                <Text style={styles.appButtonText}>Personal Items</Text>
                </TouchableOpacity>
                </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={{
                    uri: imageURL
                  }}
                  style={styles.imagestyle}
                  resizeMode="center"
                ></Image>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 25 }]}>
                {Name}
              </Text>
              <Text style={[styles.text, { fontWeight: "200", fontSize: 25 }]}>
                {RollNo}
              </Text>
              <Text style={[styles.text, { color: "#AEB5BC", fontSize: 15 }]}>
                IIT Jodhpur
              </Text>
            </View>
            <LineSeparator/>
            <View style={styles.listItem}>
              <ProfileItems iconName="call" textItem={contactNo} />
            </View>

            <View style={styles.listItem}>
              <ProfileItems iconName="mail" textItem={emailID} />
            </View>
            <LineSeparator/>
          </ScrollView>
          
                </SafeAreaView>
       ); 
    }
  }
export default ProfileScreen;
const styles = StyleSheet.create({
    
    buttons:{
        width: 100,
        backgroundColor: "#009688",
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
      appButtonText: {
        fontSize: 12.5,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: 'center',
        textTransform: "uppercase"
      },
      container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "white",
      },
      imagestyle: {
        flex: 1,
        height: undefined,
        width: undefined,
        // backgroundColor: "black",
        resizeMode: "stretch"
      },
      profileImage: {
        width: 175,
        height: 175,
        borderRadius: 100,
        overflow: "hidden"
      },
      add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
      },
      text: {
        fontFamily: "sans-serif-medium",
        color: "#52575D"
      },
      infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
      },
      listItem: {
        height: 60,
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
      }
});
