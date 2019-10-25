import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,
          Button,
           TouchableHighlight,
             Image,
             CheckBox,
             SafeAreaView,
               Alert}
            from 'react-native';
            import { createAppContainer } from 'react-navigation';
            import { createStackNavigator } from 'react-navigation-stack';                     
   import * as firebase from 'firebase'; 
//import SignUpScreenshuaa from '/SignUpScreenshuaa';
  

    export default class Welcome extends  React.Component {
      state = { checked: false }

    handleCheckboxChange = event => this.setState({ checked: event.target.checked })
        render() {
          return (
            <SafeAreaView style={styles.container}>
      
        <View style={styles.header} >
         <Image
          style={styles.botto}
          source={require('../assets/tap3.png')} />
          <Text
              style={styles.name} >
                  Are you vegetarian?
                         </Text>
        </View>
        <View style={styles.body}>           
           <View style={styles.bodyContent}>
              <View style={styles.row}>
                <View style={styles.box}>
                
                     <CheckBox  title="Yes"
                                checked={this.state.checked}
                                 onPress={() => this.setState({ checked: !this.state.checked })}
                                    />
                                    <Text>Yes</Text>
                 </View>
                
               <Text> {'\n'}</Text>
               <Text> {'\n'}</Text>
               <Text> {'\n'}</Text>

             <View style={styles.box}>
                <CheckBox  title="No"
                   checked={this.state.checked}
                      onPress={() => this.setState({ checked: !this.state.checked })} />
                          <Text>No</Text>
                            <Text> {'\n'}</Text>
             </View>
             </View>
                <Text>{'\n'} {'\n'} {'\n'}</Text>

                  

                    <Text></Text>
             <TouchableHighlight style={[ styles.buttonContainer,
                                           styles.loginButton,styles.description]} 
                                            onPress={() => this.props.navigation.navigate('Welcome3')} >   
                                              <Text style={styles.loginText}>Next</Text> 
                                                </TouchableHighlight>
                             
              
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
          alignSelf: 'center',
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
          marginLeft: 77,
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
       row:{
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
          backgroundColor: '#ecf0f1',
        },
        botto:{
          marginBottom: 20,
        },
        PreviewIcon:{
          width: 50,
          height:50,
          marginLeft: 15,
          marginRight: 15,
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize:22
      },
      });
      
      