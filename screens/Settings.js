// Settings.js

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,TextInput, Image,AsyncStorage, Alert } from 'react-native';
import moment from 'moment';
import 'moment/min/moment-with-locales';

export class Settings extends Component {
    constructor(){
            super();
            this.state={
                text:'PZ',
                sensData: ''

            }
        }

    onPress = () => {
        fetch('https://services1.arcgis.com/3YlK2vfHGZtonb1r/arcgis/rest/services/RIVM_Sensors_Zwolle_(gegevens_per_uur_UTC0)/FeatureServer/0/query?where=label%20%3D%20%27'+[this.state.text]+'%27&outFields=*&outSR=4326&f=json')
        // orderbydate // fetch('https://services1.arcgis.com/3YlK2vfHGZtonb1r/arcgis/rest/services/RIVM_Sensors_Zwolle_(gegevens_per_uur_UTC0)/FeatureServer/0/query?where=label%20%3D%20'+[this.state.text]+'&outFields=*&orderByFields=timestamp_from DESC&outSR=4326&f=json')
            .then(response => response.json())
            .then(async (data) => {
                console.log('test2')
                this.setState({
                  isLoading: false,
                  sensData: data.features,
                });
                try {
                let newsensdata = data.features.slice(0, 5);
                if(newsensdata[0]){
                    await AsyncStorage.setItem('thedata',JSON.stringify(newsensdata))
                    await AsyncStorage.setItem('sensorNumber', this.state.text)
                      // const value = await AsyncStorage.getItem('thedata');
                      // console.log("setting.js",value);
                      this.props.navigation.navigate('HomeScreen');
                }
                else{
                     console.log(newsensdata[0])
                    Alert.alert(
                        'Sensor fout',
                        'Er is geen data gevonden voor deze sensor',
                        [
                            { text: 'Reset', onPress: () =>{
                                console.log('Er is een foutieve sensor ingevoerd');
                                this.setState({text: "PZ"})
                            }  },
                        ],
                        
                    )
                }
                } catch (e) {

                }
            })
            .catch()
        }

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
                      source={require('../assets/img/senshagen-beeldmerk.jpg')}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
