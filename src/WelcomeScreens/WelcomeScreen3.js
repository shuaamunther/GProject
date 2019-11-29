import React, {Component} from 'react';
import {
    StyleSheet, Text, View, TextInput,
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
    'item10',
    'item11',
    'item12',
    'item13',
    'item14',
    'item15',
    'item16',
]
const Arrayimages = {
    img0: require('../../assets/welcome3/Dairy.png'),
    img1:require('../../assets/welcome3/Egg.png'),
    img2:require('../../assets/welcome3/Gluten.png'),
    img3:require('../../assets/welcome3/Peanut.png'),
    img4:require('../../assets/welcome3/SeaFood.png'),
    img5:require('../../assets/welcome3/Sesame.png'),
    img6:require('../../assets/welcome3/Soy.png'),
    img7:require('../../assets/welcome3/Sulfite.png'),
    img8:require('../../assets/welcome3/treenut.png'),
    img9:require('../../assets/welcome3/wheat.png'),
};
const Arrayimages2={
    img00:require('../../assets/welcome3/Dairy1.png'),
    img11:require('../../assets/welcome3/egg1.png'),
    img22:require('../../assets/welcome3/gluten1.png'),
    img33:require('../../assets/welcome3/panut1.png'),
    img44:require('../../assets/welcome3/seafood1.png'),
    img55:require('../../assets/welcome3/sesame1.png'),
    img66:require('../../assets/welcome3/soy1.png'),
    img77:require('../../assets/welcome3/sulfite1.png'),
    img88:require('../../assets/welcome3/treenut1.png'),
    img99:require('../../assets/welcome3/wheat1.png'),
};

export default class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.setState({
            activeIndex:0, 
            allergies:{dairy:'false',egg:'false',gluten:'false',peanut:'false',seafood:'false',sesame:'false',soy:'false',treenut:'false',wheat:'false',sulfite:'false'},

        })
        ITEMS_KEY.forEach((key)=>{
            this.state = {[key]: false}
        })
    }

    renderImage = (index) => {
        const itemKey = ITEMS_KEY[index]
        let output = this.state[itemKey] ? Arrayimages[index] : Arrayimages2[index];

        return  <Image style={{width: 92, height:92 }} source={output} />
    }
    renderImage = (index) => {
        return <Image style={{width: 20, height: 20}} source={this.state.route.iconSelected}/>;
    }

    segrantClicked0 = (index) => {
        this.setState({
            egg: index,
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/egg').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked1 = (index) => {
        this.setState({
            gluten: index,
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/gluten').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked2 = (index) => {
        this.setState({
            peanut: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/peanut').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked3 = (index) => {
        this.setState({
            seafood: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/seafood').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked4 = (index) => {
        this.setState({
            sesame: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/sesame').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked5 = (index) => {
        this.setState({
            soy: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/soy').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked6 = (index) => {
        this.setState({
            sulfite: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/sulfite').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked7 = (index) => {
        this.setState({
            treenut: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/treenut').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked8= (index) => {
        this.setState({
            wheat: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/wheat').set(result)
         }
        catch(error){
            console.log(error)
        }
    }
    segrantClicked9 = (index) => {
        this.setState({
            dairy: index
        })
        let result=true
        let id=firebase.auth().currentUser.uid
        try{
        firebase.database().ref('users/' +id).child('/allergies/dairy').set(result)
         }
        catch(error){
            console.log(error)
        }
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
                    <WelcomeHeader pageIndex="4"/>
                </View>
                    <View style={styles.headerView}>

                        <View style={{height: 75}}>
                            <Text  style={styles.name}> Do you have any food allergies? </Text>
                            <Text style={{alignSelf: 'center', textAlign: 'center'}}>
                                Choose as many as you like (or none at all) and tap 'Next'
                                {'\n'}
                                You can change these any time in your Preference.</Text>
                        </View>

                        
                     
            <ScrollView style={{flexDirection: 'column'}}>
                    <View style={{marginLeft: 1,flexDirection: 'row',justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        onPress={() => this.segrantClicked0(0)} active={this.state.egg == 0}>
                        <Image  style={styles.inputIcon} source={this.state.egg== 0 ? Arrayimages.img1 : Arrayimages2.img11}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked1(1)} active={this.state.gluten == 1}>
                        <Image  style={styles.inputIcon} source={this.state.gluten == 1 ? Arrayimages.img2 : Arrayimages2.img22}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked2(2)} active={this.state.peanut == 2}>
                        <Image  style={styles.inputIcon} source={this.state.peanut == 2 ? Arrayimages.img3 : Arrayimages2.img33}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 10,flexDirection: 'row',justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        onPress={() => this.segrantClicked3(3)} active={this.state.seafood == 3}>
                        <Image  style={styles.inputIcon} source={this.state.seafood == 3 ? Arrayimages.img4 : Arrayimages2.img44}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked4(4)} active={this.state.sesame == 4}>
                        <Image  style={styles.inputIcon} source={this.state.sesame == 4 ? Arrayimages.img5 : Arrayimages2.img55}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked5(5)} active={this.soy == 5}>
                        <Image  style={styles.inputIcon} source={this.state.soy == 5 ? Arrayimages.img6 : Arrayimages2.img66}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 10,flexDirection: 'row',justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        onPress={() => this.segrantClicked6(6)} active={this.state.sulfite == 6}>
                        <Image  style={styles.inputIcon} source={this.state.sulfite == 6 ? Arrayimages.img7 : Arrayimages2.img77}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked7(7)} active={this.state.treenut == 7}>
                        <Image  style={styles.inputIcon} source={this.state.treenut == 7 ? Arrayimages.img8 : Arrayimages2.img88}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:40}}
                        onPress={() => this.segrantClicked8(8)} active={this.state.wheat == 8}>
                        <Image  style={styles.inputIcon} source={this.state.wheat == 8 ? Arrayimages.img9 : Arrayimages2.img99}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 10,flexDirection: 'row',justifyContent: 'space-around'}}>
                    <TouchableOpacity
                        onPress={() => this.segrantClicked9(9)} active={this.state.dairy == 9}>
                        <Image  style={styles.inputIcon} source={this.state.dairy == 9 ? Arrayimages.img0 : Arrayimages2.img00}/>
                    </TouchableOpacity>
                    </View>
                   
            </ScrollView>
                       

                        <View style={{height: 75}}>
                            <TouchableHighlight style={[styles.buttonContainer,styles.NextButton,]}
                                                onPress={() => this.props.navigation.navigate('Welcome4')}>
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
    inputIcon: {
        width: 80,
        height: 80,
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
        marginLeft: 20,
        marginRight: 20,
    },
});
