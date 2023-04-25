import { SpeedDial } from '@rneui/themed'
import { getFilteredLogsUser } from '@services/log_usuarios_api_calls'
import * as Location from 'expo-location'
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import BottomSheetButton from '../components/BottomSheetButton'
import CustomModal from '../components/CustomModal'
import Map from '../components/Map'
import MarkerOptionsDialog from '../components/MarkerOptionsDialog'
import Styles from '../config/styles'

function MapScreen({ navigation, route }) {
  const [location, setLocation] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState({})

  const [action, setAction] = useState('mapClear')

  const [dialogVisible, setDialogVisible] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)
  const [modal, setModal] = useState(null)
  const [resultCode, setResultCode] = useState(0)

  const [selectedFilter, setSelectedFilter] = useState({
    label: '24 horas',
    value: 86400,
  })

  const [heatPoints, setHeatPoints] = useState([])

  const [open, setOpen] = useState(false)

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

  useEffect(() => {
    getFilteredLogsUser(selectedFilter.value)
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

  const getFilteredLogs = useCallback((filter) => {
    getFilteredLogsUser(filter.value)
      .then((logs) => {
        const formattedLogs = logs.map((log) => {
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

  const filterOptionList = [
    {
      title: '12 horas',
      onPress: () => {
        const filter = { label: '12 horas', value: 43200 }
        setSelectedFilter(filter)
        getFilteredLogs(filter)
      },
      containerStyle:
        selectedFilter.label === '12 horas' ? { backgroundColor: 'green' } : {},
      titleStyle: selectedFilter.label === '12 horas' ? { color: 'white' } : {},
    },
    {
      title: '24 horas',
      onPress: () => {
        const filter = { label: '24 horas', value: 86400 }
        setSelectedFilter(filter)
        getFilteredLogs(filter)
      },
      containerStyle:
        selectedFilter.label === '24 horas' ? { backgroundColor: 'green' } : {},
      titleStyle: selectedFilter.label === '24 horas' ? { color: 'white' } : {},
    },
    {
      title: '3 días',
      onPress: () => {
        const filter = { label: '3 días', value: 259200 }
        setSelectedFilter(filter)
        getFilteredLogs(filter)
      },
      containerStyle:
        selectedFilter.label === '3 días' ? { backgroundColor: 'green' } : {},
      titleStyle: selectedFilter.label === '3 días' ? { color: 'white' } : {},
    },
    {
      title: '7 días',
      onPress: () => {
        const filter = { label: '7 días', value: 604800 }
        setSelectedFilter(filter)
        getFilteredLogs(filter)
      },
      containerStyle:
        selectedFilter.label === '7 días' ? { backgroundColor: 'green' } : {},
      titleStyle: selectedFilter.label === '7 días' ? { color: 'white' } : {},
    },
  ]

  const actionsList = [
    {
      title: 'Mostrar favoritos',
      onPress: () => {
        showFavoriteLocationMarkers()
        setOpen(!open)
      },
      icon: { name: 'map-marker-star', type: 'material-community' },
      color: '#FFB703',
    },
    {
      title: 'Limpiar marcadores',
      onPress: () => {
        removeAllMarkers()
        setOpen(!open)
      },
      icon: { name: 'map-marker-remove', type: 'material-community' },
      color: '#8ECAE6',
    },
  ]

  return (
    <View style={Styles.mapContainer}>
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
          heatPoints,
          navigation,
          changeStatusDialogCallback,
          action,
          drawMarker,
          removeMarker,
          getSelectedLocationFromMapComponent,
        }}
      />
      <BottomSheetButton
        props={{
          title: 'Filtro: ' + (selectedFilter.label ?? 'Seleccione un filtro'),
          keyName: 'filter',
          list: filterOptionList,
        }}
      />
      <SpeedDial
        title={open ? 'Cerrar' : 'Acciones'}
        titleStyle={{ color: 'black' }}
        isOpen={open}
        icon={{ name: 'map-marker', type: 'material-community' }}
        openIcon={{ name: 'close' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color="#fb8500"
      >
        {actionsList.map((action, index) => {
          return (
            <SpeedDial.Action
              key={'action-' + index}
              icon={action.icon}
              color={action.color}
              title={action.title}
              onPress={action.onPress}
            />
          )
        })}
      </SpeedDial>
    </View>
  )
}

export default MapScreen
