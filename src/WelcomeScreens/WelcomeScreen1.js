import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    CheckBox,
    SafeAreaView,
    Alert,
    AsyncStorage,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import * as Constants from '../utils/Constants'
import { ButtonGroup } from 'react-native-elements';
import WelcomeHeader from './WelcomeHeader'


export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            diet:'',
            id:''
        };  
    }
    dietInfo(){
        

    }
    
    componentWillMount(){
        global.user_logged_in=firebase.auth().currentUser.uid
    }

    getToken = async () =>{
        try {
            const value =await AsyncStorage.getItem(Constants.ACCESS_TOKEN);
            if(value!==null) {
                this.setState({userId: value})
            }
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
        let onDiet=this.state.selectedIndex
        let result
        if(onDiet == 0)
        {
          result='false'
        }
        else if(onDiet==1)
        {
            result='true'
        }
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/diet').set(result)
         }
        catch(error){
            console.log(error)
        }
    }

    render() {
        console.log('id',firebase.auth().currentUser.uid)
        const buttons = ['YES', 'NO']
        const { selectedIndex } = this.state
        console.log(this.state.selectedIndex)
        return (
            <View style={styles.header}>
                <View style={styles.WelcomeHeader}>
                    <WelcomeHeader pageIndex="2"/>
                </View>

                <View style={styles.headerView}>
                    <Text style={styles.name}>
                        Are you in a diet?
                    </Text>

                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        style={{flex: 1}}
                    />

                    <TouchableHighlight style={[styles.buttonContainer,styles.NextButton,]}
                                        onPress={() => this.props.navigation.navigate('Welcome2')}>
                            <Text style={styles.loginText}>Next</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    WelcomeHeader: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 20,
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    },
    buttonContainer: {
        marginTop: 30,
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
    name: {
        fontSize: 18,
        color: '#696969',
        fontWeight: '600',
        marginBottom: 10,
    },
});