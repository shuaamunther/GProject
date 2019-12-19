import React, {Component} from 'react'
import {
    StyleSheet, Platform, Image, Text, View, TouchableOpacity, TabView,
    TextInput,
    ScrollView,
    FlatList,
    TouchableHighlight,
    ActivityIndicator,
    CheckBox,
    Switch, KeyboardAvoidingView,
} from 'react-native'
import CardListScreen from './component/CardListScreen';
//import Firebase from 'C:/Project/AwesomeProject/firebase.js'
import * as firebase from 'firebase';
import {StackActions, NavigationActions, createAppContainer} from 'react-navigation';
import {Card, Button, List, ListItem} from 'react-native-elements';
import Modal from "react-native-modal";
import TagInput from 'react-native-tags-input';
import RNPickerSelect from 'react-native-picker-select';
import PushNotification from "react-native-push-notification";

export default class RecommendationScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            Search: '',
            UserSearch: '',
            recipe: [],
            users: [],
            source: '',
            visibleModal: null,
            visibleModal2: null,
            myRecipe:[]
        }
    }
    fuzzy_test(){
        let user_id = 'zuUj1R8dWgaYygy3oA1bRlKXxVL2'
        let user_rates = [];
        let followingrates=[];
        try {
            firebase.database().ref('/users/'+user_id).on("value", function (snapshot) { 
                user_rates = snapshot.child('rates').val()
                 firebase.database().ref().child('users/'+user_id+'/follwing').on("value", function (snapshot) {
                    snapshot.forEach(function (item) {
                       firebase.database().ref().child('users/'+item.val()+'/rates').on("value", function (snapshot) { 
                          followingrates.push(snapshot.val())
                       }.bind(this))
                       
                   }.bind(this))
                }.bind(this))
            
        }).bind(this)
            //fuzzification for input
function UR_L(x){
    if(x>=1 && x<=2){
        return 1;
    }
    else if(x>2 && x<=2.5){
        return (2.5-x)/0.5;
    }
    else //x>= 2.5
    {
        return 0;
    }
}
function UR_M(x){
    if(x>=2.25 && x<=3){
        return (x-2.25)/0.75
    }
    else if(x>3 && x<=3.75){
        return (3.75-x)/0.75
    }
    else //x<2.25 or x>3.75
    {
        return 0;
    }
}
function UR_H(x){
    if(x>=3.5 && x<=4){
        return (x-3.5)/0.5
    }
    else if(x>4){
        return 1;
    }
    else//x<3.5 
    {
      return 0;
    }
}
//fuzzification for output
function P_VL(x){
    if(x>=0 && x<=0.5){
        return 1;
    }
    else if(x>0.5 && x<=1.5){
        return (1.5-x)/1
    }
    else//x>1.5
    {
        return 0;
    }
}
function P_L(x){
    if(x>=1 && x<=2.5){
        return (x-1)/1.5
    }
    else if(x>2.5 && x<=4){
        return (4-x)/1.5
    }
    else //x<1 or x>4
    {
        return 0;
    }
}
function P_M(x){
    if(x>=3.5 && x<=5){
        return (x-3.5)/1.5
    }
    else if(x>5 && x<=6.5){
        return (6.5-x)/1.5
    }
    else //x<3.5 or x>6.5
    {
        return 0;
    }
}
function P_H(x){
    if(x>=6 && x<=7.5){
        return (x-6)/1.5
    }
    else if(x>7.5 && x<=9){
        return (9-x)/1.5
    }
    else //x<6 or x>9
    {
        return 0;
    }
}
function P_VH(x){
    if(x>=8.5 && x<=9.5){
        return (x-8.5)/1;
    }
    else if(x>9.5 && x<=10){
        return 1;
    }
    else//x<8.5
    {
        return 0;
    }
}
            for(let i=0;i<followingrates.length;i++)
            {
                 let score=0
                 //arabian
                 if(UR_L(user_rates.ar)>=0.8){
                     if(UR_L(followingrates[i].ar))
                     score++
                 }
                 else if(UR_H(user_rates.ar)>=0.8){
                    if(UR_H(followingrates[i].ar))
                    score++
                }
                //asian
                if(UR_L(user_rates.as)>=0.8){
                    if(UR_L(followingrates[i].as))
                    score++
                }
                else if(UR_H(user_rates.as)>=0.8){
                   if(UR_H(followingrates[i].as))
                   score++
               }
               //european
               if(UR_L(user_rates.eu)>=0.8){
                if(UR_L(followingrates[i].eu))
                score++
                }
                    else if(UR_H(user_rates.eu)>=0.8){
                    if(UR_H(followingrates[i].eu))
                    score++
                }
                //fast
                if(UR_L(user_rates.fa)>=0.8){
                    if(UR_L(followingrates[i].fa))
                    score++
                }
                else if(UR_H(user_rates.fa)>=0.8){
                if(UR_H(followingrates[i].fa))
                score++
       }
                 
                 followingrates[i]['score'] = score;
        }
           let max_1 = {score : 0};
           let max_2 = {score : 0};
           for(var i=0; i<followingrates.length; i++){
               if(followingrates[i].score > max_1.score){
                   max_2 = max_1
                   max_1 = followingrates[i]
               }
               else if(followingrates[i].score > max_2.score){
                   max_2 = followingrates[i]
               }
           }
           let fuzzy_input = {}
           fuzzy_input['ar'] = (max_1.ar + max_2.ar)/2
           fuzzy_input['as'] = (max_1.as + max_2.as)/2
           fuzzy_input['eu'] = (max_1.eu + max_2.eu)/2
           fuzzy_input['fa'] = (max_1.fa + max_2.fa)/2

           console.log(fuzzy_input)
           var arabian =fuzzy_input.ar;
            var asian =fuzzy_input.as;
            var european =fuzzy_input.eu;
            var fast =fuzzy_input.fa;


    
           let rules =[
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_L(eu),UR_L(fa))}, //1
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_L(eu),UR_M(fa))}, //2
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_L(eu),UR_H(fa))}, //3
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_M(eu),UR_L(fa))}, //4
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_M(eu),UR_M(fa))}, //5
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_M(eu),UR_H(fa))}, //6
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_H(eu),UR_L(fa))}, //7
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_H(eu),UR_M(fa))}, //8
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_L(as),UR_H(eu),UR_H(fa))}, //9
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_L(eu),UR_L(fa))}, //10
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_L(eu),UR_M(fa))}, //11
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_L(eu),UR_H(fa))}, //12
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_M(eu),UR_L(fa))}, //13
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_M(eu),UR_M(fa))}, //14
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_M(eu),UR_H(fa))}, //15
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_H(eu),UR_L(fa))}, //16
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_H(eu),UR_M(fa))}, //17
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_M(as),UR_H(eu),UR_H(fa))}, //18
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_L(eu),UR_L(fa))}, //19
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_L(eu),UR_M(fa))}, //20
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_L(eu),UR_H(fa))}, //21
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_M(eu),UR_L(fa))}, //22
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_M(eu),UR_M(fa))}, //23
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_M(eu),UR_H(fa))}, //24
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_H(eu),UR_L(fa))}, //25
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_H(eu),UR_M(fa))}, //26
                function(ar,as,eu,fa){return Math.min(UR_L(ar),UR_H(as),UR_H(eu),UR_H(fa))}, //27
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_L(eu),UR_L(fa))}, //28
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_L(eu),UR_M(fa))}, //29
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_L(eu),UR_H(fa))}, //30
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_M(eu),UR_L(fa))}, //31
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_M(eu),UR_M(fa))}, //32
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_M(eu),UR_H(fa))}, //33
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_H(eu),UR_L(fa))}, //34
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_H(eu),UR_M(fa))}, //35
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_L(as),UR_H(eu),UR_H(fa))}, //36
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_L(eu),UR_L(fa))}, //37
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_L(eu),UR_M(fa))}, //38
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_L(eu),UR_H(fa))}, //39
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_M(eu),UR_L(fa))}, //40
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_M(eu),UR_M(fa))}, //41
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_M(eu),UR_H(fa))}, //42
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_H(eu),UR_L(fa))}, //43
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_H(eu),UR_M(fa))}, //44
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_M(as),UR_H(eu),UR_H(fa))}, //45
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_L(eu),UR_L(fa))}, //46
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_L(eu),UR_M(fa))}, //47
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_L(eu),UR_H(fa))}, //48
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_M(eu),UR_L(fa))}, //49
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_M(eu),UR_M(fa))}, //50
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_M(eu),UR_H(fa))}, //51
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_H(eu),UR_L(fa))}, //52
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_H(eu),UR_M(fa))}, //53
                function(ar,as,eu,fa){return Math.min(UR_M(ar),UR_H(as),UR_H(eu),UR_H(fa))}, //54
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_L(eu),UR_L(fa))}, //55
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_L(eu),UR_M(fa))}, //56
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_L(eu),UR_H(fa))}, //57
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_M(eu),UR_L(fa))}, //58
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_M(eu),UR_M(fa))}, //59
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_M(eu),UR_H(fa))}, //60
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_H(eu),UR_L(fa))}, //61
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_H(eu),UR_M(fa))}, //62
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_L(as),UR_H(eu),UR_H(fa))}, //63
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_L(eu),UR_L(fa))}, //64
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_L(eu),UR_M(fa))}, //65
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_L(eu),UR_H(fa))}, //66
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_M(eu),UR_L(fa))}, //67
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_M(eu),UR_M(fa))}, //68
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_M(eu),UR_H(fa))}, //69
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_H(eu),UR_L(fa))}, //70
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_H(eu),UR_M(fa))}, //71
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_M(as),UR_H(eu),UR_H(fa))}, //72
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_L(eu),UR_L(fa))}, //73
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_L(eu),UR_M(fa))}, //74
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_L(eu),UR_H(fa))}, //75
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_M(eu),UR_L(fa))}, //76
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_M(eu),UR_M(fa))}, //77
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_M(eu),UR_H(fa))}, //78
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_H(eu),UR_L(fa))}, //79
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_H(eu),UR_M(fa))}, //80
                function(ar,as,eu,fa){return Math.min(UR_H(ar),UR_H(as),UR_H(eu),UR_H(fa))}, //81
                
            ]
    //-----------------------------------------------------------------------------------
    //execute the rules for each output
    function execute(rule_numbers,arabian,asian,european,fast){
        let max = rules[rule_numbers[0]](arabian,asian,european,fast)
    for (var i=0; i<rule_numbers.length;i++){
        let temp = rules[rule_numbers[i]](arabian,asian,european,fast);
        max = Math.max(max, temp)
    }
    return max;
    }
    //arabian
    var ar_out_VL=execute([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],arabian,asian,european,fast);
    var ar_out_L =execute([32,34,35,38,40,41,42,43,44,46,47,48,49,50,51,52,53,71,77,79,80],arabian,asian,european,fast);
    var ar_out_M =execute([29,31,33,37,39,45,59,61,62,65,68,69,70,73,74,75,76,78],arabian,asian,european,fast);
    var ar_out_H =execute([28,30,36,55,56,57,58,60,63,64,66,67,72],arabian,asian,european,fast);
    var ar_out_VH=execute([27,54],arabian,asian,european,fast);
    
    //asian
    var as_out_VL=execute([0,1,2,3,4,5,6,7,8,27,28,29,30,31,32,33,34,35,54,55,56,57,58,59,60,61,62],arabian,asian,european,fast);
    var as_out_L =execute([14,16,17,38,40,41,42,43,44,53,64,65,66,67,68,69,70,71,77,79,80],arabian,asian,european,fast);
    var as_out_M =execute([11,13,15,23,25,26,37,39,47,50,51,52,63,73,74,75,76,78],arabian,asian,european,fast);
    var as_out_H =execute([10,12,19,20,21,22,24,36,45,46,48,49,74],arabian,asian,european,fast);
    var as_out_VH=execute([9,18],arabian,asian,european,fast);
    //european
    var eu_out_VL=execute([0,1,2,9,10,11,18,19,20,27,28,29,36,37,38,45,46,47,54,55,56,63,64,65,72,73,74],arabian,asian,european,fast);
    var eu_out_L =execute([14,22,23,32,40,41,48,49,50,53,58,59,66,67,68,71,75,76,77,79,80],arabian,asian,european,fast);
    var eu_out_M =execute([5,13,17,21,25,26,31,35,39,44,51,52,57,61,62,69,70,79],arabian,asian,european,fast);
    var eu_out_H =execute([4,7,8,12,15,16,24,30,33,34,42,43,60],arabian,asian,european,fast);
    var eu_out_VH=execute([3,6],arabian,asian,european,fast);
    //fast
    var fa_out_VL=execute([0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78],arabian,asian,european,fast);
    var fa_out_L =execute([16,22,25,34,40,43,46,49,52,53,58,61,64,67,70,71,73,76,77,79,80],arabian,asian,european,fast);
    var fa_out_M =execute([7,13,17,19,23,26,31,35,37,44,47,50,55,59,62,65,69,74],arabian,asian,european,fast);
    var fa_out_H =execute([4,5,8,10,11,14,20,28,29,32,38,41,56],arabian,asian,european,fast);
    var fa_out_VH=execute([1,2],arabian,asian,european,fast);
    // ----------------------------------------------------------------------------------------------------------------
    // get results for arabian
    
    let n=0;
    let d=0;
    for (var  i = 0; i<11; i+=0.5){
       
        let degree =  Math.max(Math.min(P_VL(i), ar_out_VL), Math.min(P_L(i), ar_out_L), Math.min(P_M(i), ar_out_M), Math.min(P_H(i), ar_out_H), Math.min(P_VH(i), ar_out_VH))
        n += i * degree
        d += degree
    
    }
    let output_arabian = n/d;
    console.log(output_arabian) 
    
    //get results for asian
    
    n=0;
    d=0;
    for (var  i = 0; i<11; i+=0.5){
       
        let degree =  Math.max(Math.min(P_VL(i), as_out_VL), Math.min(P_L(i), as_out_L), Math.min(P_M(i), as_out_M), Math.min(P_H(i), as_out_H), Math.min(P_VH(i), as_out_VH))
        n += i * degree
        d += degree
    
    }
    let output_asian = n/d;
    console.log(output_asian) 
    
    //get results for european
    
    n=0;
    d=0;
    for (var  i = 0; i<11; i+=0.5){
       
        let degree =  Math.max(Math.min(P_VL(i), eu_out_VL), Math.min(P_L(i), eu_out_L), Math.min(P_M(i), eu_out_M), Math.min(P_H(i), eu_out_H), Math.min(P_VH(i), eu_out_VH))
        n += i * degree
        d += degree
    
    }
    let output_european = n/d;
    console.log(output_european) 
    
    //get results for fast
    
    n=0;
    d=0;
    for (var  i = 0; i<11; i+=0.5){
       
        let degree =  Math.max(Math.min(P_VL(i), fa_out_VL), Math.min(P_L(i), fa_out_L), Math.min(P_M(i), fa_out_M), Math.min(P_H(i), fa_out_H), Math.min(P_VH(i), fa_out_VH))
        n += i * degree
        d += degree
    
    }
    let output_fast = n/d;
    console.log(output_fast) 

    //get recipes for arabian //firebase get as much as the number from output
     
    //get recipes for asian

    //get recipes for european

    //get recipes for fast
            
        } 
        catch (error) {
            console.log(error)

        }
    }


    componentWillMount(){
        this.fuzzy_test()
    }



    render(){
        return(
        <Text>test</Text>
        );
    }



}
