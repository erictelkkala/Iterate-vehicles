import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  SafeAreaView,
} from 'react-native'
import { Avatar, Button, IconButton, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { addInfo, fetchAllInfo } from '../database/db'
import Timer from 'react-compound-timer'

// Main function

export default function BeginSession() {
  //Some variables for time being.
  let SessionID = 1
  let UserID = 1

  // Theme import
  const theme = useTheme()

  const navigation = useNavigation()
  const [carCount, setcarCount] = useState(0)
  const [mopedCount, setmopedCount] = useState(0)
  const [busCount, setbusCount] = useState(0)
  const [truckCount, settruckCount] = useState(0)
  const [counters, setCounters] = useState([])
  const [latitude, setLatitude] = useState(0.0)
  const [longitude, setLongitude] = useState(0.0)
  const [currentDate, setDate] = useState('')
  // const [UserID, setUserID] = useState(0)
  //  const [SessionID, setSessionID] = useState(0)

  useEffect(() => {
    var date = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    setDate(date + '/' + month + '/' + year)
    setLatitude(global.latitudeVar)
    setLongitude(global.longitudeVar)
    console.log(latitude)
    console.log(longitude)
  })

  const ResultHandler = () => {
    setCounters((counters) => [
      ...counters,
      {
        car: setcarCount,
        bus: setbusCount,
        trucks: settruckCount,
        motorcycles: setmopedCount,
        date: setDate,
        longitude: setLongitude,
        latitude: setLatitude,
      },
    ])
    addResultsToDatabase()
    navigation.navigate('View Sessions')
  }

  async function addResultsToDatabase() {
    try {
      const dbResult = await addInfo(
        carCount,
        mopedCount,
        busCount,
        truckCount,
        UserID,
        SessionID,
        currentDate,
        longitude,
        latitude
      )
      console.log(dbResult)
    } catch (err) {
      console.log(err)
    }
  }

  // Counter for the cars
  const carGuess = (direction) => {
    if (direction == 'lower') {
      setcarCount((carCount) => carCount - 1)
      if (carCount == 0) {
        setcarCount((carCount) => 0)
      }
    } else {
      setcarCount((carCount) => carCount + 1)
    }
  }

  // Counter for the mopeds
  const mopedGuess = (direction) => {
    if (direction == 'lower') {
      setmopedCount((mopedCount) => mopedCount - 1)
      if (mopedCount == 0) {
        setmopedCount((mopedCount) => 0)
      }
    } else {
      setmopedCount((mopedCount) => mopedCount + 1)
    }
  }

  // Counter for the busses
  const busGuess = (direction) => {
    if (direction == 'lower') {
      setbusCount((busCount) => busCount - 1)
      if (busCount == 0) {
        setbusCount((busCount) => 0)
      }
    } else {
      setbusCount((busCount) => busCount + 1)
    }
  }

  // Counter for the trucks
  const truckGuess = (direction) => {
    if (direction == 'lower') {
      settruckCount((truckCount) => truckCount - 1)
      if (truckCount == 0) {
        settruckCount((truckCount) => 0)
      }
    } else {
      settruckCount((truckCount) => truckCount + 1)
    }
  }

  return (
    <View style={styles.main}>
      {/* Timer / Stopwatch */}
      <View style={styles.containerStopwatch}>
        <Timer>
          <Text>
            <Timer.Days />:
            <Timer.Hours />:
            <Timer.Minutes />:
            <Timer.Seconds />
          </Text>
        </Timer>
      </View>
      <View>
        <Text>Global variable : {global.latitudeVar}</Text>
        <Text>Global variable : {global.longitudeVar}</Text>
      </View>
      {/* First counter */}
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          size={30}
          color={theme.colors.grey}
          icon="car-side"
          onPress={() => {
            carGuess('lower')
          }}
        ></IconButton>
        <Avatar.Text
          style={styles.counter}
          size={70}
          label={carCount}
        ></Avatar.Text>
        <IconButton
          style={styles.icon}
          size={50}
          color={theme.colors.grey}
          icon="car-side"
          onPress={() => {
            carGuess('higher')
          }}
        ></IconButton>
      </View>

      {/* Second counter */}
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          size={30}
          color={theme.colors.grey}
          icon="moped"
          onPress={() => {
            mopedGuess('lower')
          }}
        ></IconButton>
        <Avatar.Text
          style={styles.counter}
          size={70}
          label={mopedCount}
        ></Avatar.Text>
        <IconButton
          style={styles.icon}
          size={50}
          color={theme.colors.grey}
          icon="moped"
          onPress={() => {
            mopedGuess('higher')
          }}
        ></IconButton>
      </View>

      {/* Third counter */}
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          size={30}
          color={theme.colors.grey}
          icon="bus-side"
          onPress={() => {
            busGuess('lower')
          }}
        ></IconButton>
        <Avatar.Text
          style={styles.counter}
          size={70}
          label={busCount}
        ></Avatar.Text>
        <IconButton
          style={styles.icon}
          size={50}
          color={theme.colors.grey}
          icon="bus-side"
          onPress={() => {
            busGuess('higher')
          }}
        ></IconButton>
      </View>

      {/* Fourth counter */}
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          size={30}
          color={theme.colors.grey}
          icon="dump-truck"
          onPress={() => {
            truckGuess('lower')
          }}
        ></IconButton>
        <Avatar.Text
          style={styles.counter}
          size={70}
          label={truckCount}
        ></Avatar.Text>
        <IconButton
          style={styles.icon}
          size={50}
          color={theme.colors.grey}
          icon="dump-truck"
          onPress={() => {
            truckGuess('higher')
          }}
        ></IconButton>
      </View>

      {/* Save and exit button */}
      <View style={styles.container}>
        <Button
          style={{ marginTop: 50, width: 300, height: 60 }}
          contentStyle={{ marginTop: 10 }}
          icon="close-box"
          mode="contained"
          onPress={ResultHandler}
        >
          Save and exit
        </Button>
      </View>
    </View>
  )
}

// Stylesheet
const styles = StyleSheet.create({
  main: {
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    paddingTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  containerStopwatch: {
    alignSelf: 'center',
  },
  stopWatchButtons: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 20,
  },
  icon: {
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
  counter: {
    alignSelf: 'center',
  },
})
