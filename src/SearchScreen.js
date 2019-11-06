import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity, TabView,
    TabBar,
    SceneMap,
    NavigationState,
    SceneRendererProps,
    Icon,
    Dimensions,
    SearchBar,
    TextInput,
    ScrollView,
    TouchableHighlight,
} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Card, Button} from 'react-native-elements';
import CardListScreen from './CardListScreen';
import * as firebase from 'firebase';


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            Search: '',
            recipe: [],
        }
    }

    
    updateSearch = (search) => {
        console.log(search)

        this.setState({search});
        console.log(this.state.recipe)         

        let recipe = []
        firebase.database().ref().child('recipes').orderByChild('title').startAt(search).on("value", function(snapshot) {
            snapshot.forEach(function (item) { 
                recipe.push({title: item.val().title, type: item.val().type, rate: item.val().rate,id: item.key})
            })
            this.setState({
                recipe: recipe
            })    
        }.bind(this))
    };


    render() {
        return (
            <ScrollView>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={require('../assets/search.png')}/>
                        <TextInput style={styles.inputs}
                                placeholder="Search..."
                                autoCapitalize="none"
                                underlineColorAndroid='transparent'
                                onChangeText={(search) => this.updateSearch(search)}
                                value={this.state.search} />
                    </View>
                </View>
                
                <ScrollView>
                <CardListScreen recipe={this.state.recipe}/>
                </ScrollView>
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
        marginBottom: -5,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
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
});
