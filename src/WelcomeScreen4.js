import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    ScrollView,
    CheckBox,
    FlatList,
    Alert
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import { ButtonGroup } from 'react-native-elements';
import WelcomeHeader from './WelcomeHeader'


const ITEMS_KEY = [
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
    'item6',
    'item7',
    'item8',
    'item9',
]
const IMAGES_CHECKED = [
    require('../assets/welcome3/Alchole1.png'),
    require('../assets/welcome3/Avocado1.png'),
    require('../assets/welcome3/Beef1.png'),
    require('../assets/welcome3/Eggplant1.png'),
    require('../assets/welcome3/mushroom1.png'),
    require('../assets/welcome3/Prok1.png'),
    require('../assets/welcome3/Onion1.png'),
    require('../assets/welcome3/sugar1.png'),
    require('../assets/welcome3/olives1.png'),
]
const IMAGES_UNCHECKED = [
    require('../assets/welcome3/Alchole.png'),
    require('../assets/welcome3/Avocado.png'),
    require('../assets/welcome3/Beef.png'),
    require('../assets/welcome3/Eggplant.png'),
    require('../assets/welcome3/mushroom.png'),
    require('../assets/welcome3/Prok.png'),
    require('../assets/welcome3/Onion.png'),
    require('../assets/welcome3/sugar.png'),
    require('../assets/welcome3/olives.png'),
]

export default class Welcome extends React.Component {

    constructor(props) {
        super(props);
        ITEMS_KEY.forEach((key)=>{
            this.state = {[key]: false}
        })
    }

    renderImage = (index) => {
        const itemKey = ITEMS_KEY[index]
        let output = this.state[itemKey] ? IMAGES_CHECKED[index] : IMAGES_UNCHECKED[index];

        return  <Image style={{width:70, height:70 }} source={output} />
    }

    _renderItem = (item) => {
        console.log('_renderItem: ')
        console.log(item);
        let itemKey = item.item

        return (
            <TouchableOpacity
                style={styles.checkboxButton}
                onPress={ () => this.setState({ [itemKey]: !this.state[itemKey] }) }>
                {this.renderImage(item.index)}
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.WelcomeHeader}>
                    <WelcomeHeader pageIndex="5"/>
                </View>
                    <View style={styles.headerView}>

                        <View style={{height: 75}}>
                            <Text  style={styles.name}> Last step! </Text>
                            <Text style={{alignSelf: 'center', textAlign: 'center',fontSize:22}}>
                              Recommend recipes
                               </Text>
                               <Text style={{alignSelf: 'center', textAlign: 'center'}}>
                               Choose items below that you disliks, Select Start when you are done
                               </Text>   
                        </View>

                        <View style={{flex: 5,marginTop:20}}>
                            <FlatList 
                                data={ITEMS_KEY}
                                renderItem={this._renderItem}
                                keyExtractor={item => item}
                                numColumns={3}
                            />
                        </View>

                        <View style={{height: 75}}>
                            <TouchableHighlight style={[styles.buttonContainer,styles.NextButton,]}
                                               onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={styles.loginText}>Next</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    WelcomeHeader: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 20,
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems : 'center',
        marginTop: 30
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
    },
    NextButton: {
        backgroundColor: "#00b5ec",
        width: 100,
        borderRadius: 30,
    },
    loginText: {
        color: 'white',
    },
    name: {
        fontSize: 18,
        color: '#696969',
        fontWeight: '600',
        marginBottom: 10,
    },
    checkboxButton: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 20,
    },
});
