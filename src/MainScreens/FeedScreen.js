import React,{Component} from 'react'
import {
    StyleSheet, Text, View, TextInput,
    TouchableHighlight,
    Image,
    ScrollView,
    CheckBox,
    SafeAreaView,
    Alert,
    PixelRatio,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    RefreshControl,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {Card, Button} from 'react-native-elements';
import DrawerActions from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ImagePicker from 'react-native-image-picker';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import 'firebase/storage';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DataScreen from './component/DataScreen';
import * as Constants from './../utils/Constants'
import AsyncStorage from '@react-native-community/async-storage';
import ProfileScreen from './ProfileScreen';
import SearchScreen from "./SearchScreen";
import ModalWrapper from 'react-native-modal-wrapper'
import MenuImage from "./component/SideIcone";
import Modal from "react-native-modal";


class LogoTitle extends React.Component {
    render() {
        return (
            <Image source={require('../../assets/NavBar.png')}
                   style={{width: 170, height: 50, marginLeft: 5, marginTop: 7}}/>
        );
    }
}



function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default class FeedScreen extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
           loading:false,
           visibleModal: null,
           page:1,
           seed:1,
           error:null,
           refreshing:false,

        }
    }
    openModal = () => {
        this.setState({ visibleModal: 'bottom'});
        console.log('hoiiiiiiiiiiiii')
    };
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => <LogoTitle/>,
            headerRight: () => (
                <TouchableHighlight style={{paddingRight: 16}}
                                    onPress={() => navigation.navigate('Profile', {user_id: firebase.auth().currentUser.uid})}>
                    <Image
                        source={require('../../assets/deuser.png')}
                        style={{width: 32, height: 32, borderRadius: 32 / 2}}
                    />   
                </TouchableHighlight>
            ),
           headerLeft: () =>(
               <View>
                <TouchableOpacity onPress={() =>this.openModal}>
                    <Image source={require('../../assets/menu.png')}
                    style={{width: 28, height: 28,marginLeft:5}}/>
                </TouchableOpacity>
                </View>
           
              )
        };
    }

    
    componentDidMount() {
        this.getUserData()
        
        
    }
    logout = () => {
        firebase.auth().signOut()
        .then(function() {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
             });
             this.props.navigation.dispatch(resetAction);
        }.bind(this))
        .catch(function(error) {
            console.log("logout failed: ", error)
        });
    }

    getUserData = async () => {
        try {
            const value = await AsyncStorage.getItem(Constants.USER_DATA)
            if(value !== null) {
                console.log(JSON.parse(value))
            }
        } catch(e) {
            // error reading value
        }
    }

    openModal = () => {
        this.setState({ visibleModal: 'bottom'});
    };

    render() {
        return (
            <View style={{flex:1, marginTop:10, marginBottom: 20}} >
                <DataScreen navigation={this.props.navigation}/>
                <TouchableHighlight style={styles.buttonAdd}
                    onPress={() => {this.props.navigation.navigate('AddRe')}}>
                    <Image source={require('../../assets/add.png')}
                    style={{width: 32, height: 32}}/>
                </TouchableHighlight>
                <View style={{position: 'absolute', top:-38,marginLeft:4 }}>
                    <TouchableHighlight onPress={this.openModal}>
                        <Image source={require('../../assets/edit.png')}
                        style={{width: 28, height: 28}}/>
                    </TouchableHighlight>
                </View>
                <Modal 
                    isVisible={this.state.visibleModal === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModal: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                        <Button title="Search" buttonStyle={{ backgroundColor:'#00b5ec',borderRadius: 30, }} containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {this.props.navigation.navigate('Search')}}/>
                          <Button title="Home" buttonStyle={{ backgroundColor:'#00b5ec',borderRadius: 30, }} containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {this.props.navigation.navigate('Main')}}/>  
                           <Button title="Logout" buttonStyle={{ backgroundColor:'#d9534f',borderRadius: 30, }} containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {this.logout()}}/>          
                        <View style={{height: 1, backgroundColor:'#ccc', marginTop: 20, marginBottom: 2}}></View>
                        <Button title="Close" buttonStyle={{ backgroundColor:'#8a8a8a' ,borderRadius: 30,}} onPress={() => this.setState({visibleModal: null})} containerStyle={{marginTop: 10, marginBottom: 10}}/>
                    </View>
                </Modal>
            </View>
            
        );
   }
}
const DrawerNavigatorExample = createDrawerNavigator({
    //Drawer Optons and indexing
    Home: {
      //Title
      screen: FeedScreen,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    Profile: {
      //Title
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: 'Demo Screen 2',
      },
    },
    Search: {
      //Title
      screen: SearchScreen,
      navigationOptions: {
        drawerLabel: 'Demo Screen 3',
      },
    },
  }); 

const styles = StyleSheet.create({
    container: {
        paddingTop: 7,
        marginBottom:-7,
    },
    row: {
        flexDirection: 'row'
    },
    headerUser: {
        flex: 1,
        flexDirection: 'column'
    },
    headerEdit: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
    },
    headerFollowing: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20
    },
    previewContainer: {
        paddingTop: 400,
    },
    Preview: {

        justifyContent: 'space-between',
        flexDirection: 'row',
        borderTopColor: '#eae5e5',
        borderBottomWidth: 1,
        borderBottomColor: '#eae5e5',
        paddingBottom: 10,
        marginBottom: 20
    },
    PreviewIcon: {
        width: 25,
        height: 25,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 22
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10
    },
    editButton: {
        width: 30,
        height: 32,
        marginLeft: 200,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600'
    },
    userInfo: {
        fontSize: 16,
        color: "#000000",
        fontWeight: '600',
        marginRight: 10
    },
    body: {
        backgroundColor: "white",
        height: 500,
        alignItems: 'center',
        flexDirection: 'row'
    },
    item: {
        flexDirection: 'row'
    },
    buttonAdd: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#00b5ec',
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modelContent: {
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
});