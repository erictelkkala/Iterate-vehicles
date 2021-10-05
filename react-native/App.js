import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, IconButton, Colors } from "react-native-paper";
import StartSessionsScreen from "./components/Session";
import BeginSession from "./components/BeginSession";
import ViewSessionsScreen from "./components/ViewSessions";

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
	<View style={styles.container}>
      	<Text style={styles.vechicleCounter}>
		  VECHICLE COUNTER
		</Text>
    
		<IconButton
    		icon="car-multiple"
    		color={Colors.black}
    		size={50}
			style={styles.vechicleIcon}
  			/>
	</View>
      <Button
        icon="arrow-right-circle"
        style={{ width: 175, height: 60 }}
        contentStyle={{ marginTop: 10 }}
        mode="contained"
        onPress={() => navigation.navigate("Start Session")}
      >
        Start session
      </Button>
      <Button
        style={{ marginTop: 20, width: 220, height: 60 }}
        contentStyle={{ marginTop: 10 }}
        icon="border-color"
        mode="contained"
        onPress={() => navigation.navigate("View Sessions")}
      >
        Previous sessions
      </Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

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
  );
}
const styles = StyleSheet.create({
	container: {
	  width: 208,
	  height: 74
	},
	vechicleCounter: {
	  fontFamily: "sans-serif",
	  fontStyle: "italic",
	  fontWeight: "bold",
	  color: "black",
	  fontSize: 41,
	  textAlign: "center",
	  marginVertical: -190,
	  width: 208,
	  height: 94
	},
	vechicleIcon: {
		alignSelf: "center",
		marginVertical: 200
	  }
  });

export default App;
