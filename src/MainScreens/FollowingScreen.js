import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text ,TouchableHighlight,Image} from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import CardListScreen from './component/CardListScreen';
import Modal from "react-native-modal";

class LogoTitle extends React.Component {
  render() {
      return (
          <Image source={require('../../assets/NavBar.png')}
                 style={{width: 170, height: 50, marginLeft: 5, marginTop: 7}}/>
      );
  }
}

export default class FollowingScreen extends React.Component {

  static navigationOptions = {
    header: null
};

  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      visibleModal: null,
  }
 }
 openModal = () => {
  this.setState({visibleModal: 'bottom'});
  console.log('hoiiiiiiiiiiiii')
};

componentDidMount() {
  this.showData()
}
 showData() {
  let index = 1
  let Userid = firebase.auth().currentUser.uid
  let idusers
  let followingid
  let recipe
  let  userName 
  firebase.database().ref('/users/'+Userid+'/follwing').on('value', function (snapshot) {
      snapshot.forEach(function (item) {   
       // console.log('user',item.val())
          firebase.database().ref('/recipes/').on('value', function (user) {
            user.forEach(function (recipes) {  
                 idusers= recipes.val().user_id
                 followingid=item.val()
                 console.log('users',recipes.val().user_id)
                if(idusers===followingid)  
                {
                   firebase.database().ref('/users/' + item.val()).on('value', function (name) {
                     userName = name.child('fullname').val(); 
                     console.log('recipe',userName)
                      recipe = this.state.recipe
                    recipe.push({
                        title: recipes.val().title,
                        type: recipes.val().type,
                        rate: recipes.val().rate,
                        id: recipes.key,
                        userName:name.child('fullname').val(),
                        user_id: recipes.val().user_id
                    })
                  }.bind(this))
                    
                  console.log('arrays',recipe)
                    this.setState({
                        recipe: recipe
                    }) 
                }   
                 
            }.bind(this));
         }.bind(this)); 
   }.bind(this));
 }.bind(this));
}
  
  render(){
     // console.log(this.state.recipe)
   return (
    <SafeAreaView >
       <View style={{position: 'absolute', top: 15, marginLeft: 10,marginBottom:40,flexDirection:'row',}}>
                    <TouchableHighlight onPress={this.openModal}>
                        <Image source={require('C:/Project/AwesomeProject/assets/menu.png')}
                               style={{width: 28, height: 28}}/>
                    </TouchableHighlight>
                    <Image source={require('../../assets/NavBar.png')}
                   style={{width: 170, height: 50,marginTop:-10,marginLeft:20 }}/>
                   <TouchableHighlight style={{paddingRight: 16,marginLeft:80}}
                                    onPress={() => {
                                      this.props.navigation.navigate('Profile',{user_id: firebase.auth().currentUser.uid})}}>
                    <Image
                        source={require('../../assets/deuser.png')}
                        style={{width: 32, height: 32, borderRadius: 32 / 2}}
                    />
                </TouchableHighlight>
                </View>
                <Modal
                    isVisible={this.state.visibleModal === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModal: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                        <View style={{flexDirection: 'row'}}>
                             <Image
                                source={require('../../assets/logouser.png')}
                                style={{width: 100, height: 100, borderRadius: 32 / 2}}
                            /> 
                            <Text style={{fontSize: 20, marginLeft: 12, marginTop: 45}}>Shuaa5</Text>
                        </View>
                        <Button title="Home" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Main')
                                }}/>
                        <Button title="Search" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Search')
                                }}/>
                        <Button title="Profile" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Profile',{user_id: firebase.auth().currentUser.uid})
                                }}/>
                        <Button title="Logout" buttonStyle={{backgroundColor: '#d9534f', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.logout
                                }}/>
                        <View style={{height: 1, backgroundColor: '#ccc', marginTop: 20, marginBottom: 2}}></View>
                        <Button title="Close" buttonStyle={{backgroundColor: '#8a8a8a', borderRadius: 30,}}
                                onPress={() => this.setState({visibleModal: null})}
                                containerStyle={{marginTop: 10, marginBottom: 10}}/>
                    </View>
                </Modal>
                <View style={{marginTop:70}}>
      <CardListScreen recipe={this.state.recipe}/>
      </View>
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