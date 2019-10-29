import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    ScrollView,
    CheckBox,
    SafeAreaView,
    Alert
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
//import SignUpScreen from 'SignUpScreen.js';

export default class Welcome extends React.Component {
    handleCheckboxChange = event => this.setState({checked: event.target.checked})
    constructor(props) {
        super(props);
        this.state = {
            yes:false,
            No:false,
            checked: false
        };  
    }

    render() {
        return (
          <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
              <View style={styles.header}>
                  <Image style={styles.botto} source={require('../assets/tap4.png')}/>
                  <Text  style={styles.name}> Do you have any food allergies? </Text>
                  <Text style={{alignSelf: 'center',}}>Choose as many as you like (or none at all) and tap 'Next'</Text>
                  <Text style={{alignSelf: 'center',}}> You can change these any tiome in your Preference.</Text>
              </View>

              <View style={styles.body}>
                  <View style={styles.bodyContent}>
                      <View style={styles.row}>
                          <View style={styles.box}>
                              <CheckBox value={this.state.yes}
                                        onValueChange={() => this.setState({yes: !this.state.yes})}/>
                               <Text>Yes</Text>        
                          </View>

                          <View style={styles.box}>
                              <CheckBox  value={this.state.no}
                                         onValueChange={() => this.setState({no: !this.state.no})}/>
                              <Text>No</Text>
                          </View>
                      </View>

                      <TouchableHighlight style={[styles.buttonContainer, styles.NextButton, styles.description]}
                                          onPress={() => this.props.navigation.navigate('Welcome4')}>
                          <Text style={styles.loginText}>Next</Text>
                      </TouchableHighlight>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        height: 200,
        alignSelf: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 80,
    },
    body: {
        marginTop: 20,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 2,
    },
    name: {
        fontSize: 26,
        color: '#696969',
        fontWeight: '600',
        marginLeft: 88,
        marginTop: 50,
    },
    info: {
        fontSize: 16,
        color: '#00BFFF',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: '#696969',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: '#00BFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    NextButton: {
        backgroundColor: "#00b5ec",
        marginBottom: 40,
        width: 100,
        borderRadius: 30,
        marginTop: 50,
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
    },
    row: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

      