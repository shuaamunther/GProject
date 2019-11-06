import React from 'react';
import { Text, View, StyleSheet ,Image,FlatList} from 'react-native';
import { Card, Button } from 'react-native-elements';

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
                    <Text style={styles.DiscriptionnText}>
                        {this.props.type}
                    </Text>
                </View>

                <View style = {styles.ViewButton} >
                    <Button title="Show" />
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
                <Card containerStyle={{padding: 0, borderRadius: 10}}>
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
      marginTop: 8,
      borderRadius:8,
    },
    headerImage:{
        backgroundColor: "#c3c3c3",
        height:200,
        width: '100%',
        borderColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    headerStarView: {
        position: 'absolute',
        top:5,
        right:5,
        height: 68,
        width: 68,
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
        height: 120, 
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
        alignItems:'flex-end'
    },
    titleText: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
    },
  });
export default CardScreen;