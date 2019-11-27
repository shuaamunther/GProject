import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity,
    ImageBackground, ScrollView, TouchableHighlight,error
} from 'react-native'
import {StackActions, NavigationActions} from 'react-navigation';
import {Card, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import Modal from "react-native-modal";
import CardListScreen from "./component/CardListScreen";
import ModalWrapper from 'react-native-modal-wrapper';


class HeaderImageView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: null,
            followers:'',
            followeing:'',
        }
    }

    openModal = () => {
        this.setState({ visibleModal: 'bottom'});
    };

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

    addFollowing(user_id){
      /* let iduser=firebase.auth().currentUser.uid
        let follower=['firebase.auth().currentUser.uid']
        console.log('hi')
        let users = []
        firebase.database().ref().child('users').orderByChild('uid').startAt(user_id).on("value", function (snapshot) {
            snapshot.forEach(function (item) 
                   // let userName = user.child('fullname').val();
                    .set({
                        followers:firebase.auth().currentUser.uid
                    })
                )
            this.setState({
                users:users
            })
        }.bind(this))*/
    };

    render() {
        return (
            <View>
                <View style={[styles.headerUserView, styles.row]}>
                    <ImageBackground source={require('../../assets/logo2.png')} style={{width: '100%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={styles.avatar} source={require('../../assets/logo22.png')}/>
                            <Text style={[styles.name,{color:'black'}]}>{this.props.username}</Text>
                            <TouchableHighlight
                                style={this.props.isSameUser == true ? {display: 'none'} : {display: 'flex'}}
                                onPress={() => {this.addFollowing()}}>
                                <View style={[styles.buttonFollow]}>
                                    <Image source={require('../../assets/add.png')}
                                           style={{width: 18, height: 18}}/>
                                    <Text style={{marginLeft: 8, marginRight: 8, color: "#fff", fontSize: 16}}>Follow</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{position: 'absolute', top:20, right:20}}>
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
                        <Button title="Edit Profile" buttonStyle={{ backgroundColor:'#00b5ec',borderRadius: 30, }} containerStyle={{marginTop: 10, marginBottom: 10}}/>
                        <Button title="Search" buttonStyle={{ backgroundColor:'#00b5ec',borderRadius: 30, }} containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {this.props.navigation.navigate('Search')}}/>
                        <Button title="Logout" buttonStyle={{ backgroundColor:'#d9534f',borderRadius: 30, }} containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {this.logout()}}/>
                        <View style={{height: 1, backgroundColor:'#ccc', marginTop: 20, marginBottom: 2}}></View>
                        <Button title="Close" buttonStyle={{ backgroundColor:'#8a8a8a' ,borderRadius: 30,}} onPress={() => this.setState({visibleModal: null})} containerStyle={{marginTop: 10, marginBottom: 10}}/>
                    </View>
                </Modal>
            </View>
        )
    }
}

