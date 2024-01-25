import React, {Component} from "react";
import {View,Text,StyleSheet,Button,TouchableOpacity,ScrollView,SafeAreaView,Image} from "react-native";
import {Item,Icon,Input} from 'native-base';
import firebase from 'firebase';

import {allItems} from './SplashScreen';
import {Content,ListItem ,Left,Thumbnail,Body} from 'native-base';
import SpaceSeparator from "../components/SpaceSeparator";
import LineSeparator from "../components/LineSeparator";

var Name;
var emailID;
var RollNo;
var imageURL;
var URIs=[];
var contactNo;
class DashboardScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
          imagePresent: false,
          items: allItems,
          filteredItems: allItems
        };
      }
      searchItem(textToSearch){
        console.log(this.state.items);
        console.log(this.state.filteredItems);
        this.setState({
          filteredItems: this.state.items.filter(i=>
            i[4].toLowerCase().includes(textToSearch.toLowerCase()),),
        });
      }
      /*getItems=()=>{
        //alert(this.state.imagePresent);
        console.log(this.state.imagePresent);
        if(this.state.imagePresent==true){
          
        }
        //alert(URIs);
    }*/
    getData=()=>{
      console.log(allItems);
      URIs=[];
      let UID = firebase.auth().currentUser.uid;
      firebase.database().ref('users/'+UID+'/').on("value", snapshot =>{
          var i=0;
      snapshot.forEach((childSub) => {
        let key = childSub.key;
        let userList = childSub.val();
        //console.log(userList);
        //console.log(key);
        if(key=="photos"){
          this.state.imagePresent=true;
          let UID = firebase.auth().currentUser.uid;
        firebase.database().ref('users/'+UID+'/photos/').on("value", snapshot =>{
        snapshot.forEach((childSub) => {
          let key = childSub.key;
          let path='users/'+UID+'/photos/'+key+'/';
          var i=0;
          var attributes=[key];
          firebase.database().ref(path).on("value", snapshot =>{
            snapshot.forEach((childSub) => {
              let key = childSub.key;
              attributes.push(childSub.val());
              i++;
            });
            URIs.push(attributes);
          });
        });
      });

        }
        if(key=="first_name"){
            Name=userList;
            //console.log(Name);
        }
        else if(key=="contact_no"){
            contactNo=userList;
        }
        else if(key=="gmail"){
            emailID=userList;
        }
        else if(key=="last_name"){
            RollNo=userList;
        }
        else if(key=="profile_picture"){
            imageURL=userList;
        }
        i++;
       });
      });
    }
    componentDidMount(){
      //this.getItems();
      this.getData();
      console.log(allItems);
  };

    render(){
       return(
           <SafeAreaView style = {styles.container}>
             <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
          >
                <TouchableOpacity style={styles.buttons}
                onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
                <Text style={styles.appButtonText}>Profile Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>this.props.navigation.navigate('UploadScreen')}>
                <Text style={styles.appButtonText}>Upload Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>this.props.navigation.navigate('MyItemsScreen')}>
                <Text style={styles.appButtonText}>Personal Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                onPress={()=>firebase.auth().signOut()}>
                <Text style={styles.appButtonText}>Sign Out Button</Text>
                </TouchableOpacity>
                </View>
                
               <Item>
                   <Icon name="search"/>
                   <Input placeholder="Search Item" onChangeText={text=>{this.searchItem(text)}}/>
               </Item>
               <View style={{height:680}}>
               <ScrollView>
               <Content>
         
         {this.state.filteredItems.map((item)=>(
             <View>
             <ListItem avatar>
                 <Left>
                     <Image style={styles.imagestyle}
                     source={{uri : item[3]}}/>
                 </Left>
                 <Body>
                     <Text><Text style={{fontWeight: "bold"}}>Item name:</Text> {item[4]}</Text>
                     <SpaceSeparator/>
                     <Text><Text style={{fontWeight: "bold"}}>Item cost:</Text> {item[2]}</Text>
                     <SpaceSeparator/>
                     <Text><Text style={{fontWeight: "bold"}}>Owner name:</Text> {item[0]}</Text>
                     <SpaceSeparator/>
                     <Text><Text style={{fontWeight: "bold"}}>Owner contact no:</Text> {item[1]}</Text>
                 </Body>
             </ListItem>
             <LineSeparator/>
             </View>
                 
         )
         )}
 
     </Content>
               </ScrollView>
               </View>
               </SafeAreaView>
       ); 
    }
}
export default DashboardScreen;
export {Name};
export {emailID};
export {imageURL};
export {RollNo};
export {URIs};
export {contactNo};
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
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
    imagestyle: {
       
      width: 200,
      height: 200,
    },
});
