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
    PixelRatio,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import 'firebase/storage';
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
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        ITEMS_KEY.forEach((key) => {
            this.state = {[key]: false}
        })
        
        this.state = {
            yes: false,
            No: false,
            checked: false,
            recipe: [
                {title: ''},
                // {type:''},
                {time: ''},
                {difficality: ''},
                {steps: ''},
                {description: ''},
                {ingredients: ''},
                {calories: ''},
                {fiber: ''},
                {protein: ''},
                {fat: ''},
                {carbs: ''},
            ],
            isLoading: false,
            avatarSource: null,
            videoSource: null,
        };
    }

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
          skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = {uri: response.uri};
             console.log(response.uri)
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.uploading(response.uri)
            this.setState({
              avatarSource: source,
            });
          }
        });
      }
    
    add = () => {
        let title = this.state.title
        let time = this.state.time
        // let type = this.state.type
        let ingredients = this.state.ingredients
        let steps = this.state.steps
        let difficality = this.state.difficality
        let description= this.state.description
        let Nutration=this.state.nutration
        let calories = this.state.calories
        let fiber = this.state.fiber
        let fat = this.state.fat
        let protein = this.state.protein
        let carbs = this.state.carbs
        let avatarSource = this.state.avatarSource
        this.setState({isLoading: true})

        if (title == '' || time === '' || ingredients === '' || steps === '') {
            alert('please fill all fields')
            return null
        } else {
            firebase.database().ref('recipes/').push({
                    title: title,
                    ingredients: ingredients,
                    steps: steps,
                    time: time,
                    difficality: difficality,
                    description: description,
                    calories: calories,
                    fiber: fiber,
                    fat: fat,
                    protein: protein,
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
    
    uploading = async(uri,imgName) =>{
        const response = await fetch(uri);
        const blob =await response.blob();
        var ref = firebase.storage().ref().child("images/"+imgName)
        return ref.put(blob )
      }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity style={styles.touchable} onPress={this.selectPhotoTapped.bind(this)}>
                   <View style={styles.view}>
                      {this.state.avatarSource === null ? (
                           <Image style={styles.inputIcon} source={require('../assets/camera.png')}/>
                      ) : (
                           <Image style={styles.avatar} source={this.state.avatarSource} />
                      )}
                     </View>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Title.."
                               underlineColorAndroid='transparent'
                               onChangeText={(title) => this.setState({ title})}/>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="description.."
                               underlineColorAndroid='transparent'
                               onChangeText={(description) => this.setState({description})}
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
                    <Image style={{marginLeft: 15, width: 30, height: 30}} source={require('../assets/plus.png')}/>
                    <TextInput style={styles.inputs}
                               placeholder="Add ingrediants"
                               underlineColorAndroid='transparent'
                               onChangeText={(ingredients) => this.setState({ingredients})}
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
                               onChangeText={(time) => this.setState({time})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Difficality"
                               underlineColorAndroid='transparent'
                               onChangeText={(difficality) => this.setState({difficality})}
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
                               onChangeText={(steps) => this.setState({steps})}
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
                               placeholder="Calories kcal     optinal"
                               underlineColorAndroid='transparent'
                               onChangeText={(calories) => this.setState({calories})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Carbs g   'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(carbs) => this.setState({carbs})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Fiber g      'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(fiber) => this.setState({fiber})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Fat g        'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(fat) => this.setState({fat})}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="protein g    'optinal'"
                               underlineColorAndroid='transparent'
                               onChangeText={(protein) => this.setState({protein})}
                    />
                </View>

                <TouchableHighlight
                    style={[styles.buttonContainer, styles.SignUpButton, this.state.isLoading ? styles.SaveButtonColorLoading : styles.SaveButtonColor]}
                    disabled={this.state.isLoading}
                    onPress={() => this.add()}>
                    <Text style={{color:'white'}}>Add</Text>
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
    SaveButtonColorLoading: {
        backgroundColor: "#4dd5ff",
    },
    image: {
        marginRight: 8
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        //fontSize: 16
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius: 23,
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
    SaveUpButtonColorLoading: {
        backgroundColor: "#4dd5ff",
    },
    SearchText: {
        color: "#00b5ec",
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
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        borderRadius: 23,
        height: 146,
        width: 349,
        alignItems: 'center',
      },

});
     