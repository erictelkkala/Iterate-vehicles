import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BarChart } from 'react-native-chart-kit'
import { fetchAllInfo } from '../database/db'

export default function ViewSingleSession() {
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
                SessionID: {itemData.item.SessionID}
                {'  '}
              </Text>
              <Text style={styles.counters}>
                Date: {itemData.item.Date} {'  '}
                Time: {itemData.item.Timer}
              </Text>
              <BarChart
                style={styles.styleChart}
                data={{
                  labels: ['Car', 'Bus', 'Trucks', 'Motorcycles'],
                  datasets: [
                    {
                      data: [
                        itemData.item.car,
                        itemData.item.bus,
                        itemData.item.trucks,
                        itemData.item.motorcycles,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 10}
                height={200}
                yAxisInterval={2}
                segments={3}
                showValuesOnTopOfBars={true}
                chartConfig={{
                  decimalPlaces: 0,
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#6E32D1',
                  backgroundGradientTo: '#6E32D1',
                  color: (opacity = 255) => 'white',
                  style: {
                    borderRadius: 12,
                    padding: 10,
                  },
                }}
              />
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
  },
  styleChart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
})
