import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity, TabView,
    TextInput,
    ScrollView,
    FlatList,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'
import CardListScreen from './component/CardListScreen';
import * as firebase from 'firebase';
import {StackActions, NavigationActions, createAppContainer} from 'react-navigation';
import { Card, Button,List, ListItem } from 'react-native-elements';
import Modal from "react-native-modal";

class HeaderUserView extends React.Component {
    openModal = () => {
        this.setState({ visibleModal: 'bottom'});
    };
    constructor(props) {
        super(props)

        this.state = {
            visibleModal: null,
            
        }
    }
    render() {
        return (
            <View>
            <View style={{position: 'absolute', top:8 ,marginLeft:5,direction:'row'}}>
            <TouchableOpacity onPress={() => this.openModal}>
                    <Image source={require('../../assets/menu.png')}
                    style={{width: 28, height: 28}}/>
                </TouchableOpacity>
                <Text style={{marginLeft:50,marginTop:-25,fontSize:20}}>Search</Text>
            </View>
            <Modal
                animationType="slide"
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

        )
    }
}

export default class SearchScreen extends React.Component {
    static navigationOptions ={
        header:null
       };
    constructor(props) {
        super(props)

        this.state = {
            Search: '',
            UserSearch: '',
            FilterSearch: '',
            recipe: [],
            users:[],
            source:'',
            visibleModal: null,
        }
    }

    updateSearch = (search) => {
        this.setState({search});
        let recipe = []
        firebase.database().ref().child('recipes').orderByChild('title').startAt(search).on("value", function (snapshot) {
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
        }.bind(this))
    };

   

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          >
              <Image source={require('../../assets/logouser.png')}/>
              </View>
          
        );
      };
    componentWillMount(){
        this.updateSearch();
            this.props.openModal
            
    }
    updateSearch2 = (UserSearch) => {
        this.setState({UserSearch});
        
        let users = []
        firebase.database().ref().child('users').orderByChild('fullname').startAt(UserSearch).on("value", function (snapshot) {
            snapshot.forEach(function (item) {
                   // let userName = user.child('fullname').val();
                    users.push({
                        fullname: item.val().fullname,
                        user_id:item.key,
                    })
                })
            this.setState({
                users:users
            })
        }.bind(this))
    };
    
    segrantClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }
    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <ScrollView >
                      <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={require('../../assets/search.png')}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Search..."
                                   autoCapitalize="none"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(search) => this.updateSearch(search)}
                                   value={this.state.search}
                                   />     
                    </View>
                </View>
                <CardListScreen recipe={this.state.recipe} navigation={this.props.navigation}/>
            </ScrollView>
            )
        }
        if (this.state.activeIndex == 1) {
            return (
                <ScrollView >
                      <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={require('../../assets/search.png')}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Search ..."
                                   autoCapitalize="none"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(UserSearch) => this.updateSearch2(UserSearch)}
                                   value={this.state.UserSearch}
                                   />     
                    </View>
                </View>
                <ActivityIndicator size="large" color="#00b5ec" style={{display: this.state.isLoading ? 'flex' : 'none'}}/>
                 <FlatList 
                          data={this.state.users}
                          renderItem={({ item }) => (
                   <ListItem onPress={() => {this.props.navigation.navigate('Profile', {user_id: `${item.user_id}`})}}
                             roundAvatar
                             title={`${item.fullname} `}
                             disabled={this.state.isLoading}
                             ItemSeparatorComponent={this.renderSeparator}
                             leftAvatar={{ source:  require('../../assets/logouser.png')  }}
                             rightAvatar={{ source:  require('../../assets/left.png')  }}
                   />
                          )}         
               />    
            </ScrollView> 
            )
        }
        if (this.state.activeIndex == 2) {
            return (
                <ScrollView >
                      <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={require('../../assets/search.png')}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Search..."
                                   autoCapitalize="none"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(FilterSearch) => this.updateSearch(FilterSearch)}
                                   value={this.state.FilterSearch}
                                   />     
                    </View>
                </View>
                <CardListScreen recipe={this.state.recipe} navigation={this.props.navigation}/>
            </ScrollView>
            )
        }
    }
    openModal = () => {
        this.setState({ visibleModal: 'bottom'});
    };
   

    render() {
   
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
        
        console.log(this.state.users)
        return (
            <ScrollView>   
                <HeaderUserView/>         
                <View style={styles.previewContainer}>
                <View style={styles.Preview}>
                    <TouchableOpacity
                        style={this.state.activeIndex == 0 ? {borderBottomWidth: 1, borderBottomColor: '#156a95'} : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(0)} active={this.state.activeIndex == 0}  >
                        <Text  style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 0 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Recipe Name
                        </Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 1 ? {borderBottomWidth: 1, borderBottomColor: '#156a95'} : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(1)} active={this.state.activeIndex == 1}>
                        <Text  style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 1 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Users
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 2 ? {borderBottomWidth: 1, borderBottomColor: '#156a95'} : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(2)} active={this.state.activeIndex == 2}>
                        <Text  style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 2 ? {color: '#156a95', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Filter Search
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderSection()}
            </View>
            <View style={{position: 'absolute', top:8,marginLeft:4 }}>
                    <TouchableHighlight onPress={this.openModal}>
                        <Image source={require('../../assets/menu.png')}
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
        paddingTop: 50,
        borderTopWidth:2
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