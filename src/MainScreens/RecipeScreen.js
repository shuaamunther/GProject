import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity,
    ImageBackground, ScrollView, TouchableHighlight, error, FlatList,KeyboardAvoidingView,TextInput,Alert
} from 'react-native'
import {StackActions, NavigationActions} from 'react-navigation';
import { Rating, Card, Button,ListItem  } from 'react-native-elements';
import * as firebase from 'firebase';
import Modal from "react-native-modal";
import CardListScreen from "./component/CardListScreen";
import DataScreen from "./component/DataScreen"

class HeaderImageView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {visibleModal: null,
                        recipes:'',               
        }
    }

    openModal = () => {
        this.setState({visibleModal: 'bottom'});
    };

    saveRecipe(){
        let Userid = firebase.auth().currentUser.uid
        let recipeId=this.props.id
        var userData={recipeId}
        var id
        let recipes = []
        let flag=false    
        try {
            firebase.database().ref().child('users/'+Userid+'/saved_recipe').on("value", function (snapshot) {
                snapshot.forEach(function (item) {
                    id=item.val()
                    if(id == recipeId)
                    {flag=true}
                  // console.log('key',id)
                   //console.log('result',flag)
            })
        })
       // console.log('resultout',flag)
             if(flag==true)
             {
                alert('This Recipe saved already!')
             }
             else{
                 firebase.database().ref('users/'+Userid).child('/saved_recipe').push(recipeId)
                 alert('saved successfully')
               }
            }
    catch(error){
        console.log(error)
    }
 }
 componentDidMount() {
    const {navigation} = this.props;
    let recipeId = this.props.id
    firebase.database().ref('recipes/' + recipeId).once('value').then(function (snapshot) {
        this.setState({
            avatarSource: snapshot.val().avatarSource,
        })
    }.bind(this));
}
 
    render() {
        //    let recipeId = String(navigation.getParam('id', ""))
        return (
            <View>
                <View style={[styles.headerUserView, styles.row]}>
                    <ImageBackground source={this.state.avatarSource}
                                     style={{width: '100%', height: '100%'}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{position: 'absolute', top: 20, right: 20}}>
                    <TouchableHighlight onPress={this.openModal}>
                        <Image source={require('../../assets/book.png')}
                               style={{width: 40, height: 40}}/>
                    </TouchableHighlight>
                </View>
                <Modal
                    isVisible={this.state.visibleModal === 'bottom'}
                    onSwipeComplete={() => this.setState({visibleModal: null})}
                    swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.bottomModal}>
                    <View style={styles.modelContent}>
                        <Button title="Save Recipe" buttonStyle={{backgroundColor: '#00b5ec', borderRadius: 30,}}
                                containerStyle={{marginTop: 10, marginBottom: 10}}
                                onPress={() => this.saveRecipe()}/>
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
        this.state = {
            time: '',
            difficulty: '',
            type: '',
            rate: '',
            loading: true,
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        let recipeId = this.props.id
        firebase.database().ref('recipes/' + recipeId).once('value').then(function (snapshot) {
            this.setState({
                rate: snapshot.val().rate,
                time: snapshot.val().time,
                type: snapshot.val().type,
                difficulty: snapshot.val().difficulty,
                loading: false
            })
        }.bind(this));
    }

    render() {
        //const { navigation } = this.props; 
        let recipeId = this.props.id
        console.log('this.props', this.state.difficulty)
        return (
            <View style={styles.headerFollowing}>
                <TouchableOpacity>
                    <Image source={require('../../assets/time.png')}
                           style={{width: 25, height: 25}}/>
                    <Text style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.time}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/level.png')}
                           style={{width: 25, height: 25}}/>
                    <Text
                        style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.difficulty}</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={require('../../assets/meal.png')}
                           style={{width: 25, height: 25}}/>
                    <Text style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.type}</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={require('../../assets/rate.png')}
                           style={{width: 25, height: 25}}/>
                    <Text style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.rate}</Text>
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
            ingredients: '',
            title: '',
            description: '',
            reviews : [],
            title: '',
            description: '',
            ingrediants: '',
            steps: '',
            calories: '',
            fiber: '',
            fat: '',
            protein: '',
            rate : '',
            addRate : 1,
            addReviewText: '',
            showAddReview : true,
        }
    }

    segrantClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        let Userid = firebase.auth().currentUser.uid
        let recipeId = this.props.id
        let flag
        let reviews=[]
        firebase.database().ref('recipes/' + recipeId).once('value').then(function (snapshot) {
            this.setState({
                ingredients: snapshot.val().ingredients,
                steps: snapshot.val().steps,
                title: snapshot.val().title,
                description: snapshot.val().description,
                calories: snapshot.val().calories,
                fat: snapshot.val().fat,
                fiber: snapshot.val().fiber,
                protein: snapshot.val().protein,
                reviews: snapshot.val().reviews,
                loading: false
            })
         //  reviews.push(snapshot.val().reviews)
        }.bind(this));

        firebase.database().ref('recipes/' + recipeId).child('/reviews').on("value", function (snapshot) {
            snapshot.forEach(function (item) {
                id=item.val().user_id
                if(id == Userid)
                {   
                    this.state.showAddReview=false
                }
              
            }.bind(this))
       }.bind(this))
       console.log('showAddReview',this.state.title)
    }

