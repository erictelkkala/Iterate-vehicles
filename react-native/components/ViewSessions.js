import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { BarChart } from 'react-native-chart-kit'
import { fetchAllInfo } from '../database/db'

export default function ViewSessionsScreen() {
  const navigation = useNavigation()
  const [readAllData, setInfo] = useState([])
  const [cloudData, setCloudData] = useState([])
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
  async function fetchData() {
    await fetch(
      'https://monkesproject.appspot.com/rest/counterservice/getAll'
    ).then((parameter) =>
      parameter
        .json()
        .catch((err) => {
          setSomeErrors(err)
          setErrors(true)
          console.log('JSON Error: ' + err)
        })
        .then((anotherParameter) => {
          setCloudData(anotherParameter)
          console.log(anotherParameter)
        })
        .catch((anError) => {
          setSomeErrors(anError)
          console.log(anError)
        })
    )
  }
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
          onPress={readAllDataToo}
        >
          Local Sessions
        </Button>
        <Button
          mode="contained"
          style={styles.buttonStyles}
          contentStyle={{ height: 60 }}
          onPress={fetchData}
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
  buttonStyles: {
    width: 170,
    alignSelf: 'center',
    marginTop: 20,
  },
})
