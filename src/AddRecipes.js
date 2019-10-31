import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    ScrollView,
    CheckBox,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import NavBar from './NavBar';

const ITEMS_KEY = [
    'item1',
    'item2',
    'item3',
    'item4',
]
const IMAGES_CHECKED = [
    require('../assets/sweet.png'),
    require('../assets/breakfast.png'),
    require('../assets/veg.png'),
    require('../assets/lunch.png'),
]
const IMAGES_UNCHECKED = [
    require('../assets/sweet1.png'),
    require('../assets/breakfast1.png'),
    require('../assets/veg1.png'),
    require('../assets/lunch1.png'),
]

class LogoTitle extends React.Component {
    render() {
        return (
            <Image source={require('../assets/NavBar.png')}
                   style={{width: 170, height: 50, marginLeft: 5, marginTop: 7}}/>
        );
    }
}

export default class Welcome extends React.Component {
    static navigationOptions = {
        headerTitle: 'Add Recipes',
        headerRight: () => (
            <TouchableHighlight style={{paddingRight: 16}}
                                onPress={() => alert('prssed')}>
                <Text style={styles.SearchText}>cancel</Text>
            </TouchableHighlight>
        ),
    };

    handleCheckboxChange = event => this.setState({checked: event.target.checked})

    constructor(props) {
        super(props);
        ITEMS_KEY.forEach((key) => {
            this.state = {[key]: false}
        })
        this.state = {
            yes: false,
            No: false,
            checked: false,
            Recipe: [
                {Title: ''},
                // {Type:''},
                {Time: ''},
                {Difficality: ''},
                {Steps: ''},
                {Discreption: ''},
                {Nutration: [{Calories: '', Fiber: '', Fat: '', Protin: '', Carbs: ''}]},
                {Intgrediens: ''}],
            isLoading: false,
        };
    }

    add = () => {
        let Title = this.state.Title
        let Time = this.state.Time
        // let Type = this.state.Type
        let Intgrediens = this.state.Intgrediens
        let Steps = this.state.Steps
        let Difficality = this.state.Difficality
        let Discreption = this.state.Discreption
        let Calories = this.state.Calories
        let Fiber = this.state.Fiber
        let Fat = this.state.Fat
        let Protin = this.state.Protin
        let Carbs = this.state.Carbs

        this.setState({isLoading: true})
        if (Title == '' || Time === '' || Intgrediens === '' || Steps === '') {
            alert('please fill all fields')
            return null
        } else {
            firebase.database().ref('recipees/').push({
                    Title: Title,
                    Intgrediens: Intgrediens,
                    Steps: Steps,
                    Time: Time,
                    Difficality: Difficality,
                    Discreption: Discreption,
                    Calories: Calories,
                    Fiber: Fiber,
                    Fat: Fat,
                    Protin: Protin,
                },
                function (error) {
                    if (error) {
                        Alert.alert("Failed adding: Message: " + error)
                    }
                });
        }
    }

    renderImage = (index) => {
        const itemKey = ITEMS_KEY[index]
        let output = this.state[itemKey] ? IMAGES_CHECKED[index] : IMAGES_UNCHECKED[index];

        return <Image style={{width: 30, height: 30}} source={output}/>
    }

    _renderItem = (item) => {
        console.log('_renderItem: ')
        console.log(item);
        let itemKey = item.item

        return (
            <TouchableOpacity
                style={styles.checkboxButton}
                onPress={() => this.setState({[itemKey]: !this.state[itemKey]})}>
                {this.renderImage(item.index)}
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
                    <View style={styles.view}>
                        {this.makeImageIfAny(styles)}
                        <Image style={styles.inputIcon} source={require('../assets/camera.png')}/>
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Title.."
                               underlineColorAndroid='transparent'
                               onChangeText={(Title) => this.setState({Title})}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Discreption.."
                               underlineColorAndroid='transparent'
                               onChangeText={(Discreption) => this.setState({Discreption})}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    borderRadius: 23,
                    borderColor: '#00b5ec',
                    borderWidth: 2,
                    backgroundColor: this.props.backgroundColor,
                    height: 60,
                    width: 335,
                    paddingLeft: 18,
                    alignItems: 'center',
                    marginLeft: 10
                }}>
                    <View style={{flex: 5}}>
                        <FlatList data={ITEMS_KEY}
                                  renderItem={this._renderItem}
                                  keyExtractor={item => item}
                                  numColumns={4}/>
                    </View>
                </View>