addReview(){
        let Userid = firebase.auth().currentUser.uid
        let username
        let  reviews=this.state.reviews
        let recipeId=this.props.id
        var userData={recipeId}
        var id
        //read name
        firebase.database().ref('users/').child(Userid).on("value", function (name){
            username=name.child('fullname').val()
        }.bind(this))
        
        let new_review = {
            user_id : Userid,
            rate : this.state.addRate,
            comment : this.state.addReviewText,
            user_name : username,
          } 
        reviews.push(new_review)  
        
        try {
            firebase.database().ref('recipes/'+recipeId).child('/reviews').set(
                reviews,
                function (error) {
                    if (error) {
                        Alert.alert("Failed adding: Message: " + error)
                    }
                    else {
                      Alert.alert(
                        'Review Added',
                        'Review Added Successfully!',
                        [
                          {text: 'OK'},
                        ],
                        {cancelable: false},
                      );
                      this.setState({showAddReview:false})
                    //  reviews=this.state.reviews
                      firebase.database().ref('recipes/'+recipeId+'/reviews').once("value").then(function(snapshot) {
                          let sumOfRates = 0.0
                          snapshot.forEach(function(item) {
                            sumOfRates = sumOfRates + item.val().rate ;
                         }.bind(this));
                           newRate =  sumOfRates / reviews.length
                           newRate = newRate.toFixed(2);
                           firebase.database().ref('recipes/'+recipeId+'/rate').set(newRate)
                           this.setState({rate:newRate})
                         }.bind(this));
                  }
               }.bind(this)     
            )  
            //change the new rate value in database
    
        }
        catch(error){
          console.log(error)
        }
 }

    renderSection = () => {
        console.log(this.state.reviews)
        if (this.state.activeIndex == 0) {
            return (
                <View>
                    <Text>{'\n'}</Text>
                    <View style={{marginTop: -20,width:330,marginLeft:90}}>
                        <FlatList style={{
                            marginTop: -20, }}
                                  data={this.state.ingredients}
                                  numColumns={1}
                                  keyExtractor={(item, index) => item.id}
                                  renderItem={({item}) =>
                                      <View style={{
                                          borderBottomWidth: 1,
                                          alignItems: 'center',
                                          width: 330,
                                          borderRadius: 100,
                                          borderColor: '#00b5ec',
                                          alignContent: 'center',
                                          backgroundColor: '#E3F2FD',
                                          width: '50%'
                                     }}>
                                          <Text style={{
                                              alignContent: 'center',
                                              marginTop: 2,
                                              fontSize: 20,
                                              fontFamily: 'notoserif',
                                              color: "#7c8191"
                                            }}>
                                              {item}
                                          </Text>
                                      </View>
                                  }
                                  style={{backgroundColor: 'white'}}
                        /> 
                    </View>
                    <Text style={{fontSize:25,marginLeft:10,marginTop:20}}>Nutration</Text>
                    <View style={{flexDirection:'row'}}>
                       <View style={{marginTop:10,flexDirection:'row',marginLeft:40}}>
                            <Text style={{fontSize:20}}>Fiber: </Text>
                            <View style={{ backgroundColor : '#E3F2FD',borderWidth:1,borderColor:'#00b5ec',width:50,borderRadius:10}}>
                              <Text style={{fontSize:20}}>{this.state.fat} gm</Text>
                            </View> 
                       </View> 

                       <View style={{marginTop:10,flexDirection:'row',marginLeft:80}}>
                            <Text style={{fontSize:20}}>Fat : </Text>
                            <View style={{ backgroundColor : '#E3F2FD',borderWidth:1,borderColor:'#00b5ec',width:50,borderRadius:10}}>
                              <Text style={{fontSize:20,marginLeft:10}}>{this.state.fiber} gm</Text>
                             </View> 
                       </View> 
                    </View>   
                    <View style={{flexDirection:'row',marginTop:8}}>
                    <View style={{marginTop:10,flexDirection:'row',marginLeft:40}}>
                            <Text style={{fontSize:20}}>Calories: </Text>
                            <View style={{ backgroundColor : '#E3F2FD',borderWidth:1,borderColor:'#00b5ec',width:50,borderRadius:10}}>
                              <Text style={{fontSize:20}}>{this.state.calories} c</Text>
                            </View> 
                    </View> 

                    <View style={{marginTop:10,flexDirection:'row',marginLeft:60}}>
                            <Text style={{fontSize:20}}>Protein: </Text>
                            <View style={{ backgroundColor : '#E3F2FD',borderWidth:1,borderColor:'#00b5ec',width:50,borderRadius:10}}>
                              <Text style={{fontSize:20}}>{this.state.protein} gm</Text>
                            </View> 
                    </View> 
                    </View>
                </View>
            )
        }

        if (this.state.activeIndex == 1) {
            return (
                <View style={{backgroundColor: '#E3F2FD',
                             borderRadius:25,
                             borderWidth:1,
                             borderColor:'#00b5ec',
                             width:320,
                             marginLeft:20,}}>
                    <Text style={{
                        marginTop: 5,
                        fontSize: 25,
                        marginBottom:30,
                        fontFamily: 'notoserif',
                             color: "#7c8191",
                        marginLeft:10
                    }}>Steps :
                        {'\n'} {'\n'}
                      {this.state.steps}</Text>  
               </View>
            )
        }
        if (this.state.activeIndex == 2) {
            return (
             <View>
                <FlatList   style={styles.root}
                            data={this.state.reviews}
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
                               <TouchableOpacity onPress={() => {}}>
                                  <Image style={styles.image} source={require('../../assets/logo22.png')}/>
                               </TouchableOpacity>

                               <View style={styles.content}>
                                   <View style={styles.contentHeader}>
                                       <Text  style={styles.name}>{Notification.user_name}</Text>
                                       <Rating style={styles.time}
                                          readonly
                                          type="star"
                                          fractions={1}
                                          startingValue={Notification.rate}
                                          imageSize={20}
                                          style={{ paddingVertical: 10 }}
                                       />
                                   </View>

                                   <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
                               </View>
                            </View>
                         </View> 
                      </View>
                  );
                }}/>
                <View style = {this.state.showAddReview == true ? {} : {display : 'none'}}>
                  <View>
                    
            <View style={{borderRadius:20,borderWidth:1,marginLeft:4,marginRight:4}}>
                <Rating
                    showRating
                    type="star"
                    fractions={0}
                    startingValue={1}
                    imageSize={30}
                    onFinishRating={(rating) => {this.setState({...this.state, addRate : rating})}}
                    style={{ paddingVertical: 10 }}
                />
                  <KeyboardAvoidingView>
                      <View style={{flexDirection:'row'}}>
                      <TextInput 
                            multiline={true}
                            numberOfLines = {3}
                            autoCorrect={true}
                            placeholder="add your review..."
                            onChangeText={(text) =>{this.setState({...this.state, addReviewText : text})}}
                            style={{borderColor: 'gray', borderWidth: 1,width:270,height:40 ,borderRadius:10,marginLeft:10}}
                      />

                <TouchableHighlight
                    style={[styles.buttonContainer, styles.SignUpButton, this.state.isLoading ? styles.SaveButtonColorLoading : styles.SaveButtonColor]}
                    disabled={this.state.isLoading}
                    onPress={() => this.addReview()}>
                    <Text style={{color:'white'}}>Add</Text>
                </TouchableHighlight>
                    </View>
                  </KeyboardAvoidingView>
                </View>
                   
                 
                </View>
              </View>
                </View>
                
            )
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.previewContainer}>
                <Text style={{fontSize: 40, marginTop: -10, marginBottom: 20, marginLeft: 10}}>{this.state.title}</Text>
                <Text style={{
                    fontSize: 20,
                    marginTop: -20,
                    marginBottom: 20,
                    marginLeft: 10,
                    color: '#7c8191'
                }}>{this.state.description}</Text>
                <View style={styles.Preview}>
                    <TouchableOpacity
                        style={this.state.activeIndex == 0 ? {
                            borderBottomWidth: 1,
                            borderBottomColor: '#156a95'
                        } : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(0)} active={this.state.activeIndex == 0}>
                        <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 0 ? {color: '#00b5ec', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Ingrediants
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 1 ? {
                            borderBottomWidth: 1,
                            borderBottomColor: '#156a95'
                        } : {color: '#7c8191'}}
                        onPress={() => this.segrantClicked(1)} active={this.state.activeIndex == 1}>
                        <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 1 ? {color: '#00b5ec', paddingBottom: 4} : {color: '#7c8191'}]}>
                            How to make
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={this.state.activeIndex == 2 ? {
                            borderBottomWidth: 1,
                            borderBottomColor: '#156a95'
                        } : {color: '#00b5ec'}}
                        onPress={() => this.segrantClicked(2)} active={this.state.activeIndex == 2}>
                        <Text style={[styles.followingTitle, styles.followingTitleForNumbers,
                            this.state.activeIndex == 2 ? {color: '#00b5ec', paddingBottom: 4} : {color: '#7c8191'}]}>
                            Reviews
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderSection()}
            </View>
        )
    }
}

