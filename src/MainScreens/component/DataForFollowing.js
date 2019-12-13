import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import CardListScreen from './CardListScreen';



export default class DataScreenFollowing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
  }
 }
 
componentWillMount() {
  this.showData()
}
showData = async () =>{
    let index = 1
    let Userid = firebase.auth().currentUser.uid
    let idusers
    let followingidgit
    let recipe=[]
    let  userName 
    try{
    firebase.database().ref('/users/'+Userid+'/follwing').on('value', function (snapshot) {
        snapshot.forEach(function (item) {   
         // console.log('user',item.val())
            firebase.database().ref('/recipes/').on('value', function (user) {
              user.forEach(function (recipes) {  
                   idusers= recipes.val().user_id
                   followingid=item.val()
                  // console.log('users',recipes.val().user_id)
                  if(idusers===followingid)  
                  {
                     firebase.database().ref('/users/' + item.val()).on('value', function (name) {
                       userName = name.child('fullname').val(); 
                     //  console.log('recipe',userName)
                        recipe = this.state.recipe
                      recipe.push({
                          title: recipes.val().title,
                          type: recipes.val().type,
                          rate: recipes.val().rate,
                          avatarSource:recipes.child('avatarSource').val(),
                          difficality: recipes.val().difficality,
                          id: recipes.key,
                          userName:name.child('fullname').val(),
                          user_id: recipes.val().user_id
                      })            
                      this.setState({
                          recipe: recipe
                      }) 
                    }.bind(this));
                  }       
              }.bind(this));
           }.bind(this)); 
     }.bind(this));
   }.bind(this));
}
catch(error){
    console.log(error)
}
  }

  render(){
    console.log('arrays',this.state.recipe)
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