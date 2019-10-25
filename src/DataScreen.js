import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import CardScreen from '../src/CardScreen';

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
export default class DataScreen extends React.Component {
  render(){
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
             keyExtractor={item => item.id}/>
    </SafeAreaView>
    
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});