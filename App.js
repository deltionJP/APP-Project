import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
// import TopStyle from 'assets/style/TopStyle.js';

export default class App extends React.Component {
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
                  <View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', flex: 1}}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
