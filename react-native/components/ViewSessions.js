import React, { useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'
import { fetchAllInfo } from '../database/db'

export default function ViewSessionsScreen() {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Button title="Read all" onPress={readAllDataToo} />
        <FlatList
          // keyExtractor={item=>item.id.toString()}
          keyExtractor={(item) => readAllData.indexOf(item).toString()}
          data={readAllData}
          renderItem={(itemData) => (
            <View>
              <Text style={styles.counters}>
                Car : {itemData.item.car}
                {'  '}
                Bus: {itemData.item.bus}
                {'  '}
                Trucks: {itemData.item.trucks}
                {'  '}
                Mopeds: {itemData.item.motorcycles}
                {'  '}
              </Text>
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
              </Text>
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
  },
})
