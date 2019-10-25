import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
}
    from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';


value: 1;

export default class login extends React.Component {
    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    navigateToProfile() {
        const navigateAction = NavigationActions.navigate({routeName: 'Profile'});
        this.props.navigation.dispatch(navigateAction);
    }

    state = {
        email: '',
        password: '',
        errorMessage: null,
        emailvalid: true,
        passwordvalid: true,
        currentUser: '',
        users: []
    }

    handleLogin = () => {
        // TODO: Firebase stuff...
        console.log('handleLogin')
    }

    PhotoGrid() {
        firebase.auth().signOut().then(function () {
            //alert('SignOut is succedded')
        }, function (error) {
            // An error happened.
        });
    }

    componentWillMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyAbdvpkiwh1E19r39slZ5Ixyrm6JgUEMgY",
            authDomain: "gradproject-408c0.firebaseapp.com",
            databaseURL: "https://gradproject-408c0.firebaseio.com",
            projectId: "gradproject-408c0",
            storageBucket: "gradproject-408c0.appspot.com",
            messagingSenderId: "1071288752672",
            appId: "1:1071288752672:web:4459fbec630c9219e3fa45",
            measurementId: "G-Y004ZTSSHX"
        };

        firebase.initializeApp(firebaseConfig);
        const rootRef = firebase.database().ref();
        const usersRef = rootRef.child('users');
        //const user = firebase.auth().currentUser.uid;
        if (firebase.auth().currentUser) {
            var user = firebase.auth().currentUser.uid;
        }
    }
    SignUpuser() {
        this.props.navigation.navigate('SignUp')
    }

    ForgotPassword() {
        this.props.navigation.navigate('ForgetPassword')
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
        //let reg =6;
        if (this.state.password.lentgh < 6) {
            this.setState({password})
            this.setState({passwordvalid: false})
            return false;
        }
        this.setState({password})
        this.setState({passwordvalid: true})
    }

    setCurrentUser() {
        const {Profile} = firebase.auth()
        alert('login succsess');
        this.props.navigation.navigate('Profile');
    }

    LogInUser = (email, password) => {
        if (this.state.emailvalid == true) {
            if (this.state.passwordvalid == true) {
                firebase.auth().signInWithEmailAndPassword(email, password).then(() => this.setCurrentUser())
                    .catch(function (error) {
                        alert('The Password you have entered is incorrect please try again ')
                        console.log(error)
                    })
            } else {
                alert('Please enter 6 characters at least')
                return false;
            }
        } else {
            alert('This Email does not have an account');
            return false;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <View style={styles.container}>
                            <Image style={styles.logo} source={require('../assets/logo.png')}/>
                            <Text>{'\n'}</Text>
                        </View>
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

                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={require('../assets/key.png')}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Password"
                                       autoCapitalize="none"
                                       secureTextEntry={true}
                                       underlineColorAndroid='transparent'
                                       onChangeText={(password) => this.validatepass(password)}
                                       value={this.state.password}/>
                        </View>

                        <TouchableHighlight style={[
                            styles.buttonContainer,
                            styles.loginButton]}
                                            onPress={() => this.LogInUser(this.state.email,
                                                                          this.state.password)
                                            }
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonContainer}
                                            onPress={this.ForgotPassword.bind(this)}>
                            <Text>{'\n'}Forgot your password?</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.buttonContainer}
                                            onPress={this.SignUpuser.bind(this)}>
                            <Text>{'\n'}Register</Text>
                        </TouchableHighlight>
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
    loginButton: {
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
    }
});
