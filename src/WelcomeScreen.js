import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,
          Button,
           TouchableHighlight,
             Image,
             SafeAreaView,
               Alert}
            from 'react-native';
            import { createAppContainer } from 'react-navigation';
            import { createStackNavigator } from 'react-navigation-stack';                     
   import * as firebase from 'firebase'; 
//import SignUpScreenshuaa from '/SignUpScreenshuaa';
  

    export default class Welcome extends  React.Component {
        render() {
          return (
            <SafeAreaView style={styles.container}>
      
        <View style={styles.header} >
         <Image
          style={styles.botto}
          source={require('../assets/tap1.png')} />
          
          
        </View>
        
        <Image
          style={styles.avatar}
          source={require('../assets/user.png')}/>
        
             
              <View style={styles.body}>
              
                <View style={styles.bodyContent}>
                  <Text style={styles.info}>email{'\n'}</Text>
                    <Text style={styles.name}>Welcome to Bon Appetit{'\n'}</Text>
                      <Text style={styles.description}>Your answers to the next few questions will  {'\n'} 
                                     help us find the right ideas for you{'\n'}{'\n'}
                              </Text>
                    
             <TouchableHighlight style={[ styles.buttonContainer,
                                           styles.loginButton]} 
                                            onPress={() => this.props.navigation.navigate('Welcome1')} >   
                                              <Text style={styles.loginText}>Next</Text> 
                                                </TouchableHighlight>
                             
              <Text style={styles.description}>Already have a Pinterest account? for you{'\n'}
                       Log in instead
                    </Text>
                   </View>
                </View>
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
        name: {
          fontSize: 22,
          color: '#FFFFFF',
          fontWeight: '600',
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
        },
       loginButton: {
backgroundColor: "#00b5ec",
marginBottom:20,
width:100,
borderRadius:30,

},loginText: {
    color: 'white',
    },
        titleText: {
          fontSize: 30,
          fontWeight: 'bold',
        },
      });
      