class Following extends React.Component {
    constructor(props) {
        super(props)
        this.state = {following: 100, followers: 240, posts: 45}
    }
        render() {
        return (
            <View style={styles.headerFollowing}>
                <TouchableOpacity>
                    <Text  style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.following}</Text>
                    <Text style={styles.followingTitle}>Following</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text  style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.followers}</Text>
                    <Text style={styles.followingTitle}>Followers</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text  style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.posts}</Text>
                    <Text style={styles.followingTitle}>Posts</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            recipe: [],
            myRecipe: []
        }
    }

    segrantClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    componentDidMount= () => {
        this.showMyRecipe(this.props.user_id);
        this.showData()
    }

    showMyRecipe(userId) {
        let myRecipe = []
        try{
        firebase.database().ref().child('recipes').orderByChild('user_id').equalTo(userId).on("value", function (snapshot) {
            snapshot.forEach(function (item) {
                firebase.database().ref('/users/' + item.val().user_id).on('value', function (user) {
                    let userName = user.child('fullname').val();
                    myRecipe.push({
                        title: item.val().title,
                        type: item.val().type,
                        rate: item.val().rate,
                        imagesource:item.val().imagesource,
                        id: item.key,
                        userName: userName,
                        user_id: item.val().user_id
                    })
                })
            })

            this.setState({
                myRecipe: myRecipe
            })

        }.bind(this));
    }
    catch(error){
        console.log(error)

    }
    }
    showData() {
        let recipe = []
        firebase.database().ref('/recipes').on('value', function (snapshot) {
            snapshot.forEach(function (item) {
                firebase.database().ref('/users/' + item.val().user_id).on('value', function (user) {
                    let userName = user.child('fullname').val();
                    recipe.push({
                        title: item.val().title,
                        type: item.val().type,
                        rate: item.val().rate,
                        id: item.key,
                        userName: userName,
                        user_id: item.val().user_id
                    })
                })
            })

            this.setState({
                recipe: recipe
            })

        }.bind(this));
    }

    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <CardListScreen recipe={this.state.myRecipe} navigation={this.props.navigation}/>
                </View>
            )
        }
        if (this.state.activeIndex == 1) {
            return (
                <View>
                    <Text>Reviews</Text>
                </View>
            )
        }
        if (this.state.activeIndex == 2) {
            return (
                <View>
                    <Text>Saved</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.previewContainer}>
                <View style={styles.Preview}>
                    <TouchableOpacity
                        style={this.state.activeIndex == 0 ? {borderBottomWidth: 1, borderBottomColor: '#156a95'} : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(0)} active={this.state.activeIndex == 0}>
                        <Text  style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 0 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Posts
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 1 ? {borderBottomWidth: 1, borderBottomColor: '#156a95'} : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(1)} active={this.state.activeIndex == 1}>
                        <Text  style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 1 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Review
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 2 ? {borderBottomWidth: 1, borderBottomColor: '#156a95'} : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(2)} active={this.state.activeIndex == 2}>
                        <Text  style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 2 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Saved
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderSection()}
            </View>
        )
    }
}

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    componentDidMount(){
        const { navigation } = this.props;

        let isSameUser = JSON.stringify(navigation.getParam('isSameUser', false))

        let userId = String(navigation.getParam('user_id', ""))

        firebase.database().ref().child('users').orderByKey().equalTo(userId).on("value", function(snapshot) {
            if(snapshot.val()) {
                let userData = snapshot.val()[userId]
                userData['id'] = firebase.auth().currentUser.uid
                this.setState({username: userData['fullname']})
            }
        }.bind(this));
    }

    render() {
        const { navigation } = this.props;
        let userId = String(navigation.getParam('user_id', ""))
        let isSameUser = firebase.auth().currentUser.uid == userId
        return (
            <ScrollView>
            <View style={{marginBottom: 20}}>
                <HeaderImageView navigation={navigation} username={this.state.username} isSameUser={isSameUser}/>
                <Following />
                <Preview user_id={userId}/>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    headerUserView: {
        height: 320,
        backgroundColor: 'red'
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
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 30,
        borderColor:"#00b5ec",
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        marginLeft: 20,
        marginRight: 20,
        top: -30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    followingTitle: {
        fontSize: 16,
        color: "#7c8191",
        fontWeight: '600',
        textAlign: 'center'
    },
    followingTitleForNumbers: {
        fontWeight: 'bold',
    },
    previewContainer: {
        paddingTop: 5,
    },
    Preview: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderTopColor: '#eae5e5',
        borderBottomWidth: 1,
        borderBottomColor: '#eae5e5',
        paddingBottom: 10,
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
        borderColor: "#00b5ec",
        marginBottom: 10
    },
    editButton: {
        width: 30,
        height: 32,
        marginLeft: 200,
    },
    name: {
        fontSize: 22,
        color: 'black',
        fontWeight: '800',
        textTransform: 'capitalize',
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
      buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
        backgroundColor: '#00BFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    NextButton: {
        backgroundColor: "#00b5ec",
        width: 100,
        borderRadius: 30,
        marginTop: 50,
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
    },
    buttonFollow: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        padding: 8,
        borderRadius: 5
    }
});