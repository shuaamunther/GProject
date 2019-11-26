import React from 'react';
import {Text, View, StyleSheet, Image, FlatList, TouchableHighlight,TouchableOpacity} from 'react-native';
import { Card, Button } from 'react-native-elements';
import {withNavigation} from 'react-navigation'
import * as firebase from 'firebase';

const Arrayimages = {
    Image1: require('../../../assets/like.png'),
    Image2: require('../../../assets/int_Likes.png'),
    Image3: require('../../../assets/book.png'),
    Image4: require('../../../assets/bookmark.png'),
    };
let sum=0;
let sum2=0;
class HeaderUserView extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => {this.props.navigation.navigate('Profile', {user_id: this.props.user_id})}}>
                <View style={styles.headerUserView}>
                    <Image
                        source={this.props.userImage ? this.props.userImage : require('../../../assets/logouser.png')}
                        style={{width: 42, height: 42, borderRadius: 42 / 2}}
                    />
                    <Text style={{marginLeft: 12, fontSize: 18}}>{this.props.userName}</Text>
                </View>
            </TouchableHighlight>

        )
    }
}

class UserCard extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Card containerStyle={{padding: 0, borderRadius: 10,borderColor:"#00b5ec"}}>
                    <HeaderUserView userName={this.props.userName} navigation={this.props.navigation} user_id={this.props.user_id}/>
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
        width: 40,
        height: 40,
        marginLeft: -10,
        justifyContent: 'center',
        marginTop:-18,
    },
  });
export default withNavigation(UserCard);