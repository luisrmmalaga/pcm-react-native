import { Badge, HStack, VStack } from '@react-native-material/core'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import DataCard from '../components/DataCard'

const screenWidth = Dimensions.get('window').width

const LineChartComponent = ({ props }) => {
  const [densidad, setDensidad] = useState(0)

  return (
    <VStack center spacing={10}>
      <Badge label={props.title} color="#023047" />
      <HStack>
        <DataCard
          props={{
            data: {
              title: 'Densidad',
              value: densidad,
            },
          }}
        />
      </HStack>
      <LineChart
        data={props.data}
        width={screenWidth * 0.9}
        height={300}
        chartConfig={props.chartConfig}
        segments={7}
        onDataPointClick={(res) => setDensidad(res.value)}
        bezier
      />
    </VStack>
  )
}

export default LineChartComponent