export default class RecipeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            loading: true,
            title: '',
            description: '',
            ingrediants: '',
            steps: '',
            calories: '',
            fiber: '',
            fat: '',
            protein: '',
            reviews: '',
            rate: '',
            username:''
        }
    }

    readusername()
    {
        console.log(this.props.id)
        firebase.database().ref('/users/' + id).on('value', function (user) {
            let userName = user.child('fullname').val();
           console.log(userName)
       });
    }

    componentDidMount() {
        const {navigation} = this.props;
        let id = String(navigation.getParam('id', ""))
        console.log('id', id)
        let userName = String(navigation.getParam('userName', ""))
        console.log('userName', userName)
        firebase.database().ref('/users/' + id).on('value', function (user) {
            let userName = user.child('fullname').val();
           console.log(userName)
       });
    }

    render() {
        const {navigation} = this.props;
        let id = navigation.getParam('id', "")
        console.log('hi', id)
        return (
            <ScrollView>
                <View style={{marginBottom: 20}}>
                    <HeaderImageView id={id}/>
                    <Following id={id}/>
                    <Preview id={id}/>
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
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFDE03',
        flex: 1,
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
    root: {
        backgroundColor: "#ffffff",
        marginTop:10,
      },
      container: {
        paddingLeft: 19,
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
        marginLeft:20
      },
      time:{
        fontSize:11,
        color:"#808080",
      },
      name:{
        fontSize:16,
        fontWeight:"bold",
      },
      buttonContainer: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 50,
        borderRadius: 10,
        marginLeft: 10,
        marginTop:5
    },
    SaveButtonColor: {
        backgroundColor: "#00b5ec",
    },
    SaveUpButtonColorLoading: {
        backgroundColor: "#4dd5ff",
    },
});