import { Button, Chip, HStack, VStack } from '@react-native-material/core'
import { Dialog, Icon } from '@rneui/themed'
import { calculateTrending } from '@services/checkpoints_service_api_calls'
import { getLogsFromSelectedLocation } from '@services/log_usuarios_api_calls'
import React, { useEffect, useState } from 'react'
import Styles from '../config/styles'
import DataCard from './DataCard'

const MarkerOptionsDialog = ({ props }) => {
  const navigation = props.navigation
  const [location, setLocation] = useState(props.selectedLocation)
  const [radio, setRadio] = useState()
  const [densidad, setDensidad] = useState()
  const [tendencia, setTendencia] = useState()

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

    if (location.nombre) {
      calculateTrending({
        nombre: location.nombre,
        user: location.idUsuario,
      })
        .then((tendencia) => {
          setTendencia(tendencia)
        })
        .catch((error) => console.log(error))
    }
  }, [location])

  const goToFavFormScreen = () => {
    props.changeStatusDialogCallback()
    navigation.navigate('FavFormScreen', location)
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
                    value: tendencia,
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
