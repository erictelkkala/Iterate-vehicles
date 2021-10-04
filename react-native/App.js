import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import {
	ActivityIndicator,
	Provider as PaperProvider,
} from 'react-native-paper';
import StartSessionsScreen from './components/Session';
import BeginSession from './components/BeginSession';

function HomeScreen({ navigation }) {
	return (


		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 50,
			}}
		>
			<Button icon="camera" mode="contained" onPress={() => navigation.navigate('Start Session')}>
    			Start session
			</Button>
			<Button icon="camera" mode="contained" onPress={() => navigation.navigate('View Sessions')}>
    			Previous sessions
			</Button>
		</View>
	);
}

function ViewSessionsScreen() {
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		></View>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen name='Home' component={HomeScreen} />
				<Stack.Screen name='Start Session' component={StartSessionsScreen} />
				<Stack.Screen name='View Sessions' component={ViewSessionsScreen} />
				<Stack.Screen name='Begin Session' component={BeginSession} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
