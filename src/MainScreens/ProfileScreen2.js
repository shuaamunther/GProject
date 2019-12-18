import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity,
    ImageBackground, ScrollView, TouchableHighlight, error
} from 'react-native'
import {StackActions, NavigationActions} from 'react-navigation';
import {Card, Button, List, ListItem,Rating} from 'react-native-elements';
import * as firebase from 'firebase';
import Modal from "react-native-modal";
import CardListScreen from "./component/CardListScreen";
import ModalWrapper from 'react-native-modal-wrapper';
import { FlatList } from 'react-native-gesture-handler';

class HeaderImageView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: null,
            followers: '',
            followeing: '',
        }
    }

    openModal = () => {
        this.setState({visibleModal: 'bottom'});
    };

    logout = () => {
        firebase.auth().signOut()
            .then(function () {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Login'})],
                });
                this.props.navigation.dispatch(resetAction);
            }.bind(this))
            .catch(function (error) {
                console.log("logout failed: ", error)
            });
    }

    componentDidMount = () => {
       let user_id=this.props.user_id
    }

    addFollowing() {
        let Userid = firebase.auth().currentUser.uid
        let user_id=this.props.user_id
        let flag
        let id
        try
         {
            firebase.database().ref().child('users/'+Userid+'/follwing').on("value", function (snapshot) {
                snapshot.forEach(function (item) {
                    id=item.val()
                    if(id == user_id)
                    {flag=true}
                   console.log('key',id)
                   console.log('result',flag)
            })
        }) 
            if(flag==true)
            {
                 alert('you are following him already')
            }
            else {
                firebase.database().ref().child('users/'+Userid+'/follwing').push(user_id)
                firebase.database().ref().child('users/'+user_id+'/followers').push(Userid)
                alert('you followed this user successfully')
            }
        }
        catch(error){
          console.log(error)
        }
    };

    render() {
        return (
            <View>
                <View style={[styles.headerUserView, styles.row]}>
                    <ImageBackground source={require('../../assets/logo2.png')} style={{width: '100%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={styles.avatar} source={require('../../assets/logo22.png')}/>
                            <Text style={ {color: 'black',fontSize:25}}>{this.props.username}</Text>
                            <TouchableHighlight
                                style={this.props.isSameUser == true ? {display: 'none'} : {display: 'flex'}}
                                onPress={() => {
                                    this.addFollowing()
                                }}>
                                <View style={[styles.buttonFollow]}>
                                    <Image source={require('../../assets/add.png')}
                                           style={{width: 18, height: 18}}/>
                                    <Text style={{
                                        marginLeft: 8,
                                        marginRight: 8,
                                        color: "#fff",
                                        fontSize: 16}}>Follow</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{position: 'absolute', top: 20, right: 20}}>
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
                        <View style={{flexDirection: 'row'}}>
                            <Image
                                source={require('../../assets/logouser.png')}
                                style={{width: 100, height: 100, borderRadius: 32 / 2}}
                            />
                            <Text style={{fontSize: 20, marginLeft: 12, marginTop: 45}}></Text>
                        </View>
                        <Button title="Home" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Following')
                                }}/>
                        <Button title="Explore" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Main')
                                }}/>
                                
                        <Button title="Edit Profile" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10}}/>
                        <Button title="Search" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Search')
                                }}/>
                        <Button title="Profile" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Profile')
                                }}/>
                        <Button title="Notification" buttonStyle={{backgroundColor: '#d9534f', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Notification')
                                }}/>          
                        <Button title="Logout" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.logout()
                                }}/>
                        <View style={{height: 1, backgroundColor: '#ccc', marginTop: 20, marginBottom: 2}}></View>
                        <Button title="Close" buttonStyle={{backgroundColor: '#8a8a8a', borderRadius: 30,}}
                                onPress={() => this.setState({visibleModal: null})}
                                containerStyle={{marginTop: 10, marginBottom: 10}}/>
                    </View>
                </Modal>
            </View>
        )
    }
}

class Following extends React.Component {
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

    openModal1 = () => {
        this.setState({visibleModalfollowers: 'bottom'});
    };

    openModal2 = () => {
        this.setState({visibleModalfollowing: 'bottom'});
    };

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



