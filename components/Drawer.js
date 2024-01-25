/*import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

  function Feed({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      </View>
    );
  }
  function Feed({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      </View>
    );
  }
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
            label = ""
           onPress={()=>props.navigation.ProfileScreen()}
        >
        </DrawerItem>
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Toggle drawer"
          onPress={() => props.navigation.toggleDrawer()}
        />
      </DrawerContentScrollView>
    );
  }*/
  //const Drawer = createDrawerNavigator();
  /*function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Profile" component={Feed} />
        <Drawer.Screen name="Notifications" component={Notifications} />
      </Drawer.Navigator>
    );
  }*/
  import {CreateDrawerNavigator} from 'react-navigation-drawer'
  import ProfileScreen from '../screens/ProfileScreen'
  export const Drawer=CreateDrawerNavigator({
      Profile:{
          screen:ProfileScreen,
          navigationOptions:{
              drawer:{
                  label:'My Profile'
              }
          }
      }
  });