import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    ScrollView,
    CheckBox,
    SafeAreaView,
    Alert,
    TouchableOpacity,
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
        const styles = this.makeStyles()
        return (
          <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
            <View style={styles.view}>
              {this.makeImageIfAny(styles)}
              <Text style={styles.text}>{this.props.title}</Text>
            </View>
          </TouchableOpacity>
        )
      }makeImageIfAny(styles) {
        if (this.props.showImage) {
          return <Image style={styles.image} source={R.images.check} />
        }
      }makeStyles() {
        return StyleSheet.create({
          view: {
            flexDirection: 'row',
            borderRadius: 23,
            borderColor: this.props.borderColor,
            borderWidth: 2,
            backgroundColor: this.props.backgroundColor,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 16,
            paddingRight: 16
          },
          touchable: {
            marginLeft: 4,
            marginRight: 4,
            marginBottom: 8
          },
          image: {
            marginRight: 8
          },
          text: {
            fontSize: 18,
            textAlign: 'center',
            color: this.props.textColor,
            fontSize: 16
          }
        })
      }
    }
     