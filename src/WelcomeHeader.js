import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    CheckBox,
    SafeAreaView,
    Alert,
    AsyncStorage,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import * as Constants from './Constants'
import { ButtonGroup } from 'react-native-elements';


export default class WelcomeHeader extends React.Component {
    constructor(props){
        super(props)
    }

    circles = (pageIndex) => {
        let items = []
        for (let i=0; i < 5; i++) {
            if(pageIndex == (i+1)){
                item =  <View style={[styles.circle, {backgroundColor: '#00b5ec'}]} />
            } else {
                item = <View style={[styles.circle]} />
            }
            items.push(item);
        }

        return items;
    }

    render() {
        return (
            <View style={styles.circlesView}>
                {this.circles(parseInt(this.props.pageIndex))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circlesView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    circle: {
        width: 18,
        height: 18,
        borderRadius: 100/2,
        backgroundColor: '#AEAEAE',
        marginLeft: 3,
        marginRight: 3,
    }
});