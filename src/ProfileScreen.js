import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity, TabView,
    TabBar,
    SceneMap,
    NavigationState,
    SceneRendererProps,
    Icon,
    Dimensions,
} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Card, Button} from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import * as Constants from "./Constants";

class HeaderImageView extends React.Component {

    render() {
        return (
            <View style={styles.row}>
                <View style={styles.headerUser}>
                    <Image style={styles.avatar} source={require('../assets/shuaa.png')}/>
                    <Text style={styles.name}>{this.props.username}</Text>
                    <Text style={styles.userInfo}>Student </Text>
                </View>
                <View style={styles.headerEdit}>
                    <TouchableOpacity>
                        <Image style={styles.editButton}
                               source={require('../assets/edit.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class Following extends React.Component {
    constructor(props) {
        super(props)
        this.state = {following: 100}
    }

    render() {
        return (
            <View style={styles.headerFollowing}>
                <TouchableOpacity>
                    <Text style={styles.userInfo}>{this.state.following} Following</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.userInfo}>{this.state.following} Followers</Text>
                </TouchableOpacity>
            </View>
        )
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
                <View>
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

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentDidMount(){
        this.getUserData()
    }

    getUserData = async () => {
        try {
            const value = await AsyncStorage.getItem(Constants.USER_DATA)
            if(value !== null) {
                let userData  = JSON.parse(value)
                this.setState({username: userData['fullname']})
            }
        } catch(e) {
            console.error('getUserData : ', e.message)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderImageView username={this.state.username}/>
                <Following/>
                <Preview/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight: 10,
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
        paddingTop: 20,
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