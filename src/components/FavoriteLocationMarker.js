import Styles from '@config/styles'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Callout, Circle, Marker } from 'react-native-maps'

const favoriteLocationMarker = ({ props }) => {
  const location = props.location
  const changeStatusDialogCallback = props.changeStatusDialogCallback
  const getSelectedLocationFromMapComponent =
    props.getSelectedLocationFromMapComponent
  const removeMarker = props.removeMarker

  const [showRadius, setShowRadius] = useState(false)
  const [radiusCircle, setRadiusCircle] = useState(null)

  const drawRadiusCircle = () => {
    setRadiusCircle(
      showRadius ? (
        <Circle
          strokeColor="black"
          strokeWidth={2.5}
          fillColor="rgba(251, 133, 0,0.35)"
          center={{
            latitude: location.coordenadas.latitud,
            longitude: location.coordenadas.longitud,
          }}
          radius={location.radio}
        />
      ) : null
    )
  }

  useEffect(() => {
    drawRadiusCircle()
  }, [showRadius])

  return (
    <>
      <Marker
        coordinate={{
          latitude: location.coordenadas.latitud,
          longitude: location.coordenadas.longitud,
        }}
        onCalloutPress={changeStatusDialogCallback}
        image={require('../assets/fav-marker.png')}
        onPress={() => {
          setShowRadius(!showRadius)
          getSelectedLocationFromMapComponent(location)
          removeMarker()
        }}
      >
        <Callout tooltip>
          <View>
            <View style={Styles.bubble}>
              <Ionicons name="options" size={24} />
              <Text>Opciones</Text>
            </View>
            <View style={Styles.arrowBorder} />
            <View style={Styles.arrow} />
          </View>
        </Callout>
      </Marker>
      {radiusCircle}
    </>
  )
}

export default favoriteLocationMarker
