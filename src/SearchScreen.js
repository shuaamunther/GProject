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
    TouchableHighlight,
    FlatList,
} from 'react-native'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Card, Button} from 'react-native-elements';
import { ButtonGroup } from 'react-native-elements';
import * as firebase from 'firebase';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    updateSearch = search => {
        this.setState({search});
    };

    render() {
        const {search} = this.state;
        return (
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={require('../assets/search.png')}/>
                    <TextInput style={styles.inputs}
                               placeholder="Search..."
                               autoCapitalize="none"
                               underlineColorAndroid='transparent'
                               onChangeText={(search) => this.updateSearch}
                               value={this.state.search}/>
                </View>
            </View>
        );
    }
}

class ButtonFilter extends React.Component {

    _onPressButton1() {
    }

    _onPressButton2() {
    }

    _onPressButton3() {
    }
    
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1
        };  
    }

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
    }

    render() {
        const buttons = ['Lunch', 'Breakfast/Dinner','Sweets']
        const { selectedIndex } = this.state

        return (<View >
                <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        style={{flex: 1}}
                    />
            </View>
        );
    }
}
function Item({ Title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{Title}</Text>
      </View>
    );
  }
export default class SearchScreen extends React.Component {
    showData()
     {
      recipe = [] 
      firebase.database().ref('/recipes').on('value', function (snapshot) {
        snapshot.forEach(function (item) {
            console.log('item: ', item.key)
            recipe.push({title: item.val().title, type: item.val().type, rate: item.val().rate,id: item.key})
        })
       console.log('this',recipe)
        this.setState({
            recipe: recipe
        })
    }.bind(this));
  
}

    componentDidMount(){
       this.showData()
    }
    constructor(props) {
        super(props);
      
        //firebase
        this.state = {
          recipe: [
            {title: ''},
            {type:''},
            {rate: ''},
            {id:''} ],
      }
     }
    render() {
        return (
            <View>
                <Search/>
                <ButtonFilter/>
                <FlatList
                 data={this.state.recipe}
                 renderItem={({ item }) => <Card cardItem={item}/>}
                 keyExtractor={item => item.id}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        marginLeft: 11,
        marginTop: 7,
        marginBottom: -5,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius: 30,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        width: 340,
        height: 45,
        marginBottom: 20,
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
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    SearchButton: {
        backgroundColor: 'white',
        marginBottom: 20,
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
       // borderBottomWidth: 1,
        //borderBottomColor: "#00b5ec",

    },
});

      