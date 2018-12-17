// Home.js

import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList,StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/min/moment-with-locales';

export class Home extends Component {
    constructor(){
            super();
            this.state={
                sensorData:null,
                sensData: ''

            }
        }

    componentDidMount(){
      moment.locale(); 
      this.hallo();
    }
    hallo = async() =>{
      const value = await AsyncStorage.getItem('thedata');
      // console.log("Home.js",value);
      this.setState({
        sensorData: JSON.parse(value),
        thedata: []
      });
      // console.log(this.state.sensorData);
      this.new();
    }

    new(){
      var rivmData = [];
      var titles = [];

      for (let i = 0; i < this.state.sensorData.length; i++) {
        let data = this.state.sensorData[i].attributes;
        
        let timefrom = moment(data.timestamp_from).format('LT');
        let timeto = moment(data.timestamp_to).format('LT');
        console.log(data)
        console.log(timefrom)


        rivmData.push({ "id": data.OBJECTID, "label": data.label, "value_NO2": data.value_NO2, 
                        "value_P": data.value_P, "value_PM10": data.value_PM10, "value_RH": data.value_RH,
                        "value_T": data.value_T, "timefr": timefrom, "timetoo": timeto,
                        "unit_NO2": data.unit_NO2, "unit_P": data.unit_P, "unit_PM10": data.unit_PM10,
                        "unit_RH": data.unit_RH, "unit_T": data.unit_T});

        console.log(rivmData);
        this.setState({
          thedata: rivmData
        })
      }
    }
  render() {
    return (
      
        <View style={styles.container} >
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Sensor PZ001</Text>

          <FlatList data={this.state.thedata}
          renderItem={({ item }) =>
          <View style={styles.topListStyle}>
              <Text style={{ fontWeight: 'bold', color: '#e1e3e8'}}>{item.timefr} -- {item.timetoo}</Text>
            <View style={styles.liststyle}>
                <Text>Stikstofdioxide: {item.value_NO2} {item.unit_NO2}</Text>
                <Text>Luchtdruk: {item.value_P} {item.unit_P}</Text>
                <Text>Fijnstof: {item.value_PM10} {item.unit_PM10}</Text>
                <Text>{item.value_RH} {item.unit_RH}</Text>
                <Text>Temperatuur: {item.value_T} {item.unit_T}</Text>
            </View>
          </View>

          }
          keyExtractor={(item) => item} />
      </View>
      

     
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
  },
  topListStyle:{
    backgroundColor: "#5d89f7",
    marginBottom: 10,
    paddingLeft: 5,
    
  },
  liststyle:{
    padding: 10,
    flexDirection: 'row'
  },
  name:{
    height: 45,
    backgroundColor: "#b3caef",
    marginBottom: 10
  }

});
  

export default Home
