import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import LineSeparator from '../components/LineSeparator';
import SpaceSeparator from '../components/SpaceSeparator'
import firebase from 'firebase';
import Fire from '../Fire'; 



class UploadScreen extends Component{
  state = {
    image: null,
    uploading: false,
    itemName: '',
    price: ''
  };

  render() {
    let {
      image
    } = this.state;

    return (
      <View style={styles.container}>
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
                onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
                <Text style={styles.appButtonText}>Profile Screen</Text>
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
        <ScrollView>
        <Text
        style={styles.one}
        >Upload Image of the Item</Text>
        
          <LineSeparator/>
          
        <View style={styles.buttonContainer}>
        <Button
          styles = {styles.Button1}
          onPress={this._pickImage}
          title="Pick an image from camera roll"
          color="#009688"
        />
      </View>
      <SpaceSeparator/>
      <View style={styles.buttonContainer}>
        <Button
          style = {styles.Button1}
          onPress={this._takePhoto}
          title ="Take a photo"
          color="#009688"
        />
      </View>
  
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        </ScrollView>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };
  upload = (image,item,cost) => {
      //alert(this.itemName);
      //alert(this.price);
      alert("Item uploaded");
    Fire.shared.addPhoto(image,item,cost).then(()=>{
      setImage(null)
      

    })
    .catch(err=>{
      console.log(err.message)
    })
  }
  changeTextInput=(item)=>{
    this.setState({ itemName: item })
  }
  enterPriceInput=(cost)=>{
    this.setState({ price: cost })
}
renderElement(){
    if(this.image === null){
        alert("Select image");
        //this.renderElement();
    }
    else if(this.itemName===undefined){
        alert("Enter item name");
        //this.renderElement();

    }
    else if(this.price===undefined){
        alert("Enter price of item");
        //this.renderElement();
    }
    return null;
 }
 
 /*render() {
     return (   
         <View style={styles.container}>
             { this.renderElement() }
         </View>
     )
 }*/
  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>
        <TextInput
          value={this.itemName}
          onChangeText={this.changeTextInput}
          placeholder={'Enter Item Name'}
        />
        <TextInput
          value={this.price}
          onChangeText={this.enterPriceInput}
          placeholder={'Enter Price'}
        />
        <Button title='Upload' color="#009688" onPress={()=>this.upload(image,this.state.itemName,this.state.price)}/>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
      }

      //this.uploadImageAsync(pickerResult.uri);
      //console.log(pickerResult.uri);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });


      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri});
      }
      //this.image=pickerResult.uri;
      //this.uploadImageAsync(pickerResult.uri);
    }
  };

 /*uploadImageAsync(pictureuri) {
  let apiUrl = 'http://123.123.123.123/ABC';



    var data = new FormData();  
    data.append('file', {  
      uri: pictureuri,
      name: 'file',
      type: 'image/jpg'
    })

    fetch(apiUrl, {  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    }).then(
      response => {
        console.log('succ ')
        console.log(response)
      }
      ).catch(err => {
      console.log('err ')
      console.log(err)
    } )




  }*/

}
export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'white'
  },
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
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    alignSelf:"center",
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  Button1: {
    marginBottom: 100,
    paddingBottom: 40,
    width: 20, 
    height: 30,
  },
  buttonContainer: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "red",
    alignSelf: "center"
  },
  one: {
    fontSize : 20,
    color : 'darkgrey',
    alignSelf: 'center'
  }
});