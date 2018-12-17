// https://appdividend.com/2018/03/20/react-native-navigation-example-tutorial/
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Settings from './screens/Settings';
import Home from './screens/Home';

const AppNavigator = StackNavigator({
  SettingScreen: { screen: Settings },
  HomeScreen: { screen: Home }
});


export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