                <View style={{
                    paddingLeft: 14,
                    paddingTop: 14,
                    height: 40,
                    width: 335,
                    backgroundColor: this.props.backgroundColor,
                }}>
                    <Text>INGREDIANTS</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Image style={{marginLeft: 15, width: 40, height: 40}} source={require('../assets/plus.png')}/>
                    <TextInput style={styles.inputs}
                               placeholder="Add ingrediants"
                               underlineColorAndroid='transparent'
                               onChangeText={(Intgrediens) => this.setState({Intgrediens})}
                    />
                </View>

                <View style={{
                    paddingLeft: 14,
                    paddingTop: 2,
                    height: 25,
                    width: 335,
                    backgroundColor: this.props.backgroundColor,
                }}>
                    <Text>DETAILS</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Prep Time"
                               underlineColorAndroid='transparent'
                               onChangeText={(Time) => this.setState({Time})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Difficality"
                               underlineColorAndroid='transparent'
                               onChangeText={(Difficality) => this.setState({Difficality})}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    borderRadius: 23,
                    borderColor: 'white',
                    borderWidth: 2,
                    height: 150,
                    width: 335,
                    marginLeft: 10,
                    backgroundColor: '#E3F2FD'
                }}>
                    <TextInput style={styles.inputs}
                               placeholder="steps"
                               underlineColorAndroid='transparent'
                               onChangeText={(Steps) => this.setState({Steps})}
                    />
                </View>

                <View style={{
                    paddingLeft: 14,
                    paddingTop: 11,
                    paddingBottom: 25,
                    height: 25,
                    width: 335,
                    backgroundColor: this.props.backgroundColor,
                }}>
                    <Text>NUTRATION</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Calories kcal     'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(Calories) => this.setState({Calories})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Carbs g   'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(Carbs) => this.setState({Carbs})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Fiber g      'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(Fiber) => this.setState({Fiber})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Fat g        'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(Fat) => this.setState({Fat})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Protin g    'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(Protin) => this.setState({Protin})}
                    />
                </View>

                <TouchableHighlight
                    style={[styles.buttonContainer, styles.SignUpButton, this.state.isLoading ? styles.SaveButtonColorLoading : styles.SaveButtonColor]}
                    disabled={this.state.isLoading}
                    onPress={() => this.add()}>
                    <Text style={styles.SearchText}>Add</Text>
                </TouchableHighlight>
                <ActivityIndicator size="large" color="#00b5ec"
                                   style={{display: this.state.isLoading ? 'flex' : 'none'}}/>

            </ScrollView>
        )
    }

    makeImageIfAny(styles) {
        if (this.props.showImage) {
            return <Image style={styles.image} source={R.images.check}/>
        }
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        borderRadius: 23,
        borderColor: '#00b5ec',
        borderWidth: 2,
        backgroundColor: 'white',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFDE03',
        flex: 1,
    },
    touchable: {
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 8
    },
    SaveUpButtonColorLoading: {
        backgroundColor: "#4dd5ff",
    },
    image: {
        marginRight: 8
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 335,
        height: 45,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        marginLeft: 50,
    },
    SaveButtonColor: {
        backgroundColor: "#00b5ec",
    },
    SaveButtonColorLoading: {
        backgroundColor: "#4dd5ff",
    },
    SearchText: {
        color: 'white',
    },
    inputIcon: {
        width: 50,
        height: 50,
        marginLeft: 15,
        justifyContent: 'center'
    },
    saveButton: {
        backgroundColor: "#00b5ec",
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
    },
    SaveText: {
        color: 'white',
    },
    checkboxButton: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },

});
     