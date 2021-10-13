import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function ViewSessionsScreen() {
  const navigation = useNavigation()
  var index = 1
  
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <View>
        <Button
          mode="contained"
          style={styles.buttonStyles}
          contentStyle={{ height: 60 }}
          onPress={() => navigation.navigate('Local Session')}
        >
          Local Sessions
        </Button>
        <Button
          mode="contained"
          style={styles.buttonStyles}
          contentStyle={{ height: 60 }}
          onPress={() => navigation.navigate('Cloud Session')}
        >
          Cloud Sessions
        </Button>
        {/* FlatList for the local data */}
        <FlatList
          // keyExtractor={item=>item.id.toString()}
          keyExtractor={(item) => readAllData.indexOf(item).toString()}
          data={readAllData}
          renderItem={(itemData) => (
            <View>
              <Text style={styles.counters}>
                Date: {itemData.item.Date} {itemData.item.endDate}
              </Text>
              <Text>Map goes here</Text>
              <Button
                mode="contained"
                style={styles.buttonStyles}
                contentStyle={{ height: 60 }}
                onPress={() => navigation.navigate('View Single Session')}
              >
                Details
              </Button>
            </View>
          )}
        />
        {/* Flatlist for the data in the cloud */}
        <FlatList
          // keyExtractor={item=>item.id.toString()}
          keyExtractor={(item) => cloudData.indexOf(item).toString()}
          data={cloudData}
          renderItem={(itemData) => (
            <View>
              <Text style={styles.counters}>
                Date: {itemData.item.date} {itemData.item.endDate}
              </Text>
              <Text>Map goes here</Text>
              <Button
                mode="contained"
                style={styles.buttonStyles}
                contentStyle={{ height: 60 }}
                onPress={() => navigation.navigate('View Single Session')}
              >
                Details
              </Button>
            </View>
          )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  counters: {
    flexDirection: 'row',
    padding: 20,
    alignSelf: 'center',
    fontSize: 25,
  },
  styleChart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonStyles: {
    width: 170,
    alignSelf: 'center',
    marginTop: 20,
  },
})
