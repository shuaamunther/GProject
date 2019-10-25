import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,
          Button,
           TouchableHighlight,
             Image,
               Alert,
               KeyboardAvoidingView,
               ScrollView ,
              }
            from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



export default class ForgotPa extends React.Component {
 
  state = { email: '',
  password: '',
   errorMessage: null ,
   emailvalid: true,
   passwordvalid: true,
   currentUser: '',
   users: []
 }
 validate = (email) => {
 
   let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (reg.test(email) === false) {
     this.setState({ email })
     this.setState({emailvalid:false})
  
     return false;
   }
   this.setState({ email })
  this.setState({emailvalid:true})
  
 }
  render(){
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
       <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
       <View style={styles.container}>
          <Image style={styles.logo} source={require('../assets/logo.png')}/>
          
          </View> 
          <Text style={styles.titleText} >Find your Account</Text>
          <Text>Please enter your email to search for your account{'\n'}{'\n'}</Text>
          <View style={styles.inputContainer}>
   
    <Image style={styles.inputIcon} source={require('../assets/email.png')}/>
    <TextInput style={styles.inputs}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        underlineColorAndroid='transparent'
        onChangeText={(email) => this.validate(email)}
            value={this.state.email}/>
  </View>
  <TouchableHighlight style={[
    styles.buttonContainer,
       styles.loginButton]} 
               
         >
           
      <Text style={styles.loginText}>Search</Text>
      
    </TouchableHighlight>
  
     
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  
  
  );
  }

  }
  
  
  //const { navigate } = this.props.navigation;
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', 
    marginBottom:7,
    justifyContent: 'center'
    ,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#E3F2FD',
    borderRadius:30,
    borderBottomWidth: 1,
    width:250,
    height:45,
    marginBottom:10,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFDE03',
    flex:1,
  },
  inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
  },
  buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
  //marginLeft:7,
  },
  loginButton: {
  backgroundColor: "#00b5ec",
  marginBottom:20,
  width:100,
  borderRadius:30,
  
  },
  loginText: {
  color: 'white',
  },
  logo: {
    height: 180,
    width: 180,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  }
  });
  