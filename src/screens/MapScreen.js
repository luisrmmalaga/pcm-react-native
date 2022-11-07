import Styles from '@config/styles'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Map from '../components/Map'

function MapScreen() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    let isMounted = true
    Location.getCurrentPositionAsync()
      .then((loc) => {
        if (isMounted) {
          setLocation({
            latitud: loc.coords.latitude,
            longitud: loc.coords.longitude,
          })
        }
      })
      .catch((error) => console.log(error))
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <View style={Styles.container}>
      <Map currentLocation={location} />
    </View>
  )
}

export default MapScreen
