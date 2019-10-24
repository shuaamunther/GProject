import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,
          Button,
           TouchableHighlight,
             Image,
               Alert,
               KeyboardAvoidingView,
               ScrollView ,}
            from 'react-native';
            import { createAppContainer } from 'react-navigation';
            import { createStackNavigator } from 'react-navigation-stack';                     
   import * as firebase from 'firebase'; 


export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
};
  constructor(props) {
    super(props);
    this.state = {
        fullname: '',
        email: '',
        password: '',
        age:'',
       
       
        //description: '',
    };

  }
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin')
  }
  componentDidMount(){
    firebase.auth().signOut().then(function () {
      //alert('SignOut is succedded')
    }, function (error) {
      // An error happened.
    });
  }
  WelcomeScreen() {
    this.props.navigation.navigate('Main');
  } 
  signup() {
    let fullname = this.state.fullname
    let email = this.state.email
    let password = this.state.password
    let age=this.state.age
   // let password2=this.state.password2

   // let description = this.state.description
   if(fullname == '' ||  email === '' || age === null || password === ''  )
   {
     alert('please fill all fields')
     return null
   }
   
   
   
   else{
    firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((res) => {
              firebase.database().ref('users/'+res.user.uid).set({
                  fullname:fullname,
                     email: email,
                        age:age,

               // description: description,
              },
              
              
              function(error) {
                if(error) {
                    Alert.alert("Failed signup user: Message: " + error)
                } else {
                    Alert.alert("Success signup: Message: " + res.user.uid)
                    //this.props.navigation.navigate('Profile')
                   // this.props.navigation.navigate('Profile')
                   //WelcomeScreen();
                }
            })
        }).then(()=> {this.props.navigation.navigate('Welcome')}).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert("Failed signup: Message: " + errorMessage)
        })

      }
}
  
validate = (email) => {
  // console.log(email);
   let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (reg.test(email) === false) {
     this.setState({ email })
     this.setState({emailvalid:false})
  
     return false;
   }
   this.setState({ email })
  this.setState({emailvalid:true})
  // firebase.auth().createUserWithEmailAndPassword(email,password)
 }
 validatepass = (password) => {
   //let reg =6;
   if (this.state.password.lentgh < 6) {
     this.setState({ password })
     this.setState({passwordvalid:false})
   

     return false;
   }
   this.setState({ password })
  this.setState({passwordvalid:true})
// firebase.auth().createUserWithEmailAndPassword(email,password)
//  alert('login is succedded');
 }                   

  render(){
    return (


      <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
     <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
             <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <Text style={styles.titleText}>Welcome to Bon Appetit{'\n'}</Text>
                </View>
       
    
       <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../assets/person.png')}/>
                <TextInput style={styles.inputs}
                    placeholder="Full Name"
                     keyboardType="Full-Name"
                      underlineColorAndroid='transparent'
                        onChangeText={(fullname) => this.setState({fullname})}/>
                           </View>





        <View style={styles.inputContainer}>
             <Image style={styles.inputIcon} source={require('../assets/email.png')}/>
                  <TextInput style={styles.inputs}
                      placeholder="Email"
                        keyboardType="email-address"
                            underlineColorAndroid='transparent'
                              autoCapitalize="none"
                                onChangeText={(email) => this.validate(email)}
                                  value={this.state.email}/>
                                    </View>


        <View style={styles.inputContainer}>
             <Image style={styles.inputIcon} source={require('../assets/person.png')}/>
                  <TextInput style={styles.inputs}
                        placeholder="Age"
                          keyboardType="Age"
                            underlineColorAndroid='transparent'
                              onChangeText={(age) => this.setState({age})}/>
                                </View>                            
  

  <View style={styles.inputContainer}>
       <Image style={styles.inputIcon} source={require('../assets/key.png')}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                  secureTextEntry={true}
                    autoCapitalize="none"
                        underlineColorAndroid='transparent'
                            onChangeText={(password) => this.validatepass(password)}
                                value={this.state.password}/>
                                  </View>
                                
    
      <TouchableHighlight style={[
            styles.buttonContainer,
                  styles.loginButton]} 
                     onPress={() => this.signup()} >   
                        <Text style={styles.loginText}>Sign Up</Text> 
                           </TouchableHighlight>
                            </KeyboardAvoidingView>
                              </ScrollView>
                                </View>
  
  
  );
  }
       _handlePress = () => {
          Linking.openURL(this.props.href);
            this.props.onPress && this.props.onPress();
                         };


  /*_handleHelpPress = () => { 
    AppNavigator.LinksScreen
      navi(<LinksScreen />);
      WebBrowser.openBrowserAsync
        'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
     
    };*/
  }
  
  
  //const { navigate } = this.props.navigation;
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', 
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
    marginBottom:20,
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