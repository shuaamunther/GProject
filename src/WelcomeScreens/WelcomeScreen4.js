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
const Arrayimages= {
   img0: require('../../assets/welcome3/Alchole1.png'),
   img1: require('../../assets/welcome3/Avocado1.png'),
   img2: require('../../assets/welcome3/Beef1.png'),
   img3: require('../../assets/welcome3/Eggplant1.png'),
   img4: require('../../assets/welcome3/mushroom1.png'),
   img5: require('../../assets/welcome3/Prok1.png'),
   img6:  require('../../assets/welcome3/Onion1.png'),
   img7:  require('../../assets/welcome3/sugar1.png'),
   img8:  require('../../assets/welcome3/olives1.png'),
};
const Arrayimages2 = {
    img00:   require('../../assets/welcome3/Alchole.png'),
    img11: require('../../assets/welcome3/Avocado.png'),
    img22: require('../../assets/welcome3/Beef.png'),
    img33: require('../../assets/welcome3/Eggplant.png'),
    img44: require('../../assets/welcome3/mushroom.png'),
    img55: require('../../assets/welcome3/Prok.png'),
    img66: require('../../assets/welcome3/Onion.png'),
    img77: require('../../assets/welcome3/sugar.png'),
    img88: require('../../assets/welcome3/olives.png'),
}

export default class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            activeIndex:0, 
            dislikes:{
                alcohole:'false',
                avocado:'false',
                beef:'false',
                eggplant:'false',
                mushrooms:'false',
                pork:'false',
                onions:'false',
                suger:'false',
                olives:'false'},
        };
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

    segrantClicked0 = (index) => {
        this.setState({
            avocado: index,
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/avocado').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked1 = (index) => {
        this.setState({
            beef: index,
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/beef').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked2 = (index) => {
        this.setState({
            eggplant: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/eggplant').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked3 = (index) => {
        this.setState({
            mushrooms: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/mushrooms').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked4 = (index) => {
        this.setState({
            pork: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/pork').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked5 = (index) => {
        this.setState({
            onions: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/onions').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked6 = (index) => {
        this.setState({
            suger: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/suger').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked7 = (index) => {
        this.setState({
            olives: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/olives').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked8= (index) => {
        this.setState({
            alcohole: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/dislikes/alcohole').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    


    render() {
        console.log(firebase.auth().currentUser.uid)
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

                                   
            <ScrollView style={{flexDirection: 'column',marginTop:30}}>
                    <View style={{marginLeft: 1,flexDirection: 'row',justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        onPress={() => this.segrantClicked0(0)} active={this.state.avocado == 0}>
                        <Image  style={styles.inputIcon} source={this.state.avocado== 0 ? Arrayimages.img1 : Arrayimages2.img11}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked1(1)} active={this.state.beef == 1}>
                        <Image  style={styles.inputIcon} source={this.state.beef == 1 ? Arrayimages.img2 : Arrayimages2.img22}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked2(2)} active={this.state.eggplant == 2}>
                        <Image  style={styles.inputIcon} source={this.state.eggplant == 2 ? Arrayimages.img3 : Arrayimages2.img33}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 10,flexDirection: 'row',justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        onPress={() => this.segrantClicked3(3)} active={this.state.mushrooms == 3}>
                        <Image  style={styles.inputIcon} source={this.state.mushrooms == 3 ? Arrayimages.img4 : Arrayimages2.img44}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked4(4)} active={this.state.pork == 4}>
                        <Image  style={styles.inputIcon} source={this.state.pork == 4 ? Arrayimages.img5 : Arrayimages2.img55}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked5(5)} active={this.onions == 5}>
                        <Image  style={styles.inputIcon} source={this.state.onions == 5 ? Arrayimages.img6 : Arrayimages2.img66}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 10,flexDirection: 'row',justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        onPress={() => this.segrantClicked6(6)} active={this.state.suger == 6}>
                        <Image  style={styles.inputIcon} source={this.state.suger == 6 ? Arrayimages.img7 : Arrayimages2.img77}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked7(7)} active={this.state.olives == 7}>
                        <Image  style={styles.inputIcon} source={this.state.olives == 7 ? Arrayimages.img8 : Arrayimages2.img88}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked8(8)} active={this.state.alcohole == 8}>
                        <Image  style={styles.inputIcon} source={this.state.alcohole == 8 ? Arrayimages.img0 : Arrayimages2.img00}/>
                    </TouchableOpacity>
                    </View>
                   
            </ScrollView>

                        <View style={{height: 75}}>
                            <TouchableHighlight style={[styles.buttonContainer,styles.NextButton,]}
                                               onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={styles.loginText}>Start</Text>
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
    inputIcon: {
        width: 80,
        height: 80,
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
