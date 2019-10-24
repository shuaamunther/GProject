import React from 'react';
import { StyleSheet, Text, View,TextInput,
          Button,
           TouchableHighlight,
             Image,
               Alert}
            from 'react-native';
 // import firebase from 'react-native-firebase';
            
             

export default class login extends React.Component{

 /* onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
  // state = { email: '', password: '', errorMessage: null }
   //           handleLogin = () => {
     //kj           // TODO: Firebase stuff...
                console.log('handleLogin')
              }*/ 
            
              componentDidMount() {
                firebase.auth().onAuthStateChanged(user => {
                  this.props.navigation.navigate(user ? 'Main' : 'SignUp')
                })
              }
}


