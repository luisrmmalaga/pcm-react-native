import { Badge, VStack } from '@react-native-material/core'
import React from 'react'
import { Dimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

const PieChartComponent = ({ props }) => {
  return (
    <VStack center spacing={10}>
      <Badge label={props.title} color="#023047" />
      <PieChart
        data={props.data}
        width={screenWidth * 0.9}
        height={250}
        chartConfig={props.chartConfig}
        accessor={'densidad'}
        paddingLeft={'15'}
        absolute
      />
    </VStack>
  )
}

export default PieChartComponent
