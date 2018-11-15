import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

class SignInScreen extends React.Component {
    constructor(){
        super();
        this.state={
            text:'PZ',
            sensData: ''

        }
    }
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
        <Text>{this.state.text}</Text>
      </View>
    );
  }

  _signInAsync = async () => {
      if (this.state.text) {
          await AsyncStorage.setItem('userToken', 'abc');
          this.props.navigation.navigate('App');
      }
      else {
          this.props.navigation.navigate('AddSens');
      }
  };
}

class AddSens extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
        <View style={{flex:1}}>
                  <Image
                      style={{
                          // backgroundColor: '#ccc',
                          flex: 5,
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                      }}
                      source={require('./assets/img/senshagen-beeldmerk.jpg')}
                  />
                  <View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', flex: 1}}>
                      <View style={{flex: 2, height: 100}}></View>
                          <View style={{flex: 3}}>
                              <TextInput
                                  style={{height: 40, width: '100%',borderColor: 'gray', borderWidth: 1, backgroundColor: "white"}}
                                  onChangeText={(text) => this.setState({text})}
                                  value={this.state.text}
                                  keyboardType='numeric'
                              />
                              <TouchableOpacity onPress={this.onPress} style={{backgroundColor: '#b5b5b5', width: 260, height: 40, borderRadius: 5, alignItems: 'center',justifyContent:'center', alignSelf: 'center', marginTop: 10}}>
                                <Text>Sensor toevoegen</Text>
                               </TouchableOpacity>

                          </View>
                  </View>
        </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ AddSens: AddSens, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
