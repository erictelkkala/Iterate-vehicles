import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  SafeAreaView,
} from 'react-native'
import { Avatar, Button, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { addInfo } from '../database/db'
import { useStopwatch } from 'react-timer-hook'

// Main function

export default function BeginSession() {
  const navigation = useNavigation()
  const [carCount, setcarCount] = useState(0)
  const [mopedCount, setmopedCount] = useState(0)
  const [busCount, setbusCount] = useState(0)
  const [truckCount, settruckCount] = useState(0)

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

  function MyStopwatch() {
    const { seconds, minutes, hours, isRunning, start, pause, reset } =
      useStopwatch({ autoStart: true })

    return (
      <View style={styles.containerStopwatch}>
        <Text>
          {hours}:
          {minutes}:
          {seconds}
        </Text>
        <Button onPress={start}>Start</Button>
        <Button onPress={pause}>Pause</Button>
        <Button onPress={reset}>Reset</Button>
      </View>
    )
  }

  return (
    <View>
      <View style={styles.container}>
        <MyStopwatch />
      </View>
      {/* First counter */}
      <View style={styles.container}>
        <IconButton
          style={styles.iconLeft}
          size={30}
          color="grey"
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
          style={styles.iconRight}
          size={50}
          color="grey"
          icon="car-side"
          onPress={() => {
            carGuess('higher')
          }}
        ></IconButton>
      </View>

      {/* Second counter */}
      <View style={styles.container}>
        <IconButton
          style={styles.iconLeft}
          size={30}
          color="grey"
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
          style={styles.iconRight}
          size={50}
          color="grey"
          icon="moped"
          onPress={() => {
            mopedGuess('higher')
          }}
        ></IconButton>
      </View>

      {/* Third counter */}
      <View style={styles.container}>
        <IconButton
          style={styles.iconLeft}
          size={30}
          color="grey"
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
          style={styles.iconRight}
          size={50}
          color="grey"
          icon="bus-side"
          onPress={() => {
            busGuess('higher')
          }}
        ></IconButton>
      </View>

      {/* Fourth cpunter */}
      <View style={styles.container}>
        <IconButton
          style={styles.iconLeft}
          size={30}
          color="grey"
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
          style={styles.iconRight}
          size={50}
          color="grey"
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
          onPress={() => navigation.navigate('View Sessions')}
        >
          Save and exit
        </Button>
      </View>
    </View>
  )
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  containerStopwatch: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sectionStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 20,
  },
  iconLeft: {
    alignSelf: 'center',
  },
  iconRight: {
    alignSelf: 'center',
  },
  counter: {
    alignSelf: 'center',
  },
})
