import React, { useState, useEffect } from 'react'
import {
  Alert,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import * as Permissions from 'expo-permissions'

let near = ''

export default function StartSessionsScreen() {
  const navigation = useNavigation()

  //Not actually in use in this example
  const [isFetchingLocation, setIsFetchingLocation] = useState(false)
  //save the location the GPS gives
  // - and used in what to show: default map in location 0,0 and Activityindidator OR map on the actual location
  const [pickedLocation, setPickedLocation] = useState()
  //For demo to show another Marker
  const [yourLocation, setYourLocation] = useState()
  const [errorMsg, setErrorMsg] = useState(null)
  //Setting the default region of the shown map - HAMK area (the other Delta can be 0)
  //It both are 0, zoom is quite close
  const [mapRegion, setMapRegion] = useState({
    latitude: 60.976,
    longitude: 24.48,
    latitudeDelta: 0,
    longitudeDelta: 0.0421,
  })

  //none,standard, satellite,hybrid,terrain (Android only),mutedStandard (iOS 11.0+ only)
  const [mapType, setMapType] = useState('satellite')

  const verifyPermissions = async () => {
    // const result=await Permissions.askAsync(Permissions.LOCATION);
    const foreGround = await Location.requestForegroundPermissionsAsync()
    const backGround = await Location.requestBackgroundPermissionsAsync()
    if (foreGround.status !== 'granted' && backGround.status !== 'granted') {
      Alert.alert(
        'No permissions to use location',
        'You need to grant LOCATION perrmissions to use this app',
        [{ text: 'Next time!' }]
      )
      return false
    } else {
      return true
    }
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    try {
      setIsFetchingLocation(true)
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeout: 5000,
      })
      near = location
      console.log('Location')
      console.log(location.coords.latitude)
      console.log(location.coords.longitude)
      // setMapRegion({ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0,
      })
      setYourLocation({ latitude: 61.46, longitude: 24.1 })
      setPickedLocation(location)
    } catch (err) {
      Alert.alert('Location not found!', 'Please try again after a moment', [
        { text: 'OK' },
      ])
    }
    setIsFetchingLocation(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.dataView}>
        {pickedLocation ? (
          <View>
            <Button
              mode="contained"
              style={{ width: 170 }}
              contentStyle={{ height: 60 }}
              onPress={getLocationHandler}
            >
              Get Location
            </Button>
          </View>
        ) : (
          <Button
            mode="contained"
            style={{ width: 170 }}
            contentStyle={{ height: 60 }}
            onPress={getLocationHandler}
          >
            Get Location
          </Button>
        )}
        <Button
          style={{ marginTop: 20, width: 170 }}
          contentStyle={{ height: 60 }}
          mode="contained"
          onPress={() => navigation.navigate('Begin Session')}
        >
          Begin
        </Button>
      </View>
      <View style={styles.mapView}>
        {pickedLocation ? (
          <MapView
            style={styles.mapStyle}
            provider="google"
            mapType={mapType}
            region={mapRegion}
          >
            <Marker
              coordinate={mapRegion}
              title="My Place"
              description="Some description"
            />
            <Marker
              coordinate={yourLocation}
              title="Your Place"
              description="Some description"
            />
          </MapView>
        ) : (
          <View>
            <MapView style={styles.mapStyle} />
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 1,
    flex: 1,
  },
  dataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mapView: {
    flex: 2,
    width: '100%',
  },
  mapStyle: {
    width: '100%',
    height: '90%',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 250,
  },
})
