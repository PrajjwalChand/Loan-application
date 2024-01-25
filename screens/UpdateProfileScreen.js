import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import React, {Component} from "react";
import { contactNo } from "./DashboardScreen";
import firebase from 'firebase';
import LineSeparator from '../components/LineSeparator'
var newContact=contactNo;
class UpdateProfileScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
          phone: contactNo
        };
      }
    setPhone(text){
        this.state.phone=text;
        newContact=text;
        //alert(text);
    };
    updateProfileItems(text){
        let UID = firebase.auth().currentUser.uid;
        firebase.database().ref('users/'+UID+'/').update({contact_no: text});
        alert("Your Contact Number is Updated.")
    }
    render(){
        
        return(
            <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={{ padding: 10 }}>
          <TextInput
            label="Phone No."
            mode="outlined"
            value={this.phone}
            onChangeText={text=>this.setPhone(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="update"
          mode="contained"
          onPress={()=>this.updateProfileItems(newContact)}
          color="#009387"
        >
          Update
        </Button>
      </View>
      <LineSeparator/>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={()=>this.props.navigation.navigate('DashboardScreen')}
          color="#009387"
        >
          Home Screen
        </Button>
      </View>
    </View>
        );
        }
    }
export default UpdateProfileScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      alignContent: "center"
    },
    infoContainer: {
      // flex: 1,
      top: 20,
      justifyContent: "center",
      alignContent: "center",
      width: "85%",
      alignSelf: "center"
    },
    buttonContainer: {
      top: 100,
      width: "50%",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: "red",
      alignSelf: "center"
    }
  });