import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { container, input } from './commonStyles';
import { subscribeToMessages, addMessage } from './mssages';

class UserPage extends React.Component {
  state = {
    messages: [],
    messageDraft: '',
  };

  componentDidMount() {
    const { channel } = this.props.navigation.state.params;
    subscribeToMessages({ channel, callback: (msgs) => this.setState({ messages: msgs }) });
  }

  sendMessage = () => {
    const { name } = this.props.navigation.state.params;
    addMessage({ 
      text: this.state.messageDraft,
      sender: name,
     });
     this.setState({ messageDraft: '' });
  };

  onTextChange = (msg) => {
    this.setState({ messageDraft: msg });
  };

  renderItem = ({ item }) => <View style={[styles.transformed, styles.msg]}>
    <Text>{item.text} from {item.sender}</Text>
  </View>

  keyExtractor = (msg) => msg.id;

  render() {
    const { name, channel } = this.props.navigation.state.params;
    const { messageDraft, messages } = this.state;
  
    return (
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={100}
            enabled
            style={styles.container}
          >
            <Text style={styles.text}>{`Hello ${name} in channel "${channel}"!`}</Text>

            <View style={[styles.transformed, { height: '70%' }]}>
              <FlatList
                inverted
                data={messages}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </View>

            <View style={styles.wrap}>

              <TextInput
                value={messageDraft}
                style={styles.input}
                onChangeText={this.onTextChange}
                placeholder={'Your message goes here'}
              />

              <Button
                disabled={!messageDraft}
                style={styles.btn}
                title={'Send message'}
                onPress={this.sendMessage}
              />
            </View>
          </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...container,
  },
  wrap: {
    marginTop: 30,
    marginBottom: 20,
  },
  input: {
    ...input
  },
  btn: {
    width: '100%',
  },
  text: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    color: 'white',
  },
  msg: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  transformed: { transform: [{ scaleY: -1 }]}
});

export default UserPage;
