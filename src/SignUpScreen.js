import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
}from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import {AsyncStorage} from 'react-native';

const ACCESS_TOKEN ='aceesstoken';
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
            age: '',
            userId:'',
            myKey: null,
        };
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    handleLogin = () => {
        // TODO: Firebase stuff...
        console.log('handleLogin')
    }

    componentDidMount() {
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
        let age = this.state.age
        let userId = this.state.userId
        if (fullname == '' || email === '' || age === null || password === '') {
            alert('please fill all fields')
            return null
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    let aceesstoken =res.user.uid; 
                    this.savetoken(aceesstoken);
                    //console.log('yhis',aceesstoken)
                    firebase.database().ref('users/' + res.user.uid).set({
                            fullname: fullname,
                            email: email,
                            age: age,
                        },
                    
                        function (error) {
                            if (error) {
                                Alert.alert("Failed signup user: Message: " + error)
                            } else {
                                Alert.alert("Success signup: Message: " + res.user.uid)
                            }
                        })
                }).then(() => {
              //  this.props.navigation.navigate('Welcome')
            }).catch(function (error) {
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
            this.setState({email})
            this.setState({emailvalid: false})
            return false;
        }
        this.setState({email})
        this.setState({emailvalid: true})
    }

    validatepass = (password) => {
        if (this.state.password.lentgh < 6) {
            this.setState({password})
            this.setState({passwordvalid: false})
            return false;
        }
        this.setState({password})
        this.setState({passwordvalid: true})
        }
        
        async getToken() {
            try {
              const value =await AsyncStorage.getItem(ACCESS_TOKEN);
              this.setState({myKey: value});
              //if(value){
              //const item = JSON.parse(value);
              console.log('this token',value);
               
            //}
            } catch (error) {
              console.log("Error retrieving data" + error);
            }
          }
        
        async savetoken(aceesstoken) {
            try {
             await AsyncStorage.setItem(ACCESS_TOKEN, aceesstoken);
             this.getToken();
             //console.log('accees token is :',y)
             //return value
            } catch (error) {
              console.log("Error saving data" + error);
            }
          }
            
    render() {
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
                        <TouchableHighlight style={[styles.buttonContainer,styles.SignUpButton]}
                                            onPress={() => this.signup() }>
                            <Text style={styles.loginText}>Sign Up</Text>
                        </TouchableHighlight>
                        <Text style={styles.instructions}>
                          Stored key is = {this.state.myKey}
                        </Text>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFDE03',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    SignUpButton: {
        backgroundColor: "#00b5ec",
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
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
