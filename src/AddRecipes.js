import React from 'react';
import {
    StyleSheet, Text, View, 
    TouchableHighlight,
    Image,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';   
import * as firebase from 'firebase';

export default class AddRecepies extends React.Component {
    static navigationOptions = {
        title: 'Add recipes',
    };

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            title: '',
            time: '',
            steps: '',
            intgrediens:'',
            rate:'',
            Discription:'',
            myKey: null,
            isLoading: false
        };
    }
    add = () => {
        let title = this.state.title
        let time = this.state.time
        let type = this.state.type
        let intgrediens = this.state.intgrediens
        let steps = this.state.steps

        this.setState({isLoading: true})
        if (title == '' || time === '' || type === null || intgrediens === '' || steps ==='') {
            alert('please fill all fields')
            return null
        }
        else {
              firebase.database().ref('recipees/' ).set({
                title: title,
                type: type,
                steps: steps,
                intgrediens:intgrediens,
                time:time,
                },
                function (error) {
                    if (error) {
                      Alert.alert("Failed adding: Message: " + error)
                    }
                });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Title"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(title) => this.setState({title})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Type of this recipes"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(type) => this.setState({type})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Time"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(time) => this.setState({time})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="Integrediants"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(intgrediens) => this.setState({intgrediens})}/>
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputs}
                                       placeholder="steps"
                                       underlineColorAndroid='transparent'
                                       onChangeText={(steps) => this.setState({steps})}/>
                        </View>
                        <TouchableHighlight style={[styles.buttonContainer, styles.SignUpButton, this.state.isLoading ? styles.SignUpButtonColorLoading : styles.SignUpButtonColor]}
                                            disabled={this.state.isLoading}
                                            onPress={() => this.add()}>
                            <Text style={styles.loginText}>Add</Text>
                        </TouchableHighlight>

                        <ActivityIndicator size="large" color="#00b5ec" style={{display: this.state.isLoading ? 'flex' : 'none'}}/>

                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFDE03',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    SignUpButton: {
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
    },
    SignUpButtonColor: {
        backgroundColor: "#00b5ec",
    },
    SignUpButtonColorLoading: {
        backgroundColor: "#4dd5ff",
    },
    loginText: {
        color: 'white',
    },
    logo: {
        height: 180,
        width: 180,
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});