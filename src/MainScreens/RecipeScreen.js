import React, {Component} from 'react';
import { StyleSheet, Text, View,TextInput,
          Button,
           TouchableHighlight,
             Image, SafeAreaView, ScrollView ,
               Alert}
            from 'react-native';
            import { createAppContainer } from 'react-navigation';
            import { createStackNavigator } from 'react-navigation-stack';                     
   import * as firebase from 'firebase'; 

export default class register extends React.Component{



render(){
  return (
   <SafeAreaView style={styles.container}>
   <ScrollView style={styles.scrollView}>
   
        <View style={styles.container}>
        <Image style={styles.recipeImage} source={require('../../assets/recipeImage.jpg')}/>
        </View>
		
		<Text style={styles.titleText}>Pan Cakes{'\n'}{'\n'}</Text>
		
		<Text style={styles.titleText}>Rate : 8{'\n'}{'\n'}</Text>
		
		<View style={styles.container}>
		<Text>
         Step 1 {'\n'}{'\n'}
         Whisk eggs, milk and vanilla together in a jug. Sift flour into a large bowl. Stir in sugar. Make a well in the centre. Add milk mixture. Whisk until just combined.
         {'\n'}{'\n'}
		 Step 2 {'\n'}{'\n'}
         Heat a large non-stick frying pan over medium heat. Grease pan with butter or spray with cooking oil. Using 1/4 cup mixture per pancake, cook 2 pancakes for 2 minutes or until bubbles appear on surface. Turn and cook for a further 1-2 minutes or until cooked through. Transfer to a plate. Cover loosely with foil to keep warm. Repeat with remaining mixture, greasing pan with butter or cooking oil between batches.
         {'\n'}{'\n'}
		 Step 3 {'\n'}{'\n'}
         Serve with maple syrup and extra butter.
		</Text>
		</View>
   </ScrollView>
   </SafeAreaView>
  
  );
}

}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center', 
  justifyContent: 'center'
  ,
},
scrollView: {
    marginHorizontal: 20,
},
recipeImage:{
  height: 300,
  width: 300	
},
titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

