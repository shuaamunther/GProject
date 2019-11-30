import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity, TabView,
    TextInput,
    ScrollView,
    FlatList,
    TouchableHighlight,
    ActivityIndicator,
    CheckBox,
    Switch
} from 'react-native'
import CardListScreen from './component/CardListScreen';
import * as firebase from 'firebase';
import {StackActions, NavigationActions, createAppContainer} from 'react-navigation';
import {Card, Button, List, ListItem} from 'react-native-elements';
import Modal from "react-native-modal";
import TagInput from 'react-native-tags-input';
import RNPickerSelect from 'react-native-picker-select';

const placeholder = {
    label: ' Select craisine ',
    value: null,
    color: '#00b5ec',
    marginLeft:50,
    minWidth:60,
    icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},

  };

  const placeholder1 = {
    label: ' Select type ',
    value: null,
    color: '#00b5ec',
    marginLeft:50,
    minWidth:60,
    icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
  };

  const placeholder2 = {
    label: ' Select difficulty ',
    value: null,
    color: '#00b5ec',
    marginLeft:50,
    minWidth:60,
    icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
  };

const pickerstyle ={
    width:100,
    marginLeft:50,
}  
  
const mainColor = '#00b5ec';

class HeaderUserView extends React.Component {
    openModal = () => {
        this.setState({visibleModal: 'bottom'});
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
                <View style={{position: 'absolute', top: 8, marginLeft: 5, direction: 'row'}}>
                    <TouchableOpacity onPress={() => this.openModal}>
                        <Image source={require('../../assets/menu.png')}
                               style={{width: 28, height: 28}}/>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 50, marginTop: -25, fontSize: 20}}>Search</Text>
                </View>
                <Modal
                    animationType="slide"
                    isVisible={this.state.visibleModal === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModal: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                        <Button title="Search" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Search')
                                }}/>
                        <Button title="Home" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Main')
                                }}/>
                        <Button title="Logout" buttonStyle={{backgroundColor: '#d9534f', borderRadius: 30,}}
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

