import React, {Component} from "react";
import {View, Text, StyleSheet, ListView, Image, Button, TextInput, KeyboardAvoidingView,} from "react-native";
import {GiftedChat} from 'react-native-gifted-chat'
import * as  firebase from "firebase";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {ListItem, SearchBar} from 'react-native-elements'
//import {db} from './../../db'
let itemsRef = firebase.database().ref('/users/');

var name, uid, email;

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            items: [],
            email: '',
            name: '',
            user: firebase.auth().currentUser.email,
            image: null,
            item: []
        };

        this.user = firebase.auth().currentUser;
        console.log("User:" + this.user.uid);

        const {params} = this.props.navigation.state;
        uid = params.uid;
        name = params.name;
        email = params.email;
        console.log("User:" + uid);

        this.chatRef = this.getRef().child("chat/" + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild("order");
        this.onSend = this.onSend.bind(this);
    }

    //generate ChatId works cause when you are the user sending chat you take user.uid and your friend takes uid
    // when your friend is using the app to send message s/he takes user.uid and you take the uid cause you are the friend

    generateChatId() {
        if (this.user.uid > uid) return $`{this.user.uid}` - $`{uid}`
        return $`{uid}` - $`{this.user.uid}`
    }

    getRef() {
        return firebase.database().ref();
    }

    listenForItems(chatRef) {
        chatRef.on("value", snap => {
            // get children as an array
            var items = [];
            snap.forEach(child => {
                //var name = child.val().uid == this.user.uid ? this.user.name : name1;
                items.push({
                    _id: child.val().createdAt,
                    text: child.val().text,
                    createdAt: new Date(child.val().createdAt),
                    user: {
                        _id: child.val().uid
                        //avatar: avatar
                    }
                });
            });

            this.setState({
                loading: false,
                messages: items
            });
        });
    }

    componentDidMount() {
        this.listenForItems(this.chatRefData);
        itemsRef.on('value', (snapshot) => {
            var aux = [];
            snapshot.forEach((child) => {
                aux.push({
                    name: child.val().fullname,

                    email: child.val().email,

                    uid: child.key
                });
            });
            this.setState({item: aux});
        });
    }

    componentWillUnmount() {
        this.chatRefData.off();
    }

    onSend(messages = []) {
        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            //var message = message[0];
            var now = new Date().getTime();
            var name = this.user.name
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.user.uid,

                order: -1 * now
            });
        });
    }

    Return() {

        this.props.navigation.navigate('ListChat')

    }

    askLKermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.Linking);
    };

    askSMSPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.SMS);
    };


    render() {

        console.log('item')
        console.log(this.state.item)
        var user = this.state.user
        var email = ''
        var image = ''
        var name = ''
        const ar = []
        this.state.item.map(function (items) {

            if (items.email === user) {

                ar.push(items)
            }
        });
        ar.map(function (item, key) {
            if (key == name) name = item.name
            if (key == email) email = item.email
            console.log(name)
            console.log(email)
        })

        return (
            <View style={styles.item}>
                <View>
                    <ListItem
                        leftAvatar={{source: {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT-BwYJuj3yyVST5zpsvuLOLJWk26C9uWSk0vE2HbmTKX38j_Wdw&s'}}}
                        title={name}
                        subtitle={email}/>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend.bind(this)}
                    user={{
                        _id: this.user.uid
                    }}
                />
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        marginRight: 10,
        marginLeft: 10
    },
    item: {
        flex: 1,
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 30,
        paddingTop: 15,
        fontWeight: 'bold',
        fontSize: 40,
        color: '#2b8475',
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 15,
        //color:'#2b8475',
    },
});