import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, IconButton, Colors } from 'react-native-paper'
import StartSessionsScreen from './components/Session'
import BeginSession from './components/BeginSession'
import ViewSessionsScreen from './components/ViewSessions'
import { init } from './database/db'

import * as Device from 'expo-device'

// Initiating the database from ./database
init()
  .then(() => {
    console.log('Database creation succeeded!')

    console.log(Device.isDevice)
  })
  .catch((err) => {
    console.log('Database IS NOT initialized! ' + err)
  })

// Home screen with the navigation prop
function HomeScreen({ navigation }) {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {/* Header text */}
        <Text style={styles.vechicleCounter}>VEHICLE COUNTER</Text>

        <IconButton
          icon="car-multiple"
          color={Colors.black}
          size={50}
          style={styles.vechicleIcon}
        />
      </View>
      <View style={styles.buttonColumn}>
        {/* Start the session button */}
        <Button
          icon="arrow-right-circle"
          style={{ width: 175 }}
          // Assign the height variable to the content instead of the button itself
          // -> otherwise the button touchable area will not be correct
          contentStyle={{ height: 60 }}
          mode="contained"
          onPress={() => navigation.navigate('Start Session')}
        >
          Start session
        </Button>

        {/* View the previous sessions button
        See above for more specific comments */}
        <Button
          style={{ marginTop: 20 }}
          contentStyle={{ height: 60 }}
          icon="border-color"
          mode="contained"
          onPress={() => navigation.navigate('View Sessions')}
        >
          Previous sessions
        </Button>
      </View>
    </View>
  )
}

// Navigation stack
const Stack = createNativeStackNavigator()

// Navigation stack and screens
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Start Session" component={StartSessionsScreen} />
        <Stack.Screen name="View Sessions" component={ViewSessionsScreen} />
        <Stack.Screen name="Begin Session" component={BeginSession} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// Stylesheet
const styles = StyleSheet.create({
  main: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  container: {
    height: '20%',
    paddingBottom: 100,
  },
  vechicleCounter: {
    fontFamily: 'sans-serif',
    position: 'relative',
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 41,
    textAlign: 'center',
    paddingBottom: 0,
    width: 208,
    height: 94,
  },
  vechicleIcon: {
    alignSelf: 'center',
    position: 'relative',
  },
  buttonColumn: {
    marginTop: 200,
    alignItems: 'center',
  },
})

export default App
