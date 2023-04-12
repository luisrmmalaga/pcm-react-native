import { ERRORS, LOCAL_STORAGE } from '@config/constants'
import Styles from '@config/styles'
import { FontAwesome } from '@expo/vector-icons'
import { Button, VStack } from '@react-native-material/core'
import { upsertFavourite } from '@services/favoritos_api_calls'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ImageBackground, Text, TextInput, View } from 'react-native'

function FavFormScreen({ route, navigation }) {
  const [location, setLocation] = useState(route.params)
  const [filter, setFilter] = useState({})

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: location.nombre ?? '',
      radio: location.radio?.toString() ?? '',
    },
  })

  useEffect(() => {
    setFilter({
      idUsuario: location.idUsuario ?? 'new',
      latitud: location.coordenadas?.latitud ?? 0,
      longitud: location.coordenadas?.longitud ?? 0,
      timestampCreacion: location.timestampCreacion ?? 0,
    })
  }, [])

  const onSubmit = (data) => {
    SecureStore.getItemAsync(LOCAL_STORAGE.USER_SESSION).then((result) => {
      const fav = {
        idUsuario: result,
        nombre: data.nombre,
        coordenadas: {
          latitud: location.coordenadas?.latitud ?? location.latitude,
          longitud: location.coordenadas?.longitud ?? location.longitude,
        },
        timestampCreacion: location.timestampCreacion ?? Date.now(),
        timestampUltimaMuestra: location.timestampUltimaMuestra ?? Date.now(),
        densidad: location.densidad ?? 0,
        radio: data.radio,
      }

      const goBack =
        navigation.getState().routes[navigation.getState().index - 1].name

      upsertFavourite(filter, fav).then((result) => {
        navigation.navigate({
          name: goBack,
          params: { resultCode: result.status, resultData: result.data },
          merge: true,
        })
      })
    })
  }

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    }
  }

  return (
    <ImageBackground
      style={[Styles.menuBackground, Styles.menuContainer]}
      source={require('../assets/fondo-fav-form.jpg')}
    >
      <VStack
        m={20}
        spacing={50}
        style={{ justifyContent: 'space-between' }}
        divider={true}
      >
        <VStack spacing={10}>
          <Text style={Styles.label}>Nombre</Text>
          <Controller
            control={control}
            name="nombre"
            rules={{ required: ERRORS.REQUIRED_NAME }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <View
                  style={[
                    Styles.inputContainer,
                    { borderColor: error ? 'red' : 'black' },
                  ]}
                >
                  <TextInput
                    style={Styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>

                {error && (
                  <Text style={Styles.textError}>
                    {error.message || 'Error'}
                  </Text>
                )}
              </>
            )}
          />
          <Text style={Styles.label}>Radio de medición</Text>
          <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <>
                <View
                  style={[
                    Styles.inputContainer,
                    { borderColor: error ? 'red' : 'black' },
                  ]}
                >
                  <TextInput
                    style={Styles.input}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                </View>
                {error && (
                  <Text style={Styles.textError}>
                    {error.message || 'Error'}
                  </Text>
                )}
              </>
            )}
            name="radio"
            rules={{
              required: ERRORS.REQUIRED_RADIO,
              validate: (value) => value > 0 || ERRORS.VALIDATE_RADIO,
            }}
          />
        </VStack>
        <VStack center spacing={50}>
          <Button
            title="Guardar"
            style={Styles.formButton}
            trailing={(props) => <FontAwesome name="save" {...props} />}
            onPress={handleSubmit(onSubmit)}
          />
          <Button
            title="Reset"
            style={Styles.formButton}
            trailing={(props) => <FontAwesome name="eraser" {...props} />}
            onPress={() => {
              reset({
                nombre: location.nombre ?? '',
                radio: location.radio?.toString() ?? '',
              })
            }}
          />
        </VStack>
      </VStack>
    </ImageBackground>
  )
}

export default FavFormScreen
