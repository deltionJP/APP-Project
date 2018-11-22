// Home.js

import React, { Component } from 'react';
import { View, Text,AsyncStorage } from 'react-native';

export class Home extends Component {
    constructor(){
            super();
            this.state={
                sensorData:null,
                sensData: ''

            }
        }

    componentDidMount(){
        this.hallo();
    }
    hallo = async() =>{
        const value = await AsyncStorage.getItem('thedata');
        console.log("Home.js",value);
        this.setState({
            sensorData: JSON.parse(value)
        });
        // console.log(this.state.sensorData);
    }
  render() {
    return (
      <View>
        <Text>
        {this.state.sensorData ? JSON.stringify(this.state.sensorData) : "Jort is Coming" }
        </Text>

      </View>
    )
  }
}

export default Home
