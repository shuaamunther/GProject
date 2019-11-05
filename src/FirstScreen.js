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
   
    componentDidMount(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log(this.props)
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            this.props.navigation.dispatch(resetAction);
            } else {
              // No user is signed in.
              console.log('No User is signed in')
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
            }
            }.bind(this));
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