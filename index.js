//React Native with Maps

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
  } from 'react-native';

import MapView from 'react-native-maps';  

import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './weatherApi';
import Highlight from 'react-native-highlight-words';

const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'ios-cloud-outline',
  Snow: 'md-snow',
  Haze: 'ios-cloud-outline'
};

const phrases = {
  Default: {
    title: "Fetching the Fucking Weather",
    subtitle: "Be Patient, you're seeing a miracle",
    highlight: "Fucking",
    color: "#E32500",
    background: "#FFD017"    
  },
  Clear: {
    title: "What a Great Day",
    subtitle: "Go out and enjoy it!",
    highlight: "Great",
    color: "#E32500",
    background: "#17c8ff"
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
    color: "#004A96",
    background: "#2F343A"
  },
  Thunderstorm: {
    title: "Look out for lightning!",
    subtitle: "Stay inside and be safe",
    highlight: "lightning",
    color: "#FBFF46",
    background: "#020202"
  },
  Clouds: {
    title: "Cloud storage reached",
    subtitle: "error: 5000 - cirrocumulus",
    highlight: "reached",
    color: "#0044FF",
    background: "#939393"
  },
  Snow: {
    title: "Brain Freeze",
    subtitle: "Don't eat the yellow snow",
    highlight: "Freeze",
    color: "#021D4C",
    background: "#15A678"
  },
  Haze: {
    title: "Highland Games Weather",
    subtitle: "Just like Scotland",
    highlight: "Games",
    color: "#2F343A",
    background: "#1FBB68"
  }  
};

class App extends Component {

  componentWillMount(){
    this.setState({
      temp:0,
      weather:'Default'
    });
  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude,posData.coords.longitude)
        .then( res => this.setState({
          temp:Math.round(res.temp),
          weather:res.weather
        })),
      (error) => alert(error),
      {timeout:10000}
     );
  }

  render(){
    console.log('TRUNGGGG', phrases[this.state.weather]);
    return(
      <View style={[styles.container,{backgroundColor:phrases[this.state.weather].background}]}>
        <StatusBar hidden={true}/>

        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>        
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>    

        <View style={styles.subheader}>
          <Highlight
            style ={styles.title}
            highlightStyle={{color: phrases[this.state.weather].color}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
          <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
        </View> 

        <View style={styles.map}>

          <MapView
            provider="google"
            style={StyleSheet.absoluteFillObject}
          >
            <MapView.Marker
              title="Greenwich"
              coordinate={{
                latitude: 51.48,
                longitude: 0
              }}
              calloutOffset={{
                x: -50,
                y: -50
              }}
            />
          </MapView>

        </View>           

      </View>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FFD017'    
  },
  header:{
    alignItems:'center', 
    justifyContent:'space-around', 
    flexDirection:'row', 
    flex:1,
    margin: 30
    // backgroundColor:'blue'
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 20,
    color: 'white'
  },
  subheader: {
    alignItems:'flex-start', 
    justifyContent:'flex-start', 
    flex:1,
    // backgroundColor:'red',
    margin: 10
  },  
  map: {
    alignItems:'center', 
    justifyContent:'center', 
    flex:5,
    // backgroundColor:'red',
    margin: 10
  },
  title: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 40,
    color: 'white',
    marginBottom: 5   
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 16,
    color: 'white'   
  }  
})

AppRegistry.registerComponent('fuckingWeather', () => App);