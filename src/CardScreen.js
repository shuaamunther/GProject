import React from 'react';
import {Text, View, StyleSheet, Image, FlatList, TouchableHighlight} from 'react-native';
import { Card, Button } from 'react-native-elements';
import {withNavigation} from 'react-navigation'


class HeaderUserView extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => {this.props.navigation.navigate('Profile', {user_id: this.props.user_id})}}>
                <View style={styles.headerUserView}>
                    <Image
                        source={this.props.userImage ? this.props.userImage : require('../assets/logouser.png')}
                        style={{width: 42, height: 42, borderRadius: 42 / 2}}
                    />
                    <Text style={{marginLeft: 12, fontSize: 18}}>{this.props.userName}</Text>
                </View>
            </TouchableHighlight>

        )
    }
}


class HeaderImageView extends React.Component {
    render() {
        return(
            <View>
            <Image
                style={styles.headerImage}
                source={ {uri:'https://www.aljamila.com/sites/default/files/styles/ph2_1000_auto/public/4ddfe2b4cf545d29f15711e006083fe1dfe7383f.jpg?itok=dfdu4DNjhttp://wallpaperart.altervista.org/Immagini/sfondo-natura-1280x800.jpg'}}
                />
            <View style={styles.headerStarView}>
            <Image
                style={styles.headerStarIcon}
                source={require('../assets/star.png')}
                />
            <Text style={styles.headerStarText}>
                {this.props.rate}
            </Text>
            </View>
            <View style={{flex:1,flexDirection:'row',marginTop:20,marginLeft:20,justifyContent: 'space-between',alignItems:'flex-start',marginBottom:-20}}>
                        <View style={{flex:1,flexDirection:'column',justifyContent: 'space-between',}}>
                           <TouchableHighlight>
                              <Image style={styles.inputIcon} source={require('../assets/like.png')}/> 
                           </TouchableHighlight>
                           <Text style={{fontSize:20}}>3</Text>
                           </View>
                           <View style={{flex:5,flexDirection:'column',justifyContent: 'space-between'}}>
                         <TouchableHighlight>
                             <Image style={styles.inputIcon} source={require('../assets/book.png')}/> 
                         </TouchableHighlight>
                         <Text style={{fontSize:20}}>10</Text>
                    </View>
                </View>
        </View>
        )
    }
}

class HeaderTextView extends React.Component {
    render() {
        return(
            <View style= {styles.headerView} >
                <View style = {styles.ViewText} >
                  
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                    <Text>
                        {this.props.type}
                    </Text>
                </View>

                <View style = {styles.ViewButton} >
                <TouchableHighlight style={[styles.buttonContainer,styles.MoreButton]}>
                        <Text style={styles.MoreText}>More</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

class CardScreen extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <Card containerStyle={{padding: 0, borderRadius: 10,borderColor:"#00b5ec"}}>
                    <HeaderUserView userName={this.props.cardItem.userName} navigation={this.props.navigation} user_id={this.props.cardItem.user_id}/>
                    <HeaderImageView rate={this.props.cardItem.rate} />
                    <HeaderTextView  title={this.props.cardItem.title}
                                     type={this.props.cardItem.type} />
                </Card>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      borderRadius:8,
    },
    headerUserView: {
        marginLeft: 8,
        marginTop: 8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerImage:{
        backgroundColor: "#c3c3c3",
        height:200,
        width: '100%',
        borderColor: "white",
    },
    headerStarView: {
        position: 'absolute',
        top:5,
        right:5,
        height: 55,
        width: 55,
    },
    buttonContainer: {
        marginTop: 30,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: '#00BFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    MoreButton: {
        backgroundColor: "#00b5ec",
        marginBottom: 40,
        width: 80,
        height:30,
        borderRadius:10,
        marginTop: 50,
        marginBottom: 10,
    },
    MoreText: {
        color: 'white',
        fontSize:16
    },
    headerStarIcon: {
        height: '100%',
        width: '100%',
    },
    headerStarText: {
        fontSize: 16,
        fontWeight: "bold",
        top: '35%',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
    headerView: {
        height: 100,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
    },
    ViewText:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'flex-start'
    },
    ViewButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'flex-end',
    },
    titleText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    },
    likeText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: -10,
        justifyContent: 'center',
        marginTop:-18,
    },
  });
export default withNavigation(CardScreen);