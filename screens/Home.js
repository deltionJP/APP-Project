// Home.js

import React, { Component } from 'react';
import { View, Text, AsyncStorage, FlatList,StyleSheet, Image } from 'react-native';
// import moment from 'moment';
import 'moment/min/moment-with-locales';
import moment from 'moment/min/moment-with-locales';

export class Home extends Component {
  static navigationOptions = {
    header: null// !!! Hide Header
  }
    constructor(){
            super();
            this.state={
                sensorData:null,
                sensData: ''

            }
        }

    componentDidMount(){
      moment.locale('nl');
      this.hallo();
    }
    hallo = async() =>{
      const value = await AsyncStorage.getItem('thedata');
      const sensor = await AsyncStorage.getItem('sensorNumber');
      // console.log(sensor);
      

      // console.log("Home.js",value);
      this.setState({
        sensorData: JSON.parse(value),
        thedata: [],
        sensorLabel: sensor

      });
      this.new();
    }

    new(){
      var rivmData = [];
      var titles = [];

      for (let i = 0; i < this.state.sensorData.length; i++) {
        let data = this.state.sensorData[i].attributes;
        
        let timefrom = moment(data.timestamp_from).format('LT');
        let timeto = moment(data.timestamp_to).format('LT');
        // console.log(data)
        // console.log(timefrom)


        rivmData.push({ "id": data.OBJECTID, "label": data.label, "value_NO2": data.value_NO2, 
                        "value_P": data.value_P, "value_PM10": data.value_PM10, "value_RH": data.value_RH,
                        "value_T": data.value_T, "timefr": timefrom, "timetoo": timeto,
                        "unit_NO2": data.unit_NO2, "unit_P": data.unit_P, "unit_PM10": data.unit_PM10,
                        "unit_RH": data.unit_RH, "unit_T": data.unit_T});

        // console.log(rivmData);
        this.setState({
          thedata: rivmData
        })
      }
    }
  render() {
    return (
      <View style={styles.rootView}>
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 5,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={require('../assets/img/header-background.png')}
        />
        <View style={styles.container} >
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Sensor {this.state.sensorLabel} </Text>

          <FlatList data={this.state.thedata}
          renderItem={({ item }) =>
            <View style={{ backgroundColor: "#2054d6", marginBottom: 10, padding: 10}}>
            <Text style={{ fontWeight: 'bold', color: '#e1e3e8'}}>Gementen tijd: van {item.timefr} tot {item.timetoo}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginTop: 8, marginBottom: 8, width: '50%' }}>
                <Text style={styles.textstyle}>Stikstofdioxide:</Text>
                <Text style={styles.textstyle}>Luchtdruk:</Text>
                <Text style={styles.textstyle}>Fijnstof:</Text>
                <Text style={styles.textstyle}>GeenIdee:</Text>
                <Text style={styles.textstyle}>Temperatuur:</Text>

              </View>
              <View style={{ marginTop: 8, marginBottom: 8, width: '50%' }}>
                <Text style={styles.textstyle}>{item.value_NO2} {item.unit_NO2}</Text> 
                <Text style={styles.textstyle}>{item.value_P} {item.unit_P}</Text>
                <Text style={styles.textstyle}>{item.value_PM10} {item.unit_PM10}</Text>
                <Text style={styles.textstyle}>{item.value_RH} {item.unit_RH}</Text>
                <Text style={styles.textstyle}>{item.value_T} {item.unit_T}</Text>
              </View>
            </View>
            </View>
  
            }
          keyExtractor={(item) => item} />
      </View>
      </View>

     
    )
  }
}
const styles = StyleSheet.create({
  rootView:{
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 30,
  },
  textstyle:{
    marginTop: 5,
    color: '#c2ccce',
    fontWeight: 'bold'
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