    render() {
        console.log('result',this.state.followingname)
        return (
            <View style={styles.headerFollowing}>
                <TouchableOpacity onPress={this.openModal2}>
                    <Text style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.followingsnumber}</Text>
                    <Text style={styles.followingTitle}>Following</Text>
                </TouchableOpacity>
                <Modal
                    navigation={this.props.navigation}
                    isVisible={this.state.visibleModalfollowing === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModalfollowing: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:20}}>Following</Text>
                        <TouchableOpacity onPress={() => this.setState({visibleModalfollowing: null})}>
                        <Image source={require('../../assets/close.png')}
                               style={{width: 25, height: 25 ,marginLeft:250}}/>
                        </TouchableOpacity>
                      </View>
                    <FlatList
                        data={this.state.followingname}
                        renderItem={({item}) => (
                            <ListItem onPress={() => {
                                this.props.navigation.navigate('Profile', {user_id: `${item.userd}`})
                            }}
                                      roundAvatar
                                      title={`${item.username} `}
                                      disabled={this.state.isLoading}
                                      ItemSeparatorComponent={this.renderSeparator}
                                      leftAvatar={{source: require('../../assets/logouser.png')}}
                                      rightAvatar={{source: require('../../assets/left.png')}}
                            />
                        )}
                    /> 
                    </View>
                </Modal>

