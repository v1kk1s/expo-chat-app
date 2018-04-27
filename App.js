import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from './Home';
import UserPage from './UserPage'

const Roots = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    User: {
      screen: UserPage,
    }
  }, {
    initialRouteName: 'Home',
  },
);

const App = () => (
  <Roots />
);

export default App;
