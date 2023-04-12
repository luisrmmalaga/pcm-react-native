import { LOCAL_STORAGE } from '@config/constants'
import {
  createUser,
  findAndUpdateUserSession,
} from '@services/usuarios_api_calls'
import * as SecureStore from 'expo-secure-store'

export default function userLogin() {
  const timestamp = Date.now()

  SecureStore.getItemAsync(LOCAL_STORAGE.USER_SESSION).then((result) => {
    if (!result) {
      createUser({
        timestampCreacion: timestamp,
        timestampFin: timestamp,
        timestampUltimoRegistro: timestamp,
        coordenadas: { latitud: 0, longitud: 0 },
      }).then((response) => {
        console.log('Nuevo usuario registrado con éxito - ' + response)

        SecureStore.setItemAsync(LOCAL_STORAGE.USER_SESSION, response)
      })
    } else {
      findAndUpdateUserSession(result, timestamp).then(() => {
        console.log('Sesión actualizada correctamente')
      })
    }
  })
}
