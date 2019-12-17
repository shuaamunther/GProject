import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity, TabView,
    TextInput,
    ScrollView,
    FlatList,
    TouchableHighlight,
    ActivityIndicator,
    CheckBox,
    Switch, KeyboardAvoidingView,
} from 'react-native'
import CardListScreen from './component/CardListScreen';
//import Firebase from 'C:/Project/AwesomeProject/firebase.js'
import * as firebase from 'firebase';
import {StackActions, NavigationActions, createAppContainer} from 'react-navigation';
import {Card, Button, List, ListItem} from 'react-native-elements';
import Modal from "react-native-modal";
import TagInput from 'react-native-tags-input';
import RNPickerSelect from 'react-native-picker-select';
import PushNotification from "react-native-push-notification";


const pickerstyle ={
    width:100,
    marginLeft:50,
}  
  
const mainColor = '#00b5ec';

export default class NotificationScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            Search: '',
            UserSearch: '',
            recipe: [],
            users: [],
            source: '',
            visibleModal: null,
            visibleModal2: null,
            myRecipe:[]
        }
    }

    openModal = () => {
        this.setState({visibleModal: 'bottom'});
    };

    showMyRecipe() {
        let myRecipe = []
        let userd = firebase.auth().currentUser.uid
        console.log('reviews',userd)
        let reviews=[]
        try {
            firebase.database().ref().child('recipes').orderByChild('user_id').equalTo(userd).on("value", function (snapshot) {
                snapshot.forEach(function (item) {
                    let reid=item.child('reviews').val()
                      //console.log('userName',reid)
                      for(let i=0;i<reid.length;i++){
                        {
                            myRecipe.push({
                            rate : reid[i].rate,
                            comment :reid[i].comment,
                            user_name : reid[i].user_name,
                            id: item.key,
                            title:item.val().title,
                            rate : reid[i].rate
                        })
                        }
                    }
                })

                this.setState({
                    myRecipe: myRecipe
                })

            }.bind(this));
        } catch (error) {
            console.log(error)

        }
    }

    componentWillMount() {
        this.showMyRecipe()
        this.props.openModal
        PushNotification.localNotification({
            
            id: '123'
        
        });
        PushNotification.cancelLocalNotifications({id: '123'});
    
    }
     logout = () => {
            Firebase.auth().signOut()
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
    render() {
      console.log('reviews',this.state.myRecipe)
        return (
            <ScrollView>
               
                <View style={{position: 'absolute', top: 8, marginLeft: 4}}>
                    <TouchableHighlight onPress={this.openModal}>
                        <Image source={require('C:/Project/AwesomeProject/assets/menu.png')}
                               style={{width: 28, height: 28}}/>
                    </TouchableHighlight>
                </View>
                
                <View>
                <Text style={{marginTop:50,fontSize:20,marginLeft:5,marginBottom:10}}>Notifications</Text>
                      <FlatList   style={styles.root}
                            data={this.state.myRecipe}
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
                                  <Image style={styles.image} source={require('../../assets/bell.png')}/>
                               </TouchableOpacity>

                               <View style={styles.content}>
                                   <View style={styles.contentHeader}>
                                       <Text  style={styles.name}>{Notification.user_name}</Text>
                                       <Text  kType='primary3 mediumLine'> commented in your </Text>
                                       <Text  style={styles.name}>{Notification.title}</Text>
                                   </View>

                                   <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
                               </View>
                            </View>
                         </View> 
                      </View>
                  );
                }}/>
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
                        <Button title="Search" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Search')
                                }}/>
                        <Button title="Profile" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Profile',{user_id: firebase.auth().currentUser.uid})
                                }}/>
                         <Button title="Notification" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
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
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 7,
    },
    row: {
        flexDirection: 'column',
        marginLeft: 11,
        marginRight: 11,
        marginTop: 7,
        marginBottom: 5,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius: 25,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 11,
        borderBottomColor: '#FFDE03',
        flex: 1,
    },
    inputIcon: {
        width: 25,
        height: 25,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        width: 250,
        borderRadius: 30,
    },
    SearchButton: {
        backgroundColor: 'white',
        marginBottom: 5,
        width: 120,
        borderRadius: 0,
        paddingTop: 0,
        paddingBottom: 0,
        height: 20,
        alignItems: 'center',
    },
    SearchButton2: {
        backgroundColor: 'white',
        marginBottom: 20,
        width: 120,
        borderRadius: 0,
        paddingTop: 0,
        paddingBottom: 0,
        height: 20,
        alignItems: 'center',
    },
    SearchButton3: {
        backgroundColor: 'white',
        marginBottom: 20,
        width: 120,
        borderRadius: 0,
        paddingTop: 0,
        paddingBottom: 0,
        height: 20,
        alignItems: 'center',
    },
    loginText: {
        color: "#00b5ec",
    },
    FilterButton: {
        flexDirection: 'row',
        marginTop: 0,
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: "#00b5ec",
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
        paddingTop: 50,
        borderTopWidth: 2
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
    root: {
        backgroundColor: "#ffffff",
        marginTop:10,
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
        //justifyContent: 'space-between',
        marginBottom: 6
      },
      separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
      },
      image:{
        width:30,
        height:30,
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
