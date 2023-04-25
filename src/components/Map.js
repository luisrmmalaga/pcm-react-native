import { LOCAL_STORAGE } from '@config/constants'
import { mapStyle } from '@config/mapStyle'
import Styles from '@config/styles'
import { getFavouritesByUserId } from '@services/favoritos_api_calls'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import FavoriteLocationMarker from './FavoriteLocationMarker'
import SelectedLocationMarker from './SelectedLocationMarker'

const Map = ({ props }) => {
  const navigation = props.navigation
  const changeStatusDialogCallback = props.changeStatusDialogCallback
  const drawMarker = props.drawMarker
  const removeMarker = props.removeMarker
  const getSelectedLocationFromMapComponent =
    props.getSelectedLocationFromMapComponent
  const heatPoints = props.heatPoints

  const [location, setLocation] = useState(props.location)
  const [selectedLocation, setSelectedLocation] = useState({})
  const [marker, setMarker] = useState(null)
  const [favLocationMarkers, setFavLocationMarkers] = useState([])

  const showMarker = () => {
    switch (props.action) {
      case 'onPressMap':
        setMarker(
          <SelectedLocationMarker
            props={{
              location: selectedLocation,
              navigation,
              changeStatusDialogCallback,
            }}
          />
        )
        break
      case 'moveMarker':
        setMarker(null)
        drawMarker()
        break
      case 'removeMarker':
        setMarker(null)
        break
      case 'favLocationMarkers':
        SecureStore.getItemAsync(LOCAL_STORAGE.USER_SESSION).then((result) => {
          getFavouritesByUserId(result)
            .then((favLocations) => {
              setFavLocationMarkers(favLocations)
            })
            .catch((error) => console.log(error))
        })

        break
      default:
        setMarker(null)
        setFavLocationMarkers([])
    }
  }

  useEffect(() => {
    setLocation(props.location)
  }, [props.location])

  useEffect(() => {
    showMarker()
  }, [props.action])

  if (!location || !heatPoints) {
    return (
      <View style={Styles.container}>
        <Text>Loading map...</Text>
        <ActivityIndicator
          size="large"
          color="#fff"
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
      onPress={(event) => {
        setSelectedLocation(event.nativeEvent.coordinate)
        getSelectedLocationFromMapComponent(event.nativeEvent.coordinate)
        drawMarker()
      }}
    >
      {marker}

      {favLocationMarkers.length > 0 &&
        favLocationMarkers.map((location, index) => (
          <FavoriteLocationMarker
            key={
              'FavoriteLocationMarker:' +
              index +
              ':' +
              location.timestampCreacion
            }
            props={{
              location,
              navigation,
              changeStatusDialogCallback,
              getSelectedLocationFromMapComponent,
              removeMarker,
            }}
          />
        ))}

      {heatPoints.length > 0 && (
        <MapView.Heatmap
          points={heatPoints}
          opacity={1}
          radius={20}
          maxIntensity={100}
          gradientSmoothing={10}
          heatmapMode="POINTS_DENSITY"
        />
      )}
    </MapView>
  )
}

export default Map
