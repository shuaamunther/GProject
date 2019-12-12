import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity,
    ImageBackground, ScrollView, TouchableHighlight, error
} from 'react-native'
import {StackActions, NavigationActions} from 'react-navigation';
import {Card, Button, List, ListItem} from 'react-native-elements';
import * as firebase from 'firebase';
import Modal from "react-native-modal";
import ModalWrapper from 'react-native-modal-wrapper';
import { FlatList } from 'react-native-gesture-handler';
export default class FollowersScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {following: [],
                      followingsnumber: '',
                       followersnumber: [],
                       followers:[], 
                       posts: '',
                       visibleModalfollowers: null,
                       visibleModalfollowing: null,
                       followersname:[],
                       followingname:[]
                    }
    }

    componentWillMount(){
        this.numbers();
        let user_id=this.props.user_id 
        }
    
        numbers(){
            let user_id=this.props.user_id
            let followers=[]
            let followersname=[]
            let followingname=[]
            let following=[]
            let posts=[]
            try {
                firebase.database().ref().child('users/'+user_id+'/followers').on("value", function (snapshot) {
                    snapshot.forEach(function (item) {
                        followers.push(item.val())
                        firebase.database().ref('users/').child(item.val()).on("value", function (name){
                            let username=name.child('fullname').val()
                            followersname.push({username:username,
                                                userd: name.key})
                    this.setState({followersnumber:followers.length,followers:followers,followersname:followersname})
                }.bind(this))
                    }.bind(this))
                }.bind(this))
            }
            catch(error){
              console.log(error)
            }
            try{
                firebase.database().ref().child('users/'+user_id+'/follwing').on("value", function (snapshot) {
                    snapshot.forEach(function (item) {
                        following.push(item.val()) 
                        firebase.database().ref('users/').child(item.val()).on("value", function (name){
                            let username=name.child('fullname').val()
                            followingname.push({username:username,
                                                userd: name.key})
                   
                    this.setState({followingsnumber:following.length,following:following,followingname:followingname})
                }.bind(this))
                   }.bind(this))
                }.bind(this))
            }
            catch(error){
              console.log(error)
            }
            try{
                firebase.database().ref().child('recipes').orderByChild('user_id').equalTo(user_id).on("value", function (snapshot) {
                    snapshot.forEach(function (item) {
                            posts.push({user_id: item.val().user_id })
                        })
                    this.setState({posts: posts.length })
                }.bind(this));
    
            }
            catch(error){
              console.log(error)
            }
        }

    render(){
        const {navigation} = this.props;
        let followingname = String(navigation.getParam('followingname', ""))
        console.log(followingname)
return(
                    <View >
                    <FlatList
                        data={this.props.followingname}
                        renderItem={({item}) => (
                            <ListItem onPress={() => {
                                this.props.navigation.navigate('Profile', {user_id: `${item.userd}`})
                            }}
                                      roundAvatar
                                      title={`${item.username} `}
                                      disabled={this.state.isLoading}
                                      ItemSeparatorComponent={this.renderSeparator}
                                      leftAvatar={{source: require('../../../assets/logouser.png')}}
                                      rightAvatar={{source: require('../../../assets/left.png')}}
                            />
                        )}
                    /> 
                    </View>
)
    }
}