export default class SearchScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            Search: '',
            UserSearch: '',
            FilterSearch: '',
            recipe: [],
            users: [],
            source: '',
            visibleModal: null,
            visibleModal2: null,
            tags: {
                tag: '',
                tagsArray: []
              },
            tagsColor: mainColor,
            tagsText: '#fff',
            switchValue: false,
        }
    }

    updateTagState = (state) => {
        this.setState({
          tags: state
        })
      };

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

    componentWillMount() {
        this.updateSearch();
        this.props.openModal
        this.props.openModal2
    }

    updateSearch2 = (UserSearch) => {
        this.setState({UserSearch});

        let users = []
        firebase.database().ref().child('users').orderByChild('fullname').startAt(UserSearch).on("value", function (snapshot) {
            snapshot.forEach(function (item) {
                // let userName = user.child('fullname').val();
                users.push({
                    fullname: item.val().fullname,
                    user_id: item.key,
                })
            })
            this.setState({
                users: users
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
                <ScrollView>
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
                <ScrollView>
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
                    <ActivityIndicator size="large" color="#00b5ec"
                                       style={{display: this.state.isLoading ? 'flex' : 'none'}}/>
                    <FlatList
                        data={this.state.users}
                        renderItem={({item}) => (
                            <ListItem onPress={() => {
                                this.props.navigation.navigate('Profile', {user_id: `${item.user_id}`})
                            }}
                                      roundAvatar
                                      title={`${item.fullname} `}
                                      disabled={this.state.isLoading}
                                      ItemSeparatorComponent={this.renderSeparator}
                                      leftAvatar={{source: require('../../assets/logouser.png')}}
                                      rightAvatar={{source: require('../../assets/left.png')}}
                            />
                        )}
                    />
                </ScrollView>
            )
        }
        if (this.state.activeIndex == 2) {
            return (
                <ScrollView>
                    <View style={{flexDirection:'row'}}>
                       <Text style={{marginLeft:5,marginTop:10,fontSize:20,color:'#7c8191',}}>Press on this button to filter your search </Text>
                       <TouchableHighlight onPress={this.openModal2}>
                          <Image source={require('../../assets/filter.png')}
                                style={{width: 30, height: 30,marginTop:5,marginLeft:15}}/>
                       </TouchableHighlight>
                    </View>
                    <Modal
                    animationType="slide"
                    isVisible={this.state.visibleModal2 === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModal: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                        <Text style={{marginLeft:5,marginTop:10,fontSize:20,color:'#00b5ec',}}>
                              cheak all filter you need
                        </Text>
                    <View style={{flexDirection:'row',marginTop:10,alignContent:'center'}}>
                        
                        <TagInput style={{ minWidth: 300,
                                   height: 40,
                                  // margin: 4,
                                  borderRadius: 20,
                                  borderWidth:1,
                                  borderColor:'#E3F2FD',
                                 //  backgroundColor: '#E3F2FD',
                                 //  marginLeft: 20,
                                 
                                }}
                           updateState={this.updateTagState}
                           placeholder="ingredients..."  
                           onFocus={() => this.setState({tagsColor: '#fff', tagsText: mainColor})}
                           onBlur={() => this.setState({tagsColor: mainColor, tagsText: '#fff'})}
                           tags={this.state.tags}
                        />
                    </View>
             
                 <View style={{}}>       
                    
                    <RNPickerSelect  placeholder={placeholder}
                     style={pickerSelectStyles} 
                                     onValueChange={(value) => console.log(value)}
                                     items={[   { label: 'Football', value: 'football' },
                                                { label: 'Baseball', value: 'baseball' },
                                                { label: 'Hockey', value: 'hockey' },
                                            ]}
                    />
                      <RNPickerSelect  placeholder={placeholder1}
                     style={pickerSelectStyles} 
                                     onValueChange={(value) => console.log(value)}
                                     items={[   { label: 'lunch', value: 'lunch' },
                                                { label: 'brakfast', value: 'brakfast' },
                                                { label: 'sweet', value: 'sweet' },
                                            ]}
                    />
                      <RNPickerSelect  placeholder={placeholder2}
                     style={pickerSelectStyles} 
                                     onValueChange={(value) => console.log(value)}
                                     items={[   { label: 'dificult', value: 'dificult' },
                                                { label: 'mid', value: 'baseball' },
                                                { label: 'easy', value: 'easy' },
                                            ]}
                    />
                    </View>  

                    <View style={{flexDirection:'row',borderColor:'#E3F2FD',marginTop:9}}>
                      <Switch/>
                      <Text style={{fontSize:15,marginTop:6}}>use my user prerefrence </Text>
                    </View> 
                    <View style={{flexDirection:'row',borderColor:'#E3F2FD',marginTop:9}}>
                      <Switch onPress={() => {alert('clicked')}}/>
                      <Text style={{fontSize:15,marginTop:6}}>use my user prerefrence </Text>
                    </View> 
                    
                        <View style={{marginTop: 15,flexDirection:'row',marginBottom: 10,alignItems:'center',marginLeft:40}}>
                        <Button title="Search" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 20,}}
                                containerStyle={{width:100 }}
                                onPress={() => {
                                    alert('saved')
                                }}/>
                        <Button title="Reset" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{width:100 ,marginLeft:70 }}
                                onPress={() => {
                                    alert('reset')
                                }}/>
                                </View>
                        <View style={{height: 1, backgroundColor: '#ccc', marginTop: 20, marginBottom: 2}}></View>
                        <Button title="Close" buttonStyle={{backgroundColor: '#8a8a8a', borderRadius: 30,}}
                                onPress={() => this.setState({visibleModal2: null})}
                                containerStyle={{marginTop: 10, marginBottom: 10}}/>
                    </View>
                </Modal>
                </ScrollView>
            )
        }
    }
    openModal = () => {
        this.setState({visibleModal: 'bottom'});
    };

    openModal2 = () => {
        this.setState({visibleModal2: 'bottom'});
    };

    render() {
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

        console.log(this.state.users)
        return (
            <ScrollView>
                <HeaderUserView/>
                <View style={styles.previewContainer}>
                    <View style={styles.Preview}>
                        <TouchableOpacity
                            style={this.state.activeIndex == 0 ? {
                                borderBottomWidth: 1,
                                borderBottomColor: '#156a95'
                            } : {color: '#7c8191'}}
                            onPress={() => this.segrantClicked(0)} active={this.state.activeIndex == 0}>
                            <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                                this.state.activeIndex == 0 ? {
                                    color: '#156a95',
                                    paddingBottom: 4
                                } : {color: '#7c8191'}]}>
                                Recipe Name
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={this.state.activeIndex == 1 ? {
                                borderBottomWidth: 1,
                                borderBottomColor: '#156a95'
                            } : {color: '#7c8191'}}
                            onPress={() => this.segrantClicked(1)} active={this.state.activeIndex == 1}>
                            <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                                this.state.activeIndex == 1 ? {
                                    color: '#156a95',
                                    paddingBottom: 4
                                } : {color: '#7c8191'}]}>
                                Users
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={this.state.activeIndex == 2 ? {
                                borderBottomWidth: 1,
                                borderBottomColor: '#156a95'
                            } : {color: '#7c8191'}}
                            onPress={() => this.segrantClicked(2)} active={this.state.activeIndex == 2}>
                            <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                                this.state.activeIndex == 2 ? {
                                    color: '#156a95',
                                    paddingBottom: 4
                                } : {color: '#7c8191'}]}>
                                Filter Search
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {this.renderSection()}
                </View>
                <View style={{position: 'absolute', top: 8, marginLeft: 4}}>
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
                        <View style={{flexDirection: 'row'}}>
                            <Image
                                source={require('../../assets/logouser.png')}
                                style={{width: 100, height: 100, borderRadius: 32 / 2}}
                            />
                            <Text style={{fontSize: 20, marginLeft: 12, marginTop: 45}}>Shuaa5</Text>
                        </View>
                        <Button title="Home" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
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
                                    this.props.navigation.navigate('Profile')
                                }}/>
                        <Button title="Logout" buttonStyle={{backgroundColor: '#d9534f', borderRadius: 30,}}
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
