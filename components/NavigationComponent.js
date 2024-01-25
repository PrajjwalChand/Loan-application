import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";

import SplashScreen from '../screens/SplashScreen';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadScreen from '../screens/UploadScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import MyItemsScreen from '../screens/MyItemsScreen';
import MenuIcon from './MenuIcon';

// import Screen2 from "./Screens/Screen2";

const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const ItemsStack = createStackNavigator();
//const UploadStack = createStackNavigator();

const InitialScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Menu",
          headerShown: true,
          headerLeft: () => <MenuIcon />
        }}
      />
    </DashboardStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              mode="contained"
              onPress={() => navigation.navigate("Home")}
            />
          ),
          headerTitleAlign: "center"
        }}
      />
      <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </ProfileStack.Navigator>
  );
};

/*const CurrentIssueStackScreen = ({ navigation }) => {
  return (
    <CurrentIssueStack.Navigator>
      <CurrentIssueStack.Screen
        name="CurrentIssue"
        component={CurrentIssue}
        options={{
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              mode="contained"
              onPress={() => navigation.navigate("Home")}
            />
          ),
          headerTitleAlign: "center",
          title: "Current Issue"
        }}
      />
    </CurrentIssueStack.Navigator>
  );
};

const TransactionHistoryStackScreen = ({ navigation }) => {
  return (
    <TransactionHistoryStack.Navigator>
      <TransactionHistoryStack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              mode="contained"
              onPress={() => navigation.navigate("Home")}
            />
          ),
          headerTitleAlign: "center",
          title: "Transaction History"
        }}
      />
    </TransactionHistoryStack.Navigator>
  );
};*/

function NaviagtionComponent() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "black",
  }
});

export default NaviagtionComponent;