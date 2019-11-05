import React from 'react';
import { Text, View, StyleSheet ,Image,FlatList} from 'react-native';
import { Card, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import {StackActions, NavigationActions, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';



class FirstScreen extends React.Component {
    constructor(props){
        super(props);
    }
   
    componentWillMount(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log('User is signed in')
              const resetAction = StackActions.reset({
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
            } else {
              // No user is signed in.
              console.log('No User is signed in')
              const resetAction = StackActions.reset({
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
            }
            });
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