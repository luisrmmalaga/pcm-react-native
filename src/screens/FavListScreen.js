import { LOCAL_STORAGE } from '@config/constants'
import Styles from '@config/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Button } from '@react-native-material/core'
import {
  deleteFavouriteByUserIdTimestampAndCoords,
  getFavouritesByUserId,
} from '@services/favoritos_api_calls'
import * as SecureStore from 'expo-secure-store'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomModal from '../components/CustomModal'
import FavouriteLocationCard from '../components/FavouriteLocationCard'

function FavListScreen({ navigation, route }) {
  const [favLocations, setFavLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [checksStates, setChecksStates] = useState([])
  const [deleteStatusCodes, setDeleteStatusCodes] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modal, setModal] = useState(null)
  const [editResultCode, setEditResultCode] = useState(0)
  const [modalMessage, setModalMessage] = useState('')

  const getFavLocations = () => {
    SecureStore.getItemAsync(LOCAL_STORAGE.USER_SESSION).then((result) => {
      getFavouritesByUserId(result)
        .then((favLocations) => {
          setFavLocations(favLocations)
          setLoading(false)
          setChecksStates(new Array(favLocations.length).fill(false))
        })
        .catch((error) => console.log(error))
    })
  }

  useEffect(() => {
    getFavLocations()
  }, [])

  useEffect(() => {
    const { resultCode: incomingResultCode, resultData } = route.params || {}

    if (resultData) {
      setEditResultCode(incomingResultCode)
      setModalVisible(true)
      setModalMessage(
        incomingResultCode === 200
          ? 'Cambios guardados con éxito'
          : 'Error al modificar marcador'
      )
      getFavLocations()
    } else {
      setModalVisible(false)
    }
  }, [route.params])

  useEffect(() => {
    setModal(createModal())
    setChecksStates(new Array(favLocations.length).fill(false))
  }, [modalVisible, favLocations])

  const updateChecksState = useCallback((position) => {
    setChecksStates((prevChecksStates) =>
      prevChecksStates.map((value, index) => {
        return position === index ? !value : value
      })
    )
  }, [])

  const removeFavLocationFromStateArray = () => {
    const condicion = !checksStates.includes(true) || favLocations.length === 0
    const status = condicion
      ? ['No hay selección']
      : removeFavLocationSelected()

    setDeleteStatusCodes(status)
    setModalMessage(
      status?.every((statusCode) => statusCode === 204)
        ? 'Éxito al eliminar la selección de marcadores'
        : 'No se han eliminado marcadores'
    )
    setFavLocations((prevFavLocations) =>
      prevFavLocations.filter((value, index) => !checksStates[index])
    )
    setModalVisible(true)
  }

  const changeVisibility = useCallback(() => {
    setModalVisible((prevModalVisible) => !prevModalVisible)
  }, [])

  const createModal = useCallback(() => {
    const status =
      deleteStatusCodes?.every((statusCode) => statusCode === 204) ||
      editResultCode === 200

    return (
      <CustomModal
        props={{
          modalText: modalMessage,
          modalVisible,
          changeVisibility,
          icon: status ? 'check-circle-outline' : 'alert-outline',
          color: status ? 'green' : 'red',
        }}
      />
    )
  }, [checksStates, favLocations, modalVisible, changeVisibility])

  const removeFavLocationSelected = () => {
    const responseCodes = []

    favLocations.forEach((fav, index) => {
      if (checksStates[index]) {
        deleteFavouriteByUserIdTimestampAndCoords(fav)
          .then((resultCode) => {
            responseCodes.push(resultCode)
          })
          .catch((error) => console.log(error))
      }
    })

    return responseCodes
  }

  return (
    <View style={Styles.container}>
      {modal}
      <SafeAreaView style={Styles.favList}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            data={favLocations}
            keyExtractor={(fav, index) => index + '-' + fav.timestampCreacion}
            renderItem={(fav, index) => (
              <FavouriteLocationCard
                item={fav}
                update={updateChecksState}
                navigation={navigation}
              />
            )}
          />
        )}
      </SafeAreaView>
      <View style={Styles.favListOptionsBar}>
        <Button
          title="Eliminar"
          style={Styles.removeFavLocationButton}
          trailing={(props) => (
            <MaterialCommunityIcons name="delete-forever" {...props} />
          )}
          onPress={() => removeFavLocationFromStateArray()}
        />
      </View>
    </View>
  )
}

export default FavListScreen
