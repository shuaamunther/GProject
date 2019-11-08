import React from 'react';
import { Text, View, StyleSheet ,Image,FlatList} from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import {StackActions, NavigationActions, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import * as Constants from './Constants'


class FirstScreen extends React.Component {
   static navigationOptions ={
    header:null
   };

   componentDidMount(){
    if (firebase.auth().currentUser) {
        var user = firebase.auth().currentUser;
        firebase.database().ref().child('users').orderByKey().equalTo(user.uid).on("value", function(snapshot) {
            if(snapshot.val()) {
                let userData = snapshot.val()[user.uid]
                userData['id'] = user.uid
                this.storeUserData(userData)  
            }
        }.bind(this));
    } else {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
         });
         this.props.navigation.dispatch(resetAction);
    }
}

    storeUserData = async (userData) => {
        try {
            await AsyncStorage.setItem(Constants.USER_DATA, JSON.stringify(userData))
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            this.props.navigation.dispatch(resetAction);
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image  source={require('../assets/logo.png')}/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      borderRadius:8,
      alignItems: 'center',
    },
   
  });
export default FirstScreen;