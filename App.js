import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import fetchData from './components/Printfish';
import AddFish from './components/Insertfish';

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
			<Button
				style={{ marginBottom: 10 }}
				title='Add Fishy'
				onPress={() => navigation.navigate('Add Fish')}
			/>
			<View>{fetchData()}</View>
		</View>
	);
}

function AddFishyScreen() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<AddFish></AddFish>
		</View>
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
