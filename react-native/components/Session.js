import React, { useState, useEffect } from 'react';
import {Alert,  Text, View, StyleSheet, Dimensions, ActivityIndicator, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Permissions from 'expo-permissions';
import BeginSession from "./BeginSession";

let near='';

export default function StartSessionsScreen() {
    const navigation = useNavigation();

  //Not actually in use in this example
  const [isFetchingLocation, setIsFetchingLocation]=useState(false);
  //save the location the GPS gives
  // - and used in what to show: default map in location 0,0 and Activityindidator OR map on the actual location
  const [pickedLocation, setPickedLocation]=useState();
  //For demo to show another Marker
  const [yourLocation, setYourLocation]=useState();
  const [errorMsg, setErrorMsg] = useState(null);
  //Setting the default region of the shown map - HAMK area (the other Delta can be 0)
  //It both are 0, zoom is quite close
  const [mapRegion, setMapRegion]=useState({ latitude: 60.976, longitude: 24.48, latitudeDelta: 0, longitudeDelta: 0.0421 });

  //none,standard, satellite,hybrid,terrain (Android only),mutedStandard (iOS 11.0+ only)
  const [mapType, setMapType]=useState('satellite');

  
  
  const verifyPermissions= async ()=>{
    // const result=await Permissions.askAsync(Permissions.LOCATION);
    const foreGround = await Location.requestForegroundPermissionsAsync();
    const backGround = await Location.requestBackgroundPermissionsAsync();
    if (foreGround.status!=='granted' && backGround.status!=='granted'){
        Alert.alert('No permissions to use location', 
            'You need to grant LOCATION perrmissions to use this app',
            [{text:'Next time!'}]
        );
        return false;
    }
    else{
        return true;
    }
  }    
  
  const getLocationHandler= async ()=>{
    const hasPermission=await verifyPermissions();
    if (!hasPermission){
        return;
    }
    try{
        setIsFetchingLocation(true);
        const location=await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest, timeout:5000});
        near=location;
        console.log("Location");
        console.log(location.coords.latitude);
        // setMapRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
        setMapRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1, longitudeDelta: 0 });
        setYourLocation({ latitude: 61.46, longitude: 24.10});
        setPickedLocation(location);
    }
    catch(err){
        Alert.alert('Location not found!', 'Please try again after a moment', [{text:'OK'}]);
    }
    setIsFetchingLocation(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.dataView}>
      {pickedLocation ? 
          <View>
            <Button title='Get Location' onPress={getLocationHandler} />
          </View> : 
          <Button title='Get Location' onPress={getLocationHandler} />
      }
      <Button title='Begin' onPress={() => navigation.navigate('Begin Session')}/>
      </View>
      <View style={styles.mapView}>
        {pickedLocation ?
          <MapView style={styles.mapStyle} 
            provider="google"
            mapType={mapType}
            region={mapRegion}
          > 
        <Marker coordinate={mapRegion} title="My Place" description="Some description" />
        <Marker coordinate={yourLocation} title="Your Place" description="Some description" />
        </MapView>
          :
          <View>
          <MapView style={styles.mapStyle} />
          <ActivityIndicator size='large' color='blue' />
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
  },
  dataView:{
    flex:1, 
    width:'100%',
    borderWidth:2,
    borderColor:'red',
  },
  mapView:{
    flex:2, 
    width:'100%',
    borderWidth:2,
    borderColor:'red',
  },
  mapStyle: {
    // width: '100%',
    height: '90%',
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height-250,
  },
});