import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: "center" }}>
      <View>
        <Button
              mode="contained"
              style={styles.buttonStyles}
              contentStyle={{ height: 60 }}
              onPress={readAllDataToo}
              >
                Local Sessions
        </Button>
        <Button
              mode="contained"
              style={styles.buttonStyles}
              contentStyle={{ height: 60 }}
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
                Date: {itemData.item.Date} {' '}{itemData.item.Timer}
              </Text>
              <Text>
                Map goes here
              </Text>
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
    alignSelf: "center",
    fontSize: 25
  },
  styleChart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyles: {
    width: 170, 
    alignSelf: "center",
    marginTop: 20
  }
 })
