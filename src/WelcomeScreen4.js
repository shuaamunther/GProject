import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,
          Button,
           TouchableHighlight,
             Image,FlatList, Dimensions,
             CheckBox,
             SafeAreaView,
             PhotoGrid,
               Alert}
            from 'react-native';
            import { createAppContainer } from 'react-navigation';
            import { createStackNavigator } from 'react-navigation-stack';                     
   import * as firebase from 'firebase'; 
//import SignUpScreenshuaa from '/SignUpScreenshuaa';
const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  { key: 'K' },
  { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;

    export default class Welcome extends  React.Component {
      renderItem = ({ item, index }) => {
        if (item.empty === true) {
          return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
          <View
            style={styles.item}
          >
            <Text style={styles.itemText}>{item.key}</Text>
          </View>
        );
      };
        render()
         {
          return (
            <SafeAreaView style={styles.container}>
      
        <View style={styles.header} >
         <Image
          style={styles.botto}
          source={require('../assets/tap5.png')} />
          <Text
              style={styles.name} >
                  {'\n'}{'\n'} {'\r'}  {'\r'}Last step! Tell us what you're 
                  {'\r'}{'\r'}{'\r'} interested in                         </Text>
        </View>
       
      
      
      
    
             
              <View style={styles.body}>
              
                <View style={styles.bodyContent}>
                
                <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
              
             <TouchableHighlight style={[ styles.buttonContainer,
                                           styles.loginButton,styles.description]} 
                                            onPress={() => this.props.navigation.navigate('Profile')} >   
                                              <Text style={styles.loginText}>Next</Text> 
                                                </TouchableHighlight>
                             
              
                   </View>
                </View>
            </SafeAreaView>
          );
        }
      }
     
      
      const styles = StyleSheet.create({
        header: {
          backgroundColor: 'white',
          height: 200,
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
        name: {
          fontSize: 22,
          color: '#FFFFFF',
          fontWeight: '600',
        },
        body: {
          marginTop: 20,
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
       loginButton: {
backgroundColor: "#00b5ec",
marginBottom:20,
width:100,
borderRadius:30,

},loginText: {
    color: 'white',
    },
        titleText: {
          fontSize: 30,
          fontWeight: 'bold',
        },
      });
      