import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {withNavigation} from 'react-navigation';
import * as  firebase from "firebase";
import {ListItem, SearchBar} from 'react-native-elements';
//import {db} from './../../db'
import {TouchableOpacity} from 'react-native-gesture-handler';

let itemsRef = firebase.database().ref('/users/');

class FlatListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            arrayholder: []
        };
        this.renderItem = this.renderItem.bind(this)
    }

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            var aux = [];
            snapshot.forEach((child) => {
                aux.push({
                    name: child.val().fullname,
                    phone: child.val().phone,
                    email: child.val().email,
                    image: child.val().image,
                    uid: child.key
                });
            });
            this.setState({arrayholder: aux});
            this.setState({data: aux});
        });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.state.arrayholder.filter(item => {
            const itemData = $`{item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    renderItem(data) {
        let {item, index} = data;
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Chat', {
                    uid: item.uid, email: item.email, name: item.name,
                    image: item.image
                })
            }}>
                <ListItem
                    leftAvatar={{source: {uri: item.image}}}
                    title={`${item.name}`}
                    subtitle={item.email}
                />
            </TouchableOpacity>
        )
    }

    Return() {
        this.props.navigation.navigate('Home1')
    }

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            );
        }
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}

export default withNavigation(FlatListDemo);
