import { LOCAL_STORAGE } from '@config/constants'
import { ActivityIndicator } from '@react-native-material/core'
import { Tab, TabView } from '@rneui/themed'
import { getCheckpointsByUserId } from '@services/checkpoints_service_api_calls'
import { getFavouritesByUserId } from '@services/favoritos_api_calls'
import { getPieDataFormatted } from '@tools/graphicDataFormatter'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import ContributionGraphComponent from '../components/ContributionGraphComponent'
import LineChartComponent from '../components/LineChartComponent'
import PieChartComponent from '../components/PieChartComponent'
import Styles from '../config/styles'
import { getLineChartDataFormatted } from '../tools/graphicDataFormatter'

const chartConfig = {
  backgroundGradientFrom: '#8ECAE6',
  backgroundGradientTo: '#219ebc',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
}

const data = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      data: [28, 45, 43, 20, 99, 80, 0],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    },
    {
      data: [20, 45, 28, 80, 99, 43, 0],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['Rainy Days', 'prueba'],
}

function GraphicsScreen({ navigation }) {
  const [index, setIndex] = useState(0)
  const [trendingData, setTrendingData] = useState([])
  const [pieData, setPieData] = useState([])
  const [favLocations, setFavLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    SecureStore.getItemAsync(LOCAL_STORAGE.USER_SESSION).then((result) => {
      Promise.all([
        getCheckpointsByUserId(result),
        getFavouritesByUserId(result),
      ])
        .then((result) => {
          setTrendingData(getLineChartDataFormatted(result[0]))
          setPieData(getPieDataFormatted(result[1]))
          setFavLocations(result[1])
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error.message)
        })
    })
  }, [])

  return (
    <ImageBackground
      style={[Styles.menuBackground, Styles.menuContainer]}
      source={require('../assets/fondo-fav-form.jpg')}
    >
      <View style={Styles.graphicsView}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          containerStyle={Styles.tabContainer}
          indicatorStyle={Styles.tabIndicator}
          variant="primary"
        >
          <Tab.Item
            title="Tendencia"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'graph-trend', type: 'foundation', color: 'white' }}
          />
          <Tab.Item
            title="Densidades"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'piechart', type: 'antdesign', color: 'white' }}
          />
          <Tab.Item
            title="Usuarios"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'calendar', type: 'font-awesome', color: 'white' }}
          />
        </Tab>

        <TabView
          value={index}
          onChange={setIndex}
          animationType="spring"
          tabItemContainerStyle={Styles.graphicTab}
        >
          <TabView.Item>
            {!isLoading ? (
              <LineChartComponent
                props={{
                  title: 'Tendencia de las densidades',
                  data: trendingData,
                  chartConfig,
                }}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </TabView.Item>
          <TabView.Item>
            {!isLoading ? (
              <PieChartComponent
                props={{ title: 'Densidades', data: pieData, chartConfig }}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </TabView.Item>
          <TabView.Item>
            {!isLoading ? (
              <ContributionGraphComponent
                props={{
                  title: 'Usuarios en favoritos',
                  selectData: favLocations,
                  chartConfig,
                }}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </TabView.Item>
        </TabView>
      </View>
    </ImageBackground>
  )
}

export default GraphicsScreen
