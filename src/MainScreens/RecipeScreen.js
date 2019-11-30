import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity,
    ImageBackground, ScrollView, TouchableHighlight, error, FlatList
} from 'react-native'
import {StackActions, NavigationActions} from 'react-navigation';
import {Card, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import Modal from "react-native-modal";
import CardListScreen from "./component/CardListScreen";
import DataScreen from "./component/DataScreen"

class HeaderImageView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {visibleModal: null}
    }

    openModal = () => {
        this.setState({visibleModal: 'bottom'});
    };

    render() {
        //    let recipeId = String(navigation.getParam('id', ""))
        return (
            <View>
                <View style={[styles.headerUserView, styles.row]}>
                    <ImageBackground source={require('../../assets/recipeImage.jpg')}
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
                                containerStyle={{marginTop: 10, marginBottom: 10}}/>
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
                difficality: snapshot.val().difficality,
                loading: false
            })
        }.bind(this));
    }

    render() {
        //const { navigation } = this.props; 
        let recipeId = this.props.id
        console.log('this.props', this.state.difficality)
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
                        style={[styles.followingTitle, styles.followingTitleForNumbers]}>{this.state.difficality}</Text>
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
            description: ''
        }
    }

    segrantClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    componentDidMount() {
        const {navigation} = this.props;
        let recipeId = this.props.id
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
        }.bind(this));
    }

    renderSection = () => {
        console.log(this.state.ingredients)
        if (this.state.activeIndex == 0) {
            return (
                <View>
                    <Text>{'\n'}</Text>
                    <View style={{marginTop: -20,}}>
                        <FlatList style={{
                            marginTop: -20, alignItems: 'center',
                        }}
                                  data={this.state.ingredients}
                                  numColumns={1}
                                  keyExtractor={(item, index) => item.id}
                                  renderItem={({item}) =>
                                      <View style={{
                                          borderBottomWidth: 1,
                                          alignItems: 'center',
                                          width: 2,
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
                </View>
            )
        }

        if (this.state.activeIndex == 1) {
            return (
                <View style={{}}>
                    <Text style={{
                        marginTop: 5,
                        fontSize: 25,
                        fontFamily: 'notoserif',
                        color: "#7c8191"
                    }}>{this.state.steps}</Text>
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

        const {navigation} = this.props;
        //let id= navigation.getParam('id', "")
        //.log('this.props.id',id)
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
            rate: ''
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        let id = String(navigation.getParam('id', ""))
    }

    render() {
        const {navigation} = this.props;
        let id = navigation.getParam('id', "")
        console.log('hi', id)
        return (
            <ScrollView>
                <View style={{marginBottom: 20}}>
                    <HeaderImageView/>
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
    }
});