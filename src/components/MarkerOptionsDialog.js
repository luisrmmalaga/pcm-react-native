import { LOCAL_STORAGE } from '@config/constants'
import { Button, Chip, HStack, VStack } from '@react-native-material/core'
import { Dialog, Icon } from '@rneui/themed'
import { upsertFavourite } from '@services/favoritos_api_calls'
import { getLogsFromSelectedLocation } from '@services/log_usuarios_api_calls'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import Styles from '../config/styles'
import DataCard from './DataCard'

const MarkerOptionsDialog = ({ props }) => {
  const navigation = props.navigation
  const [location, setLocation] = useState(props.selectedLocation)
  const [radio, setRadio] = useState()
  const [densidad, setDensidad] = useState()

  useEffect(() => {
    setLocation(props.selectedLocation)
    setRadio(props.selectedLocation?.radio ?? 100)
    setDensidad(props.selectedLocation?.densidad ?? 0)
  }, [props.selectedLocation])

  useEffect(() => {
    if (Object.keys(location).length > 0 && !location.nombre) {
      getLogsFromSelectedLocation({
        latitud: location.latitude,
        longitud: location.longitude,
      })
        .then((result) => {
          setDensidad(result.densidad)
        })
        .catch((error) => console.log(error))
    }
  }, [location])

  const goToFavFormScreen = () => {
    props.changeStatusDialogCallback()
    navigation.navigate('FavFormScreen', location)
  }

  const updateFavLocationData = () => {
    const filter = {
      idUsuario: location.idUsuario,
      latitud: location.coordenadas.latitud,
      longitud: location.coordenadas.longitud,
      timestampCreacion: location.timestampCreacion,
    }

    SecureStore.getItemAsync(LOCAL_STORAGE.USER_SESSION).then((result) => {
      const fav = {
        idUsuario: result,
        nombre: location.nombre,
        coordenadas: {
          latitud: location.coordenadas.latitud,
          longitud: location.coordenadas.longitud,
        },
        timestampCreacion: location.timestampCreacion,
        timestampUltimaMuestra: Date.now(),
        densidad: location.densidad,
        radio: location.radio,
      }

      upsertFavourite(filter, fav)
        .then((result) => {
          setLocation(result.data)
          props.changeStatusDialogCallback()
        })
        .catch((error) => console.log(error))
    })
  }

  return (
    <Dialog
      visible={props.dialogVisible}
      onDismiss={props.changeStatusDialogCallback}
    >
      <Dialog.Title
        title={location.nombre ?? 'Opciones'}
        titleStyle={Styles.dialogTitle}
      />
      <VStack center spacing={20} divider={true}>
        <VStack center>
          <HStack>
            <DataCard
              props={{
                data: {
                  title: 'Radio',
                  value: radio,
                },
              }}
            />

            <DataCard
              props={{
                data: {
                  title: 'Densidad',
                  value: densidad,
                },
              }}
            />
          </HStack>
          <HStack>
            {location.nombre && (
              <DataCard
                props={{
                  data: {
                    title: 'Tendencia',
                    value: location.densidad,
                  },
                }}
              />
            )}
          </HStack>
        </VStack>
        <VStack spacing={10}>
          <Chip
            style={Styles.chip}
            color="black"
            contentContainerStyle={Styles.dialogChip}
            label={location.nombre ? 'Editar marcador' : 'Añadir a favoritos'}
            leading={() =>
              location.nombre ? (
                <Icon name="pencil" type="ionicon" color="black" size={22} />
              ) : (
                <Icon color="black" type="entypo" name="plus" size={22} />
              )
            }
            onPress={goToFavFormScreen}
          />
          {location.nombre && (
            <Chip
              style={Styles.chip}
              color="black"
              contentContainerStyle={Styles.dialogChip}
              label="Sincronizar datos"
              leading={() => (
                <Icon
                  name="refresh-circle"
                  type="ionicon"
                  color="black"
                  size={22}
                />
              )}
              onPress={updateFavLocationData}
            />
          )}
        </VStack>
      </VStack>
      <Dialog.Actions>
        <HStack>
          <Button
            title="Salir"
            compact
            style={Styles.button}
            onPress={props.changeStatusDialogCallback}
          />
        </HStack>
      </Dialog.Actions>
    </Dialog>
  )
}

export default MarkerOptionsDialog
