import CONSTANTS from '@config/constants'
import {
  createUser,
  findAndUpdateUserSession,
} from '@services/usuarios_api_calls'
import * as SecureStore from 'expo-secure-store'

export default function userLogin() {
  SecureStore.getItemAsync(CONSTANTS.USER_SESSION).then((result) => {
    if (!result) {
      createUser({
        timestampCreacion: Date.now(),
        timestampFin: Date.now(),
        timestampUltimoRegistro: Date.now(),
        coordenadas: { latitud: 0, longitud: 0 },
      }).then((response) => {
        console.log('Nuevo usuario registrado con éxito - ' + response)

        SecureStore.setItemAsync(CONSTANTS.USER_SESSION, response)
      })
    } else {
      findAndUpdateUserSession(result, Date.now()).then((response) => {
        console.log('Sesión actualizada correctamente')
      })
    }
  })
}
