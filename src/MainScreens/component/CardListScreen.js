import React from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import CardScreen from './CardScreen';
import {Card, Button} from 'react-native-elements';
import * as firebase from 'firebase';

export default class CardListScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <FlatList
                data={this.props.recipe}
                renderItem={({item}) => <CardScreen cardItem={item} navigation={this.props.navigation}/>}
                keyExtractor={item => item.id}/>
        );
    }
}