import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {StyleSheet, Text, View, Platform, YellowBox} from 'react-native';

import Login from './src/SignScreens/Login';
import ProfileScreen from './src/MainScreens/ProfileScreen';
import ProfileScreen2 from './src/MainScreens/ProfileScreen2';
import SignUpScreen from './src/SignScreens/SignUpScreen';
import ForgotPasswordScreen from './src/SignScreens/ForgotPasswordScreen';
import FeedScreen from './src/MainScreens/FeedScreen';
import WelcomeScreen from './src/WelcomeScreens/WelcomeScreen';
import WelcomeScreen1 from './src/WelcomeScreens/WelcomeScreen1';
import WelcomeScreen2 from './src/WelcomeScreens/WelcomeScreen2';
import WelcomeScreen3 from './src/WelcomeScreens/WelcomeScreen3';
import WelcomeScreen4 from './src/WelcomeScreens/WelcomeScreen4';
import CardScreen from './src/MainScreens/component/CardScreen';
import UserCard from './src/MainScreens/component/UsersCard';
import SearchScreen from './src/MainScreens/SearchScreen';
import DataScreen from './src/MainScreens/component/DataScreen';
import FollowersScreen from './src/MainScreens/component/Followers';
import DataScreenFollowing  from './src/MainScreens/component/DataForFollowing'
import Test from './src/MainScreens/Test';
import AddRecipes from './src/MainScreens/AddRecipes';
import RecipeScreen from './src/MainScreens/RecipeScreen';
import PickingPicture from './src/PickingPicture'
import FirstScreen from './src/FirstScreen';
import FollowingScreen from './src/MainScreens/FollowingScreen'
//import FlatListDemo from './src/ChatScreens/LoginToChat';
//import ChatScreen from './src/ChatScreens/ChatScreen';
import * as firebase from 'firebase';

export default class App extends React.Component {

    componentWillMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyAbdvpkiwh1E19r39slZ5Ixyrm6JgUEMgY",
            authDomain: "gradproject-408c0.firebaseapp.com",
            databaseURL: "https://gradproject-408c0.firebaseio.com",
            projectId: "gradproject-408c0",
            storageBucket: "gradproject-408c0.appspot.com",
            messagingSenderId: "1071288752672",
            appId: "1:1071288752672:web:4459fbec630c9219e3fa45",
            measurementId: "G-Y004ZTSSHX"
        };
        //  if (!firebase.app.length) {
        firebase.initializeApp(firebaseConfig);
        // }
    }

    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    render() {
        return (
            <AppContainer/>
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
        Recipe: {
            screen: RecipeScreen
        },
        Profile2: {
            screen: ProfileScreen2
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
        Card: {
            screen: CardScreen
        },
        Search: {
            screen: SearchScreen
        },
        Data: {
            screen: DataScreen
        },
        Data2: {
            screen: DataScreenFollowing
        },
        Test: {
            screen: Test
        },
        AddRe: {
            screen: AddRecipes
        },
        Pic:
            {screen: PickingPicture},
        First:  {
            screen: FirstScreen
        },
        Users: {
            screen: UserCard
        },
        Following: {
            screen:FollowingScreen
        },
        FollowersName: {
            screen:FollowersScreen
        }

    },
    {
        initialRouteName: "First"
    })
const AppContainer = createAppContainer(AppNavigator);