                <TouchableOpacity onPress={this.openModal1}>
                    <Text style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.followersnumber}</Text>
                    <Text style={styles.followingTitle}>Followers</Text>
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.visibleModalfollowers === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModalfollowers: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:20}}>Followers</Text>
                        <TouchableOpacity onPress={() => this.setState({visibleModalfollowers: null})}>
                        <Image source={require('../../assets/close.png')}
                               style={{width: 25, height: 25 ,marginLeft:250}}/>
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        data={this.state.followersname}
                        renderItem={({item}) => (
                            <ListItem   onPress={() => {
                                this.props.navigation.navigate('Profile', {user_id: `${item.userd}`})
                            }}
                                      roundAvatar
                                      title={`${item.username} `}
                                      disabled={this.state.isLoading}
                                      ItemSeparatorComponent={this.renderSeparator}
                                      leftAvatar={{source: require('../../assets/logouser.png')}}
                                      rightAvatar={{source: require('../../assets/left.png')}}
                            />
                        )}
                    /> 
                    </View>
                </Modal>

                <TouchableOpacity>
                    <Text style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.posts}</Text>
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
            myRecipe: [],
            savedrecipe:[],
            saved_recipe:[],
            review_recipe:[]
        }
    }

    segrantClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    componentDidMount = () => {
        this.showMyRecipe(this.props.user_id);
        this.showData()
        this.savedData()
        this.reviewData()
    }

    

    reviewData() {
        let recipe = []
        let ids
        let userid
        let Userid = this.props.user_id
        try{
        firebase.database().ref('/recipes').orderByChild('reviews').on('value', function (snapshot) {
            snapshot.forEach(function (item) {
                let reid=item.child('reviews').val()
                for(let i=0;i<reid.length;i++){
                    userid=reid[i].user_id
                    if(userid==Userid)
                    {
                      recipe.push({
                        rate : reid[i].rate,
                        comment :reid[i].comment,
                        user_name : reid[i].user_name,
                        user_id: userid,
                        id: item.key,
                        title: reid[i].title
                    })
                    }
                }
              
        })
        console.log('rev',recipe)
            this.setState({
                review_recipe: recipe
            })
        }.bind(this));
    }
    catch(error){
        console.log(error)
    }
    }

    showMyRecipe(userId) {
        let myRecipe = []
        try {
            firebase.database().ref().child('recipes').orderByChild('user_id').equalTo(userId).on("value", function (snapshot) {
                snapshot.forEach(function (item) {
                    firebase.database().ref('/users/' + item.val().user_id).on('value', function (user) {
                        let userName = user.child('fullname').val();
                      //  console.log('userName',userName)
                        myRecipe.push({
                            title: item.val().title,
                            type: item.val().type,
                            rate: item.val().rate,
                            imagesource: item.val().imagesource,
                            id: item.key,
                            avatarSource:item.val().avatarSource,
                            userName: userName,
                            user_id: item.val().user_id
                        })
                    })
                })

                this.setState({
                    myRecipe: myRecipe
                })

            }.bind(this));
        } catch (error) {
            console.log(error)

        }
    }

    showData() {
        let recipe = []
        firebase.database().ref('/recipes').on('value', function (snapshot) {
            snapshot.forEach(function (item) {
                firebase.database().ref('/users/' + item.val().user_id).on('value', function (user) {
                    let userName = user.child('fullname').val();
                    //console.log('userName',userName)
                    recipe.push({
                        title: item.val().title,
                        type: item.val().type,
                        rate: item.val().rate,
                        id: item.key,
                        userName: userName,
                        avatarSource:item.val().avatarSource,
                        user_id: item.val().user_id
                    })
                })
            })
            this.setState({
                recipe: recipe
            })
        }.bind(this));
    }

    savedData() {
        let savedrecipe = []
        let Userid = this.props.user_id
      //  let iddd=-'Ltp4EkGUQf0O4CO_St_'
        let ref =firebase.database().ref('/users/')
        let userName=[]
        firebase.database().ref('/users/'+Userid+'/saved_recipe').on('value', function (snapshot) {
            snapshot.forEach(function (item) {
                firebase.database().ref('recipes/'+item.val()).on('value', function (user) {
                    firebase.database().ref('/users/'+user.val().user_id).on('value', function (e) {
                    savedrecipe.push({
                        title: user.val().title,
                        type: user.val().type,
                        rate: user.val().rate,
                        id: user.key,
                        userName:e.val().fullname,
                        avatarSource:user.child('avatarSource').val(),
                        user_id: user.val().user_id
                    })
                })
            })
            })
            this.setState({
                savedrecipe: savedrecipe
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
            return (       <View>
                <FlatList   style={styles.root}
                      data={this.state.review_recipe}
                      extraData={this.state}
                      ItemSeparatorComponent={() => {
                      return (
                        <View style={styles.separator}/>
                      )
                      }}

          keyExtractor={(item)=>{
            return item.id;
          }}

          renderItem={(item) => {
            const Notification = item.item;

            return(
                <View>
                   <View style={{marginBottom:20}}>
                      <View style={styles.container}>
                         <TouchableOpacity onPress={() => {this.props.navigation.navigate('Recipe', {id: Notification.id})}}>
                            <Image style={styles.image} source={require('../../assets/comment.png')}/>
                         </TouchableOpacity>

                         <View style={styles.content}>
                             <View style={styles.contentHeader}>
                                 <Text  > {Notification.user_name} rated {Notification.title} </Text>
                                 <Rating style={styles.time}
                                    readonly
                                    type="star"
                                    fractions={1}
                                    startingValue={Notification.rate}
                                    imageSize={20}
                                    style={{ paddingVertical: 10 }}
                                 />
                             </View>

                             <Text rkType='primary3 mediumLine'>and commented {Notification.comment}</Text>
                         </View>
                      </View>
                   </View> 
                </View>
            );
          }}/>
          </View>
            )
        }
        if (this.state.activeIndex == 2) {
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <CardListScreen recipe={this.state.savedrecipe} navigation={this.props.navigation}/>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.previewContainer}>
                <View style={styles.Preview}>
                    <TouchableOpacity
                        style={this.state.activeIndex == 0 ? {
                            borderBottomWidth: 1,
                            borderBottomColor: '#156a95'
                        } : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(0)} active={this.state.activeIndex == 0}>
                        <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 0 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Posts
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 1 ? {
                            borderBottomWidth: 1,
                            borderBottomColor: '#156a95'
                        } : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(1)} active={this.state.activeIndex == 1}>
                        <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 1 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Review
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 2 ? {
                            borderBottomWidth: 1,
                            borderBottomColor: '#156a95'
                        } : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(2)} active={this.state.activeIndex == 2}>
                        <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
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

export default class ProfileScreen2 extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    componentDidMount() {
        const {navigation} = this.props;

        let isSameUser = JSON.stringify(navigation.getParam('isSameUser', false))

        let userId = String(navigation.getParam('user_id', ""))

        firebase.database().ref().child('users').orderByKey().equalTo(userId).on("value", function (snapshot) {
            if (snapshot.val()) {
                let userData = snapshot.val()[userId]
                userData['id'] = firebase.auth().currentUser.uid
                this.setState({username: userData['fullname']})
            }
        }.bind(this));
    }

    render() {
        const {navigation} = this.props;
        let userId = String(navigation.getParam('user_id', ""))
        let isSameUser = firebase.auth().currentUser.uid == userId
        return (
            <ScrollView>
                <View style={{marginBottom: 20}}>
                    <HeaderImageView navigation={navigation} username={this.state.username} user_id={userId} isSameUser={isSameUser}/>
                    <Following navigation={navigation} user_id={userId}/>
                    <Preview navigation={navigation} user_id={userId}/>
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
        borderColor: "#00b5ec",
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
    },
    container: {
        //paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
      },
      content: {
        marginLeft: 16,
        flex: 1,
      },
      contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
      },
      separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
      },
      image:{
        width:45,
        height:45,
        borderRadius:20,
        marginLeft:10
      },
      time:{
        fontSize:11,
        color:"#808080",
      },
      name:{
        fontSize:16,
        fontWeight:"bold",
      },
});
