import { View, StyleSheet,TouchableOpacity,Text,Image,ScrollView} from "react-native";
import React, {Component} from "react";
import LineSeparator from '../components/LineSeparator'
import { Button } from "react-native-paper";
import {Name,emailID,imageURL,RollNo,URIs,contactNo} from './DashboardScreen'; 
import {Content,ListItem ,Left,Thumbnail,Body} from 'native-base';
import SpaceSeparator from "../components/SpaceSeparator";
import firebase from 'firebase';

class MyItemsScreen extends Component{
    deleteItem=async(item)=>{
        console.log(item);
        let UID = firebase.auth().currentUser.uid;
        await firebase.database().ref('/users/'+UID+'/photos/'+item).set(null)
          .then(function() {
            alert("Remove succeeded.")
          })
          .catch(function(error) {
            alert("Remove failed: " + error.message)
          });
    }
    componentDidMount(){
        console.log(URIs);
    };
    render(){
        
        return(

            <View style={styles.container}>
                <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
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
                onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
                <Text style={styles.appButtonText}>Profile Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>firebase.auth().signOut()}>
                <Text style={styles.appButtonText}>Sign Out Button</Text>
                </TouchableOpacity>
                </View>
                <ScrollView>
                <SpaceSeparator/>
                <Text style={{fontWeight: "bold",alignSelf:"center",fontSize:25}}>My Items</Text>
                <SpaceSeparator/>
                <Content>
         
         { URIs.map((item)=>(
             <View>
             <ListItem avatar>
                 <Left>
                     <Image style={styles.imagestyle}
                     source={{uri : item[2]}}/>
                 </Left>
                 <Body>
                     <Text><Text style={{fontWeight: "bold"}}>Item name:</Text> {item[3]}</Text>
                     <SpaceSeparator/>
                     <Text><Text style={{fontWeight: "bold"}}>Item cost:</Text> {item[1]}</Text>
                     <SpaceSeparator/>
                     <Button
          mode="contained"
          onPress={()=>this.deleteItem(item[0])}
          color="#009387"
          style={styles.deleteButton}
        >
          Delete item
        </Button>
                     
                 </Body>
             </ListItem>
             <LineSeparator/>
             </View>
                 
         )
         )}
 
     </Content>
     </ScrollView>
    </View>
        );
        }
    }
export default MyItemsScreen;

export function deleteItem(URIs,deleteComplete){
    console.log(URIs);

    firebase.firestore()
        .collection('Items')
        .doc(URIs.key).delete()

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignContent: "center"
    },
    dashboard:{
        width: 100,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    imagestyle: {
       
        width: 200,
        height: 200,
      },
      buttons:{
        width: 100,
        backgroundColor: "#009688",
        paddingVertical: 10,
        paddingHorizontal: 10,
      },
      appButtonText: {
        fontSize: 12.5,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: 'center',
        textTransform: "uppercase"
      },
      deleteButton:{
        width: 150,
        backgroundColor: "#009688",
        paddingVertical: 10,
        paddingHorizontal: 10,
      }
  });