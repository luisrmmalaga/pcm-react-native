import { mapStyle } from '@config/mapStyle'
import Styles from '@config/styles'
import { getAllLogsUser } from '@services/log_usuarios_api_calls'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const Map = ({ currentLocation }) => {
  const [location, setLocation] = useState(currentLocation)
  const [heatPoints, setHeatPoints] = useState()

  useEffect(() => {
    setLocation(currentLocation)
  }, [currentLocation])

  useEffect(() => {
    getAllLogsUser()
      .then((logs) => {
        const formattedLogs = logs.map(function (log) {
          return {
            latitude: log.coordenadas.latitud,
            longitude: log.coordenadas.longitud,
            weight: 1,
          }
        })
        setHeatPoints(formattedLogs)
      })
      .catch((error) => console.log(error))
  }, [])

  if (!location || !heatPoints) {
    return (
      <View style={Styles.container}>
        <Text>Loading map...</Text>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 50 }}
        />
      </View>
    )
  }

  return (
    <MapView
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={Styles.mapStyle}
      initialRegion={{
        latitude: location.latitud,
        longitude: location.longitud,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
      showsUserLocation
      showMyLocationButton
      mapType="standard"
    >
      <MapView.Heatmap
        points={heatPoints}
        opacity={1}
        radius={20}
        maxIntensity={100}
        gradientSmoothing={10}
        heatmapMode="POINTS_DENSITY"
      />
    </MapView>
  )
}

export default Map
