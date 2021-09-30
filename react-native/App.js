import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
	ActivityIndicator,
	Provider as PaperProvider,
} from 'react-native-paper';

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
			<ActivityIndicator animating={true} />
		</View>
	);
}

function AddFishyScreen() {
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
				<Stack.Screen name='Add Fish' component={AddFishyScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
