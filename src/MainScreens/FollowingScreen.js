import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text ,TouchableHighlight,Image} from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import CardListScreen from './component/CardListScreen';
import Modal from "react-native-modal";
import DataScreenFollowing from './component/DataForFollowing';
import AsyncStorage from '@react-native-community/async-storage';

class LogoTitle extends React.Component {
  render() {
      return (
          <Image source={require('../../assets/NavBar.png')}
                 style={{width: 170, height: 50, marginLeft: 5, marginTop: 7}}/>
      );
  }
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default class FollowingScreen extends React.Component {

  static navigationOptions = {
    header: null
};

  constructor(props) {
    super(props);
    this.state = {
      // recipe: [],
      visibleModal: null,
  }
 }
 openModal = () => {
  this.setState({visibleModal: 'bottom'});
  // console.log('hoiiiiiiiiiiiii')
};


componentDidMount() {
  this.getUserData()
}

logout = () => {
  firebase.auth().signOut()
      .then(function () {
          const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Login'})],
          });
          this.props.navigation.dispatch(resetAction);
      }.bind(this))
      .catch(function (error) {
          console.log("logout failed: ", error)
      });
}

getUserData = async () => {
  try {
      const value = await AsyncStorage.getItem(Constants.USER_DATA)
      if (value !== null) {
          console.log(JSON.parse(value))
      }
  } catch (e) {
      // error reading value
  }
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
                            <Text style={{fontSize: 20, marginLeft: 12, marginTop: 45}}></Text>
                        </View>
                        <Button title="Explore" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Main')
                                }}/>
                        <Button title="Search" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Search')
                                }}/>
                        <Button title="Notification" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Notification')
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
                <View style={{marginTop:55,marginBottom:20}}>
      <DataScreenFollowing navigation={this.props.navigation}/>
      <TouchableHighlight style={styles.buttonAdd}
                                    onPress={() => {
                                        this.props.navigation.navigate('AddRe')
                                    }}>
                    <Image source={require('../../assets/add.png')}
                           style={{width: 32, height: 32}}/>

                </TouchableHighlight>
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
  buttonAdd: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00b5ec',
    position: 'absolute',
    bottom: 10,
    right: 10,
    //top:480,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
},
modelContent: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
},
});