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
import CardScreen from './CardScreen';
//import { TabView, SceneMap } from 'react-native-tab-view';
import { createBottomTabNavigator } from 'react-navigation-tabs';

class LogoTitle extends React.Component {
    render() {
        return (
            <Image source={require('../assets/NavBar.png')}
                   style={{width: 170, height: 50, marginLeft: 5, marginTop: 7}}/>
        );
    }
}

class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0
        }
    }

    segrantClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text>first</Text>
                </View>
            )
        }
        if (this.state.activeIndex == 1) {
            return (
                <View >
                    <Text>this is the 2 section</Text>
                </View>
            )
        }
        if (this.state.activeIndex == 2) {
            return (
                <View>
                    <Text>hello 3</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.previewContainer}>
                <View style={styles.Preview}>
                    <TouchableOpacity onPress={() => this.segrantClicked(0)} active={this.state.activeIndex == 0}>
                        <Image style={[this.state.activeIndex == 0 ? {} : {color: 'grey'}, styles.PreviewIcon]}
                               source={require('../assets/feed.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.segrantClicked(1)} active={this.state.activeIndex == 1}>
                        <Image style={[this.state.activeIndex == 1 ? {} : {color: 'grey'}, styles.PreviewIcon]}
                               source={require('../assets/rev.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.segrantClicked(2)} active={this.state.activeIndex == 2}>
                        <Image style={[this.state.activeIndex == 2 ? {} : {color: 'grey'}, styles.PreviewIcon]}
                               source={require('../assets/save.png')}/>
                    </TouchableOpacity>
                </View>
                {this.renderSection()}
            </View>
        )
    }
}

export default class UsersScreen extends React.Component {
    static navigationOptions = {
        headerTitle: () => <LogoTitle/>,
        headerRight: () => (
            <TouchableHighlight style={{paddingRight: 16}}
                                onPress={() => alert('prssed')}>
                <Text >User Name</Text>
            </TouchableHighlight>
        ),
    };

        render() {
            return (
                <View style={styles.container} >
                    <CardScreen/>
            </View>
                
           );
   }
    
}

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
});