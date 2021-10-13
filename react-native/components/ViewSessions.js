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
import { BarChart } from 'react-native-chart-kit'
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
              <Text style={styles.counters}>
                Time: {itemData.item.Date} {' '}{itemData.item.Timer}
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
                Time: {itemData.item.Timer}
              </Text>
              <Text style={styles.counters}>
                Date: {itemData.item.Date} {'  '}
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

})
