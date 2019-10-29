import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    Image,
    ScrollView,
    CheckBox,
    SafeAreaView,
    Alert
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';

export default class Welcome extends React.Component {
    state = {checked: false}
    handleCheckboxChange = event => this.setState({checked: event.target.checked})

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            dairy: false,
            egg: false,
            gluten:false,
            paenut:false,
            seafood:false,
            seasame:false,
            soy:false,
            sulfite:false,
            treenut:false,
            white:false,
        };
    }

    getData=()=>{
        try{
            const value= this.props.navigation.getParam('userId','')
            console.log('this token',value);
                if(value!==null)
                {
                    alert("value:"+value)    
                    this.props.navigation.navigate('Welcome4',{userId:value,})
                }
        }catch(error){
            alert("Error"+error)
        }
    }
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <Image style={styles.botto} source={require('../assets/tap4.png')}/>
                        <Text  style={styles.name}> Do you have any food allergies? </Text>
                        <Text style={{alignSelf: 'center',}}>Choose as many as you like (or none at all) and tap 'Next'</Text>
                        <Text style={{alignSelf: 'center',}}> You can change these any tiome in your Preference.</Text>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <View style={styles.row}>
                                <View style={styles.box}>
                                    <Image style={styles.PreviewIcon} source={require('../assets/Dairy.png')}/>
                                    <CheckBox value={this.state.dairy}
                                              onValueChange={() => this.setState({dairy: !this.state.dairy})}/>
                                </View>

                                <View style={styles.box}>
                                    <CheckBox  value={this.state.egg}
                                               onValueChange={() => this.setState({egg: !this.state.egg})}/>
                                    <Image style={styles.PreviewIcon} source={require('../assets/Egg.png')}/>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.box}>
                                    <Image style={styles.PreviewIcon} source={require('../assets/Gluten.png')}/>
                                    <CheckBox value={this.state.gluten}
                                              onValueChange={() => this.setState({gluten: !this.state.gluten})}/>
                                </View>

                                <View style={styles.box}>
                                    <CheckBox  value={this.state.paenut}
                                               onValueChange={() => this.setState({paenut: !this.state.paenut})}/>
                                    <Image style={styles.PreviewIcon} source={require('../assets/Peanut.png')}/>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.box}>
                                    <Image style={styles.PreviewIcon} source={require('../assets/SeaFood.png')}/>
                                    <CheckBox value={this.state.seafood}
                                               onValueChange={() => this.setState({seafood: !this.state.seafood})}/>
                                </View>

                                <View style={styles.box}>
                                    <CheckBox value={this.state.seasame}
                                              onValueChange={() => this.setState({seasame: !this.state.seasame})}/>
                                    <Image style={styles.PreviewIcon}source={require('../assets/Sesame.png')}/>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.box}>
                                    <Image style={styles.PreviewIcon}  source={require('../assets/Soy.png')}/>
                                    <CheckBox  value={this.state.soy}
                                               onValueChange={() => this.setState({soy: !this.state.soy})}/>
                                </View>

                                <View style={styles.box}>
                                    <CheckBox value={this.state.sulfite}
                                              onValueChange={() => this.setState({sulfite: !this.state.sulfite})}/>
                                    <Image style={styles.PreviewIcon}
                                           source={require('../assets/Sulfite.png')}/>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.box}>
                                    <Image style={styles.PreviewIcon} source={require('../assets/Tree.png')}/>
                                    <CheckBox value={this.state.treenut}
                                              onValueChange={() => this.setState({treenut: !this.state.treenut})}/>
                                </View>

                                <View style={styles.box}>
                                    <CheckBox value={this.state.white}
                                              onValueChange={() => this.setState({white: !this.state.white})}/>
                                    <Image style={styles.PreviewIcon} source={require('../assets/White.png')}/>
                                </View>
                            </View>

                            <TouchableHighlight style={[styles.buttonContainer, styles.NextButton, styles.description]}
                                                onPress={() => this.getData()}>
                                <Text style={styles.loginText}>Next</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        height: 170,
        alignSelf: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 80,
    },
    body: {
        marginTop: 0,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 2,
    },
    name: {
        fontSize: 26,
        color: '#696969',
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: 50,
    },
    info: {
        fontSize: 16,
        color: '#00BFFF',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: '#696969',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: '#00BFFF',
    },
    NextButton: {
        backgroundColor: "#00b5ec",
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
    },
    loginText: {
        color: 'white',
    },
    headerStarText: {
        fontSize: 18,
        top: '40%',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        backgroundColor: 'white',
    },
    PreviewIcon: {
        width: 100,
        height: 100,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 22
    },
});

      
      