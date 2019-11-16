import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native';

import TagInput from 'react-native-tags-input';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: []
      },
    };
  }
  
  updateTagState = (state) => {
      this.setState({
        tags: state
      })
    };

  render() {
    return (
      <View style={styles.container}>
        <TagInput style={{ minWidth: 335,
                           height: 32,
                           margin: 4,
                           borderRadius: 16,
                           backgroundColor: '#E3F2FD',
                           marginLeft: 10,}}
          updateState={this.updateTagState}
          tags={this.state.tags}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});