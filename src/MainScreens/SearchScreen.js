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

const placeholder = {
    label: ' Select cruisine ',
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
        return (
            <View>
                <View style={{position: 'absolute', top: 8, marginLeft: 5, direction: 'row'}}>
                    <TouchableOpacity onPress={() => this.openModal}>
                        <Image source={require('C:/Project/AwesomeProject/assets/menu.png')}
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
                                    this.props.navigation.navigate('Following')
                                }}/>
                        <Button title="Explore" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.props.navigation.navigate('Main')
                                }}/>       
                        <Button title="Logout" buttonStyle={{backgroundColor: '#d9534f', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10,}}
                                onPress={() => {
                                    this.logout
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
            recipe: [],
            users: [],
            source: '',
            visibleModal: null,
            visibleModal2: null,
            ingredients_tags: {
                tag: '',
                tagsArray: []
              },
              allergies_tags: {
                tag: '',
                tagsArray: []
              },
             dislikes_tags: {
                tag: '',
                tagsArray: []
              },
            tagsColor: mainColor,
            tagsText: '#fff',
            use_user_preferences: false,
            update_user_preferences: false,
            cruisine : '',
            type : '',
            difficulty : '',
            veg : false,
            diet : false,
            filtered_recipe : []
        }
    }

    updateTagState_ingredients = (state) => {
        this.setState({ ...this.state, ingredients_tags: state})
      };
      updateTagState_allergies = (state) => {
        this.setState({ ...this.state, allergies_tags: state})
      };
      updateTagState_dislikes = (state) => {
        this.setState({ ...this.state, dislikes_tags: state})
      };

    updateSearch = (search) => {
        this.setState({ ...this.state,search});
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
            this.setState({ ...this.state,
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
                {/* <Image source={require('../../assets/logouser.png')}/> */}
            </View>

        );
    };

    componentWillMount() {
        
        this.props.openModal
        this.props.openModal2
    }

    updateSearch2 = (UserSearch) => {
        this.setState({ ...this.state,UserSearch});

        let users = []
        firebase.database().ref().child('users').orderByChild('fullname').startAt(UserSearch).on("value", function (snapshot) {
            snapshot.forEach(function (item) {
                // let userName = user.child('fullname').val();
                users.push({
                    fullname: item.val().fullname,
                    user_id: item.key,
                })
            })
            this.setState({ ...this.state,
                users: users
            })
        }.bind(this))
    };

    segrantClicked = (index) => {
        this.setState({ ...this.state,
            activeIndex: index
        })
    }

    _handleUserPreference = () =>
    this.setState({ ...this.state, use_user_preferences: !this.state.use_user_preferences, update_user_preferences: false  });
    
    _handleEditUserPreference = () =>
    this.setState({ ...this.state, use_user_preferences: false, update_user_preferences:!this.state.update_user_preferences  });

    
    filterSearch = () =>{
        this.setState({...this.state,filtered_recipe: []})
        let filters = {}
        if(this.state.cruisine != '' && this.state.cruisine != null){
            filters ={...filters, cruisine : this.state.cruisine}
        }
        if(this.state.type != '' && this.state.cruisine != null){
            filters ={...filters, type : this.state.type}
        }
        if(this.state.difficulty != '' && this.state.difficulty != null){
            filters ={...filters, difficulty : this.state.difficulty}
        }
        if(this.state.ingredients_tags.tagsArray.length != 0){
            filters ={...filters, ingredients : this.state.ingredients_tags.tagsArray}
        }
        if(this.state.use_user_preferences){
            //get from db and add to filters
        }
        else if(this.state.update_user_preferences){
            if(this.state.diet){
            filters ={...filters, diet : true}
            }
            if(this.state.veg){
            filters ={...filters, veg : true}
            }
            if(this.state.allergies_tags.tagsArray.length != 0){
              filters ={...filters, allergies : this.state.allergies_tags.tagsArray}
            }
            if(this.state.dislikes_tags.tagsArray.length != 0){
            filters ={...filters, dislikes : this.state.dislikes_tags.tagsArray}
            }
        }
        if(Object.keys(filters).length === 0){
            alert('no filters added')
            return
        }
        //search the db
        function intersection(setA, setB) {
            var _intersection = new Set();
            for (var elem of setB) {
                if (setA.has(elem)) {
                    _intersection.add(elem);
                }
            }
            return _intersection;
        } 
        function f_setState(state){
          this.setState({...this.state,filtered_recipe: state})
          console.log(this.state.filtered_recipe)
        }
        f_setState = f_setState.bind(this);
        let filtered_result = []
        firebase.database().ref('recipes').orderByChild('createdAt').on("value", function (snapshot) {
         let meat = new Set (['chicken','beef','lamb','turkey','pork','ham','fish','lobster','crab','meat'])
         snapshot.forEach(item => {
            if(filters.hasOwnProperty('ingredients')){
                let recipe_ingredients = new Set (item.val().ingredients) ;
                let a = intersection(recipe_ingredients, new Set(filters.ingredients))
                let b = new Set(filters.ingredients)
                if(!(a.size == b.size && [...a].every(value => b.has(value)))){
                    return
                }

            }
            if(filters.hasOwnProperty('cruisine')){
                if(item.val().cruisine!=filters.cruisine){
                   return
                }
            }
            if(filters.hasOwnProperty('type')){
                if(item.val().type!=filters.type){
                    return
                 }
            }
            if(filters.hasOwnProperty('difficulty')){
                if(item.val().difficulty!=filters.difficulty){
                    return
                 }
            }
            if(filters.hasOwnProperty('veg')){
                if (intersection(new Set(item.val().ingredients), meat).size != 0){
                    return
               }
            }
            if(filters.hasOwnProperty('allergies')){
                if ( intersection(new Set(item.val().ingredients), new Set(filters.allergies)).size != 0){
                    return
                }
            }
            if(filters.hasOwnProperty('dislikes')){
                if ( intersection(new Set(item.val().ingredients), new Set(filters.dislikes)).size != 0){
                    return
                }
            }
            filtered_result.push({
                id : item.key,
                title : item.val().title,
                calories : item.val().calories,
                difficulty:item.val().difficulty
            })
        })
        
        if(filters.hasOwnProperty('diet')){
            filtered_result.sort(function(a,b){
                return parseInt(a.calories) - parseInt(b.calories);
                })
        }
        f_setState(filtered_result)
        return
        }
        ).bind(this)
        return
    }

    renderSection = () => {
        if (this.state.activeIndex == 0) {
            return (
                <ScrollView>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={require('C:/Project/AwesomeProject/assets/search.png')}/>
                            <TextInput style={styles.inputs}
                                       placeholder="Search..."
                                       autoCapitalize="none"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(search) => this.updateSearch(search)}
                                       value={this.state.search}
                            />
                        </View>
                    </View>
                    <FlatList
                        data={this.state.recipe}
                        renderItem={({item}) => (
                            <ListItem onPress={() => {
                                this.props.navigation.navigate('Recipe', {id: `${item.id}`})
                            }}
                                      roundAvatar
                                      title={`${item.title} `}
                                      disabled={this.state.isLoading}
                                      ItemSeparatorComponent={this.renderSeparator}
                                      leftAvatar={{source: require('../../assets/meal2.png')}}
                                      rightAvatar={{source: require('../../assets/left.png')}}
                            />
                        )}
                    />   
                </ScrollView>
            )
        }
        if (this.state.activeIndex == 1) {
            return (
                <ScrollView>
                    <View style={styles.row}>
                        <View style={styles.inputContainer}>
                            <Image style={styles.inputIcon} source={require('C:/Project/AwesomeProject/assets/search.png')}/>
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
                       <Text style={{marginLeft:5,marginTop:10,fontSize:20,color:'#7c8191',alignContent:'flex-start',flex : 4}}>filter your search </Text>
                       <TouchableHighlight onPress={this.openModal2} style={{alignContent:'flex-end', flex: 1}}>
                          <Image source={require('C:/Project/AwesomeProject/assets/filter.png')}
                                style={{width: 30, height: 30,marginTop:5,marginLeft:15}}/>
                       </TouchableHighlight>
                    </View>
                    <Modal
                    animationType="slide"
                    isVisible={this.state.visibleModal2 === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModal2: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                        <Text style={{marginLeft:5,marginTop:10,fontSize:20,color:'#00b5ec',}}>
                              check all filters you need
                        </Text>
                    <View style={{flexDirection:'row',marginTop:10,alignContent:'center'}}>
                    
                      
                        <TagInput style={{ minWidth: 300,
                                   height: 40,
                                  borderRadius: 20,
                                  borderWidth:1,
                                  borderColor:'#E3F2FD',
                                }}
                           updateState={this.updateTagState_ingredients}
                           placeholder="ingredients..."  
                           onFocus={() => this.setState({ ...this.state,tagsColor: '#fff', tagsText: mainColor})}
                           onBlur={() => this.setState({ ...this.state,tagsColor: mainColor, tagsText: '#fff'})}
                           tags={this.state.ingredients_tags}
                        />
                    </View>
                    
             
                 <View style={{}}>       
                 {/* cruisine */}
                    <RNPickerSelect  placeholder={placeholder}
                     style={pickerSelectStyles} 
                                     onValueChange={(value) =>this.setState( {...this.state, cruisine : value})}
                                     value = {this.state.cruisine}
                                     items={[
                                                { label: 'Fast Food', value: 'fast food' },
                                                { label: 'Arabian', value: 'arabian' },
                                                { label: 'Europe', value: 'europe' },
                                                { label: 'Asian', value: 'asian' },
                                            ]}
                    />
                    {/* type */}
                      <RNPickerSelect  placeholder={placeholder1}
                     style={pickerSelectStyles} 
                                     onValueChange={(value) =>this.setState({...this.state, type : value})}
                                     value = {this.state.type}
                                     items={[   { label: 'Main Dish', value: 'main' },
                                                { label: 'Side Dish', value: 'side' },
                                                { label: 'Desert', value: 'desert' },
                                                { label: 'Soup', value: 'soup' },
                                                { label: 'Drink', value: 'drink' },
                                            ]}
                    />
                    {/* difficulty */}
                      <RNPickerSelect  placeholder={placeholder2}
                     style={pickerSelectStyles} 
                                     onValueChange={(value) =>this.setState({...this.state, difficulty : value})}
                                     value = {this.state.difficulty}
                                     items={[   { label: 'difficult', value: 'difficult' },
                                                { label: 'mid', value: 'mid' },
                                                { label: 'easy', value: 'easy' },
                                            ]}
                    />
                    </View>  

                    <View style={{flexDirection:'row',borderColor:'grey',marginTop:9}}>
                            <Switch
                                  onValueChange={this._handleUserPreference}
                                  value={this.state.use_user_preferences}
                                  trackColor={'#00b5ec'}
                                  trackColor={'grey'}
                           />
                      <Text style={{fontSize:15,marginTop:6}}>use my user prerefrence </Text>
                    </View> 

                    <View style={{flexDirection:'row',borderColor:'#E3F2FD',marginTop:9}}>
                      <Switch
                                  onValueChange={this._handleEditUserPreference}
                                  value={this.state.update_user_preferences}
                                  trackColor={'#00b5ec'}
                                  trackColor={'grey'}
                                  
                           />
                      <Text style={{fontSize:15,marginTop:6}}>Change my preferences</Text>
                    </View >
                     
                    <View style = {this.state.update_user_preferences == false ? {display : 'none'} : 
                    {borderWidth:2,borderColor:'#00b5ec',borderRadius:20,flexDirection:'column',marginTop:3}}>
                           <View style={{flexDirection:'row',justifyContent: 'space-around',}}>
                           <View style={{flexDirection:'row'}}  > 
                           <Switch
                                  onValueChange={(value) => this.setState({ ...this.state,diet : value})}
                                  value={this.state.diet}
                                  trackColor={'#00b5ec'}
                                  trackColor={'grey'}
                           />  
                           <Text style={{fontSize:15,marginTop:6}}>diet </Text>
                           </View>  

                           <View style={{flexDirection:'row'}}  >              
                           <Switch
                                  onValueChange={(value) => this.setState({ ...this.state,veg : value})}
                                  value={this.state.veg}
                                  trackColor={'#00b5ec'}
                                  trackColor={'grey'}
                           />                  
                            <Text style={{fontSize:15,marginTop:6}}>vegetarian </Text> 
                              </View> 
                        </View>
                        <Text style={{fontSize:18,marginTop:6,marginLeft:10}}>allergies</Text>
                        <TagInput style={{ minWidth: 300,
                                   height: 40,
                                  borderRadius: 20,
                                  borderWidth:1,
                                  borderColor:'#E3F2FD',
                                }}
                           updateState={this.updateTagState_allergies}
                           placeholder="allergies..."  
                           onFocus={() => this.setState({ ...this.state,tagsColor: '#fff', tagsText: mainColor})}
                           onBlur={() => this.setState({ ...this.state,tagsColor: mainColor, tagsText: '#fff'})}
                           tags={this.state.allergies_tags}
                        />

                           
                        <Text style={{fontSize:18,marginTop:6,marginLeft:10}}>dislikes</Text>
                        <TagInput style={{ minWidth: 300,
                                   height: 40,
                                  borderRadius: 20,
                                  borderWidth:1,
                                  borderColor:'#E3F2FD',
                                }}
                           updateState={this.updateTagState_dislikes}
                           placeholder="dislikes..."  
                           onFocus={() => this.setState({ ...this.state,tagsColor: '#fff', tagsText: mainColor})}
                           onBlur={() => this.setState({ ...this.state,tagsColor: mainColor, tagsText: '#fff'})}
                           tags={this.state.dislikes_tags}
                        />
                       
                    </View>
                    
                        <View style={{marginTop: 15,flexDirection:'row',marginBottom: 10,alignItems:'center',marginLeft:40}}>
                        <Button title="Search" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 20,}}
                                containerStyle={{width:100 }}
                                onPress={() => {
                                    this.setState({visibleModal2: null})
                                    this.filterSearch()
                                    
                                }}/>
                        <Button title="Reset" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{width:100 ,marginLeft:70 }}
                                onPress={() => {
                                    //get everything back to initial state
                                    this.setState({ ...this.state,ingredients_tags: {
                                        tag: '',
                                        tagsArray: []
                                      },dislikes_tags: {
                                        tag: '',
                                        tagsArray: []
                                      },allergies_tags: {
                                        tag: '',
                                        tagsArray: []
                                      },tagsColor: mainColor,tagsText: '#fff',use_user_preferences: false,
                                    update_user_preferences: false,cruisine: '',type : '',difficulty : '',diet:false, veg:false,
                                   })
                                }
                                }/>
                                </View>

                    </View>
                </Modal>

                 {/* display the results */}
                 
                 
                 <FlatList
                        data={this.state.filtered_recipe}
                        renderItem={({item}) => (
                            <ListItem onPress={() => {
                                this.props.navigation.navigate('Recipe', {id: `${item.id}`})
                            }}
                                      roundAvatar
                                      title={`${item.title} `}
                                      disabled={this.state.isLoading}
                                      ItemSeparatorComponent={this.renderSeparator}
                                      leftAvatar={{source: require('../../assets/meal2.png')}}
                                      rightAvatar={{source: require('../../assets/left.png')}}
                            />
                        )}
                    /> 
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
                        <Image source={require('C:/Project/AwesomeProject/assets/menu.png')}
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
