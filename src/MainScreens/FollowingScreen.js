import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import CardListScreen from './component/CardListScreen';



export default class FollowingScreen extends React.Component {
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
  let Userid = firebase.auth().currentUser.uid
  let idusers
  let followingid
  let recipe=[]
  let username
  firebase.database().ref('/users/'+Userid+'/following').on('value', function (snapshot) {
      snapshot.forEach(function (item) {   
        firebase.database().ref('/users/' + item.val()).on('value', function (name) {
          userName = name.child('fullname').val();   
          firebase.database().ref('/recipes/').on('value', function (user) {
            user.forEach(function (recipes) {  
                 idusers= recipes.val().user_id
                 followingid=item.val()
                if(idusers===followingid)  
                {
                    recipe.push({
                        title: recipes.val().title,
                        type: recipes.val().type,
                        rate: recipes.val().rate,
                        time: recipes.val().time,
                        difficality: recipes.val().difficality,
                        ingredients: recipes.val().ingredients,
                        steps: recipes.val().steps,
                        fat: recipes.val().fat,
                        fiber: recipes.val().fiber,
                        calories: recipes.val().calories,
                        description:recipes.val().description, 
                        id: recipes.key,
                        userName:userName,
                        user_id: recipes.val().user_id
                    })
                    this.setState({
                        recipe: recipe
                    })
                }
                   
            }.bind(this));
         }.bind(this)); 
      }.bind(this));
   }.bind(this));
 }.bind(this));
}
  



  render(){
      console.log(this.state.recipe)
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