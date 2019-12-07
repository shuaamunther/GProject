import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import CardListScreen from './CardListScreen';


export default class DataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
  }
 }

 
componentDidMount() {
  this.showData()
}
 showData() {
  let index = 1
  firebase.database().ref('/recipes').on('value', function (snapshot) {
      snapshot.forEach(function (item) {
          firebase.database().ref('/users/' + item.val().user_id).on('value', function (user) {
              let userName = user.child('fullname').val();
              let recipe = this.state.recipe
              recipe.push({
                  title: item.val().title,
                  type: item.val().type,
                  rate: item.val().rate,
                  time: item.val().time,
                  difficality: item.val().difficality,
                  ingredients: item.val().ingredients,
                  steps: item.val().steps,
                  fat: item.val().fat,
                  fiber: item.val().fiber,
                  calories: item.val().calories,
                  description:item.val().description, 
                  id: item.key,
                  userName: userName,
                  user_id: item.val().user_id
              })
              this.setState({
                  recipe: recipe
              })
          }.bind(this))
      }.bind(this))
  }.bind(this));


}



  render(){
   return (
    <SafeAreaView >
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