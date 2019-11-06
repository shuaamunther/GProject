import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import CardScreen from '../src/CardScreen';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import CardListScreen from './CardListScreen';


export default class DataScreen extends React.Component {
  constructor(props) {
    super(props);
  
    //firebase
    this.state = {
      recipe: [],
  }
 }

 showData()
     {
      let recipe = []
      firebase.database().ref('/recipes').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
          
            console.log('item: ', item.key)
            recipe.push({title: item.val().title, type: item.val().type, rate: item.val().rate,id: item.key})
        })
       console.log('this',recipe)
        this.setState({
            recipe: recipe
        })
    }.bind(this));
}

componentDidMount(){
  this.showData()
}

  render(){
   return (
    <SafeAreaView style={styles.container}>
      <CardListScreen recipe={this.state.recipe}/>
    </SafeAreaView>
    
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