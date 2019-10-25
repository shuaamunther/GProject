import React from 'react';
import { Text, View, StyleSheet ,Image} from 'react-native';
import { Card, Button } from 'react-native-elements';

const DATA = [
    {
      id: '1',
      title: 'Mulukhya',
      Rate: '5',
      type :'lunch',
      img:'https://modo3.com/thumbs/fit630x300/90616/1456142390/%D8%B7%D8%B1%D9%8A%D9%82%D8%A9_%D8%B9%D9%85%D9%84_%D9%85%D9%84%D9%88%D8%AE%D9%8A%D8%A9.jpg'
    },
    {
      id: '2',
      title: 'Salat',
      Rate: '4',
      type:'lunch',
      img:'https://shamlola.s3.amazonaws.com/Shamlola_Images/5/src/6aad258521393faaba0ce5d7c042c32090880d35.jpg'
    },
    {
      id: '3',
      title: 'Pizza',
      Rate: '5',
      type:'lunch',
      img:'https://modo3.com/thumbs/fit630x300/51334/1435144381/%D8%B7%D8%B1%D9%8A%D9%82%D8%A9_%D8%B9%D9%85%D9%84_%D8%B9%D8%AC%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D8%A8%D9%8A%D8%AA%D8%B2%D8%A7_%D8%A7%D9%84%D8%A5%D9%8A%D8%B7%D8%A7%D9%84%D9%8A%D8%A9.jpg'
    },
    {
      id: '4',
      title: 'Maqluba',
      Rate: '3',
      type:'lunch',
      img:'https://modo3.com/thumbs/fit630x300/197745/1535959216/%D8%B7%D8%B1%D9%8A%D9%82%D8%A9_%D8%B9%D9%85%D9%84_%D9%85%D9%82%D9%84%D9%88%D8%A8%D8%A9_%D8%A7%D9%84%D8%AF%D8%AC%D8%A7%D8%AC.jpg'
    },
    
    {
      id: '5',
      title: 'ice cream',
      Rate: '2',
      type:'snacks',
      img:'https://www.hiamag.com/sites/default/files/styles/ph2_960_600/public/recipe/6163561-1815518080.JPG'
    },
  
  ];
    function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
class HeaderImageView extends React.Component {
    render() {
        return(
            <View>
            <Image 
                style={styles.headerImage} 
                source={ {uri:'http://wallpaperart.altervista.org/Immagini/sfondo-natura-1280x800.jpg'}}
                />
            <View style={styles.headerStarView}>
            <Image 
                style={styles.headerStarIcon} 
                source={require('../assets/star.png')}
                />
            <Text style={styles.headerStarText}>
                5
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
                        Title
                    </Text>
                    <Text style={styles.DiscriptionnText}>
                        type
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
                    <HeaderImageView /> 
                    <HeaderTextView />                               
                    </Card>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      backgroundColor: '#ecf0f1',
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
        height: 92,
        width: 92,
    },
    headerStarIcon: {
        height: '100%',
        width: '100%',
    },
    headerStarText: {
        fontSize: 18,
        top: '40%',
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