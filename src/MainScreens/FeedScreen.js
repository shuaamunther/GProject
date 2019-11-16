import React,{Component} from 'react'
import {
    StyleSheet, Text, View, TextInput,
    Button,
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
   
} from 'react-native';
import {createAppContainer} from 'react-navigation';
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

class LogoTitle extends React.Component {
    render() {
        return (
            <Image source={require('../../assets/NavBar.png')}
                   style={{width: 170, height: 50, marginLeft: 5, marginTop: 7}}/>
        );
    }
}

export default class FeedScreen extends React.Component {
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
        };
    }

    constructor(props) {
        super(props)
        this.state = {
           loading:false,
           page:1,
           seed:1,
           error:null,
           refreshing:false,

        }
    }
    
    componentDidMount() {
        this.getUserData()
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

    handelRefresh =() => {
        this.setState({
            page:1,
            refreshing:true,
            seed : this.state.seed +1,
        }, () => {
            this.makeRemoteRequest();
        }
        
        )
    }

    render() {
        return (
            <View style={{flex:1, marginTop:10, marginBottom: 20}}
            refreshing={this.state.refreshing}
                onRefresh={this.handelRefresh}>
                <DataScreen navigation={this.props.navigation}/>
                <TouchableHighlight style={styles.buttonAdd}
                    onPress={() => {this.props.navigation.navigate('AddRe')}}>
                    <Image source={require('../../assets/add.png')}
                    style={{width: 32, height: 32}}/>
                </TouchableHighlight>
            </View>
            
        );
   }
}

const TabNavigator = createBottomTabNavigator({
    Home: FeedScreen,
    Profile: ProfileScreen,
    Search:SearchScreen,
  });
const TabContainer = createAppContainer(TabNavigator);  

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
    }
});