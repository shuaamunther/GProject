import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View ,Platform} from 'react-native';


import Login from './src/Login';
import ProfileScreen from './src/ProfileScreen';
import SignUpScreen from './src/SignUpScreenshuaa';
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import FeedScreen from './src/FeedScreen';

import WelcomeScreen from './src/WelcomeScreen';
import WelcomeScreen1 from './src/WelcomeScreen1';
import WelcomeScreen2 from './src/WelcomeScreen2';
import WelcomeScreen3 from './src/WelcomeScreen3';
import WelcomeScreen4 from './src/WelcomeScreen4';
import CardScreen from './src/CardScreen';
import SearchScreen from './src/SearchScreen';

import DataScreen from './src/DataScreen';
import TestScreen from './src/Test';
export default class App extends React.Component {
  render() {
   
  return (
     
      <AppContainer />
    
      

    
  );
}
}
const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Profile: {
    screen: ProfileScreen
  },
  SignUp: {
    screen: SignUpScreen
  },
  ForgetPassword: {
    screen: ForgotPasswordScreen
  },
  Main: {
    screen: FeedScreen
  },
  Welcome: {
    screen: WelcomeScreen
  },
  Welcome1: {
    screen: WelcomeScreen1
  },
  Welcome2: {
    screen: WelcomeScreen2
  },
  Welcome3: {
    screen: WelcomeScreen3
  },
  Welcome4: {
    screen: WelcomeScreen4
  },
  Card:{
  screen : CardScreen
  },
  Search:{
  screen : SearchScreen
  },
 Data:{
  screen:DataScreen
 },
 Test:{
 screen:TestScreen
 },
},
{
  initialRouteName: "Test"
})
const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
