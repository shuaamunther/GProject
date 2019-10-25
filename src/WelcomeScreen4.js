import React, {Component} from 'react';
//import rect in our project
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Text,
    TouchableHighlight,
} from 'react-native';

class Header extends React.Component {
    state = {checked: false}
    renderItem = ({item, index}) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]}/>;
        }
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.key}</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.header}>
                <Image style={{marginLeft: 17, marginTop: -18,}}
                       source={require('../assets/tap5.png')}/>
                <Text style={styles.name}>Last step!
                                            {'\n'}
                        Tell us what you're interested in</Text>
            </View>
        );
    }
}

export default class Grid extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: {},
        };
    }

    componentDidMount() {
        var that = this;
        let items = Array.apply(null, Array(60)).map((v, i) => {
            return {id: i, src: 'http://placehold.it/200x200?text=' + (i + 1)};
        });
        that.setState({
            //Setting the data source
            dataSource: items,
        });
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Header/>
                <FlatList  data={this.state.dataSource}
                           renderItem={({item}) => (
                        <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
                            <Image style={styles.imageThumbnail} source={{uri: item.src}}/>
                        </View>
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton, styles.description]}
                                            onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text style={styles.loginText}>Next</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        height: 140,
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
    body: {
        marginTop: 0,
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
        alignSelf: 'center',
        marginTop: 50,
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
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
    },
    loginText: {
        color: 'white',
    },
    headerStarText: {
        fontSize: 18,
        top: '40%',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
    row: {
        flexDirection: 'row',

    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ecf0f1',
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    PreviewIcon: {
        width: 150,
        height: 100,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 22
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});

