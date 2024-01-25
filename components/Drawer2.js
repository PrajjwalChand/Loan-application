

import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import  DashboardScreen from '\screens\DashboardScreen.js';
import ProfileScreen from '\screens\ProfileScreen.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
      </TouchableOpacity>
    </View>
  );
}

function DashboardScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="DashboardScreen">
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            title: 'DashboardScreen', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function ProfileScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'ProfileScreen', //Set Header Title
          
        }}/>
    </Stack.Navigator>
  );
}

function Drawer2() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="DashboardScreen"
          options={{ drawerLabel: 'Dash-option' }}
          component={DashboardScreenStack} />
        <Drawer.Screen
          name="ProfileScreen"
          options={{ drawerLabel: 'Second page Option' }}
          component={profileScreenStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Drawer2;
