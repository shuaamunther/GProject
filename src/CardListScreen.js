import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import CardScreen from '../src/CardScreen';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default class CardListScreen extends React.Component {
  constructor(props) {
    super(props);

 }

  render(){
   return (
      <FlatList
            data={this.props.recipe}
            renderItem={({ item }) => <CardScreen cardItem={item}/>}
            keyExtractor={item => item.id}/>
   
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});