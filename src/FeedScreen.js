import React,{Component} from 'react'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import { SafeAreaView, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import firebase  from 'firebase';

export default class UsersScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
        render() {
            return (
     <Text></Text>
                    );
    }
    
}