import React, { useState } from 'react'
<<<<<<< Updated upstream
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
=======
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { BarChart } from 'react-native-chart-kit'
>>>>>>> Stashed changes
import { fetchAllInfo } from '../database/db'

export default function ViewSessionsScreen() {
  const navigation = useNavigation()
  const [readAllData, setInfo] = useState([])
  var index = 1

  async function readAllDataToo() {
    await fetchAllInfo()
      .then((res) => {
        setInfo(res.rows._array)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log('All fish are read')
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Button
          style={styles.buttonStyles}
          contentStyle={{ height: 60 }}
          mode="contained"
          onPress={readAllDataToo}
        >
          Local Sessions
        </Button>
        <Button
          style={styles.buttonStyles}
          contentStyle={{ height: 60 }}
          mode="contained"
          onPress={readAllDataToo}
        >
          Cloud Sessions
        </Button>
        <FlatList
          // keyExtractor={item=>item.id.toString()}
          keyExtractor={(item) => readAllData.indexOf(item).toString()}
          data={readAllData}
          renderItem={(itemData) => (
            <View>
              <Text style={styles.counters}>
                Time: {itemData.item.Date} {' '}{itemData.item.Timer}
              </Text>
<<<<<<< Updated upstream
              <Text style={styles.counters}>
                SessionID: {itemData.item.SessionID}
                {'  '}
                UserID:{itemData.item.UserID}
                {'  '}
                longitude:{itemData.item.longitude}
                {'  '}
                latitude:{itemData.item.latitude}
                {'  '}
              </Text>
              <Text style={styles.counters}>
                Date: {itemData.item.Date} {'  '}
=======
              <Text>
                Map
>>>>>>> Stashed changes
              </Text>
              <Button
                style={{ marginTop: 20, width: 170, alignSelf: "center" }}
                contentStyle={{ height: 60 }}
                mode="contained"
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
    marginTop: 20,
    fontSize: 25
  },
<<<<<<< Updated upstream
=======
  styleChart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonStyles: {
    marginTop: 20,
    width: 170, 
    alignSelf:"center" ,
  }
>>>>>>> Stashed changes
})
