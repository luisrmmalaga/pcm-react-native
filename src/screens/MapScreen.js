import Styles from '@config/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from '@react-native-material/core'
import * as Location from 'expo-location'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import CustomModal from '../components/CustomModal'
import Map from '../components/Map'
import MarkerOptionsDialog from '../components/MarkerOptionsDialog'

function MapScreen({ navigation, route }) {
  const [location, setLocation] = useState(null)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState('1H')
  const [selectedLocation, setSelectedLocation] = useState({})
  const [action, setAction] = useState('mapClear')
  const [modalVisible, setModalVisible] = useState(false)
  const [modal, setModal] = useState(null)
  const [resultCode, setResultCode] = useState(0)

  const changeStatusDialogCallback = useCallback(() => {
    setDialogVisible((valor) => !valor)
  }, [])

  const removeMarker = useCallback(() => {
    setAction('removeMarker')
  }, [])

  const removeAllMarkers = useCallback(() => {
    setAction('removeAllMarkers')
  }, [])

  const showFavoriteLocationMarkers = useCallback(() => {
    setAction('favLocationMarkers')
  }, [])

  const drawMarker = useCallback(() => {
    setAction(action !== 'onPressMap' ? 'onPressMap' : 'moveMarker')
  }, [action])

  const getSelectedLocationFromMapComponent = useCallback(
    (location) => setSelectedLocation(location),
    [selectedLocation]
  )

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

  const changeVisibility = useCallback(() => {
    setModalVisible(!modalVisible)
  }, [modalVisible])

  const createModal = useCallback(() => {
    return (
      <CustomModal
        props={{
          modalText:
            resultCode === 200
              ? 'Éxito al crear el marcador'
              : 'Error creando marcador',
          modalVisible,
          changeVisibility,
        }}
      />
    )
  }, [modalVisible, resultCode, changeVisibility])

  useEffect(() => {
    const { resultCode: incomingResultCode, resultData } = route.params || {}

    if (resultData) {
      setResultCode(incomingResultCode)
      setModalVisible(true)
    } else {
      setModalVisible(false)
    }
  }, [route.params])

  useEffect(() => {
    setModal(createModal())
  }, [modalVisible, resultCode])

  return (
    <View style={Styles.container}>
      {modal}
      <MarkerOptionsDialog
        props={{
          dialogVisible,
          changeStatusDialogCallback,
          navigation,
          selectedLocation,
        }}
      />
      <Map
        props={{
          location,
          navigation,
          changeStatusDialogCallback,
          action,
          drawMarker,
          removeMarker,
          getSelectedLocationFromMapComponent,
        }}
      />
      <View style={Styles.mapOptionsBar}>
        <Button
          title="Favoritos"
          style={Styles.favButton}
          color="#fff"
          trailing={(props) => (
            <MaterialCommunityIcons name="star" {...props} />
          )}
          onPress={() => showFavoriteLocationMarkers()}
        />
        <Button
          title="Limpiar"
          style={Styles.clearButton}
          color="#fff"
          trailing={(props) => (
            <MaterialCommunityIcons name="map-marker-remove" {...props} />
          )}
          onPress={() => removeAllMarkers()}
        />
      </View>
    </View>
  )
}

export default MapScreen
