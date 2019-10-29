import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

class LogoTitle extends React.Component {
    render() {
        return (
            <Image source={require('../assets/NavBar.png')}
                   style={{width: 170, height: 50, marginLeft: 5, marginTop: 7}}/>
        );
    }
}

export default class login extends React.Component {
    static navigationOptions = {
        headerTitle: () => <LogoTitle/>,
    };

    render() {
        return (
            <View >
                
            </View>
        );
    }
}