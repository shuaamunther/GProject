import React,{Component} from 'react'
import { StyleSheet, Platform, Image, Text, View,TouchableOpacity,TabView,
         TabBar,
           SceneMap,
              NavigationState,
                 SceneRendererProps,
                Icon,
                Dimensions,
                SearchBar,
                TextInput,
                TouchableHighlight,
              } from 'react-native'


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Card, Button } from 'react-native-elements';
 class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Search: ''
    }
  }

  updateSearch = search => {
    this.setState({ search });
  };


    render() {
      const { search } = this.state;

      return (
        <View style={styles.row}>
        <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={require('../assets/search.png')}/>
        <TextInput style={styles.inputs}
            placeholder="Search..."
            autoCapitalize="none"
            
            underlineColorAndroid='transparent'
            onChangeText={(search) => this.updateSearch}
                value={this.state.search}/>
               </View>
            
      </View>
        );
      }
}
class ButtonFilter extends React.Component {
  _onPressButton1() {
    
  }
  _onPressButton2() {
    
  }
  _onPressButton3() {
    
  }

render(){
  return(<View style = {styles.FilterButton}>
          <TouchableHighlight style={[
             styles.buttonContainer,
                 styles.SearchButton,]} 
                 onPress={this._onPressButton1}
                 underlayColor="#00b5ec"
            >
                  <Text style={styles.loginText}>Search</Text>
                    </TouchableHighlight>

           <TouchableHighlight style={[
             styles.buttonContainer,
                 styles.SearchButton2]}  onPress={this._onPressButton2}
                 underlayColor="#00b5ec" >
                  <Text style={styles.loginText}>Search</Text>
                    </TouchableHighlight>     

           <TouchableHighlight style={[
             styles.buttonContainer,
                 styles.SearchButton3]}  onPress={this._onPressButton3}
                 underlayColor="#00b5ec" >
                  <Text style={styles.loginText}>Search</Text>
                    </TouchableHighlight>     
       </View>
    );
}

}
export default class SearchScreen extends React.Component {
  
  render() {
    return (
        <View   >
            <Search />
            
            <ButtonFilter/>

        </View>
    );
}
}


    const styles = StyleSheet.create({
      container: {
        paddingTop: 7,
        paddingLeft: 10,
        paddingRight: 10

    },
      row:{
        flexDirection: 'row',
        marginLeft:11,
        marginTop:7,
        marginBottom:-5,

      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#E3F2FD',
        borderRadius:30,
        borderBottomWidth: 1,
        borderTopWidth:0,
        width:340,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
      },
      inputs:{
        height:45,
        marginLeft:11,
        borderBottomColor: '#FFDE03',
        flex:1,
      },
      inputIcon:{
      width:25,
      height:25,
      marginLeft:15,
      justifyContent: 'center'
      },
      buttonContainer: {
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        },
        SearchButton: {
        backgroundColor: 'white',
        marginBottom:20,
        width:120,
        borderRadius:0,
        paddingTop: 0,
            paddingBottom: 0,
        
        height:20,
        alignItems: 'center',
        },
        SearchButton2: {
          backgroundColor: 'white',
          marginBottom:20,
          width:120,
          borderRadius:0,
          paddingTop: 0,
            paddingBottom: 0,
         
          height:20,
          alignItems: 'center',
          
          },
          SearchButton3 : {
            backgroundColor: 'white',
            marginBottom:20,
            width:120,
            borderRadius:0,
            paddingTop: 0,
            paddingBottom: 0,
            height:20,
            alignItems: 'center',
            
            
            },
        loginText: {
        color: "#00b5ec",
        
        
        },
        FilterButton:{
          flexDirection : 'row',
          marginTop: 0,
          justifyContent:'space-between',
          
          borderTopWidth:1,
          
          borderTopColor:"#00b5ec",
        },
      });
      