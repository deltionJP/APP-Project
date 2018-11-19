import React from 'react';
import { StyleSheet, Text, View,Image,TextInput,TouchableOpacity ,Button } from 'react-native';
// import TopStyle from 'assets/style/TopStyle.js';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
    constructor(){
            super();
            this.state={
                text:'PZ',
                sensData: ''

            }
        }
    onPress = () => {
       this.ding();
       console.log(this.state.text);
     }
     componentDidMount(){
         this.ding();
     }
    ding = async() =>{
            console.log("hallo");
            let currentWeather = 'https://services1.arcgis.com/3YlK2vfHGZtonb1r/arcgis/rest/services/RIVM_Sensors_Zwolle_(gegevens_per_uur_UTC0)/FeatureServer/0/';
            let filter = 'query?where=label%20%3D%20%27'+[this.state.text]+'%27&outFields=*&outSR=4326&f=json'
            // let currentWeather = 'https://services1.arcgis.com/3YlK2vfHGZtonb1r/arcgis/rest/services/KNMI_Sensors_Zwolle_(gegevens_per_uur)/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
            let response = await fetch (currentWeather+filter);
            let jsonObject = await response.json();
            this.setState({
                sensData: jsonObject
            });
            console.log(this.state.sensData.features);

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
