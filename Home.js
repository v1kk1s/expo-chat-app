import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { container, input } from './commonStyles';

class Home extends React.Component {
  state = {
    name: 'Unsigned user',
    channel: 'Test',
  };

  onBtnPress = () => {
    const { name, channel } = this.state;
    this.props.navigation.navigate('User', {
      name,
      channel,
    });
  };

  setName = (name) => {
    this.setState({ name: name });
  };

  setChanell = (channel) => {
    this.setState({ channel: channel });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Name'}
          onChangeText={this.setName}
        />

        <TextInput
          style={styles.input}
          placeholder={'Channel'}
          onChangeText={this.setChanell}
        />

        <Button
          title={'Join'}
          onPress={this.onBtnPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...container
  },
  input: {
    ...input
  },
  btn: {
    height: 50,
    width: '60%',
    marginTop: 20,
  },
});

export default Home;
