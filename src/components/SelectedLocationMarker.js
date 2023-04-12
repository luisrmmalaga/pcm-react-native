import Styles from '@config/styles'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Callout, Circle, Marker } from 'react-native-maps'

const selectedLocationMarker = ({ props }) => {
  const coordenadas = props.location

  const [radiusCircle, setRadiusCircle] = useState(null)

  const drawRadiusCircle = () => {
    setRadiusCircle(
      <Circle
        strokeColor="black"
        strokeWidth={2.5}
        fillColor="rgba(251, 133, 0,0.35)"
        center={{
          latitude: coordenadas.latitude,
          longitude: coordenadas.longitude,
        }}
        radius={100}
      />
    )
  }

  useEffect(() => {
    drawRadiusCircle()
  }, [])

  if (Object.keys(coordenadas).length !== 0) {
    return (
      <>
        <Marker
          key={
            'selectedLocationMarker:' +
            coordenadas.latitude +
            ':' +
            coordenadas.longitude +
            ':' +
            Date.now()
          }
          coordinate={coordenadas}
          onCalloutPress={props.changeStatusDialogCallback}
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
}

export default selectedLocationMarker
