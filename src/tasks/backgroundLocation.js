import { GEOLOCATION_CONFIG, LOCAL_STORAGE } from '@config/constants'
import { createLogUser } from '@services/log_usuarios_api_calls'
import * as Location from 'expo-location'
import * as SecureStore from 'expo-secure-store'
import * as TaskManager from 'expo-task-manager'

const LOCATION_TASK_NAME = 'background-location-task'

const requestPermissions = async () => {
  try {
    if (!(await Location.requestForegroundPermissionsAsync())) {
      alert(
        'Se necesita permiso para que la aplicación se ejecute en primer plano'
      )
      return
    }

    if (!(await Location.requestBackgroundPermissionsAsync())) {
      alert(
        'Se necesita permiso para que la aplicación se ejecute en segundo plano'
      )
      return
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // CHECK LOCATIONS OPTIONS
      accuracy: Location.Accuracy.High,
      timeInterval: GEOLOCATION_CONFIG.TIME_INTERVAL_BACKGROUND_LOCATION, // 5 -- 10 seg -- 20
    })
  } catch (error) {
    console.log('Error getting location permission: ' + error)
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log('Error getting location in background task: ' + error)
    return
  }

  const location = data.locations[0]

  SecureStore.getItemAsync(LOCAL_STORAGE.USER_SESSION).then((id) => {
    createLogUser({
      idUsuario: id,
      coordenadas: {
        latitud: location.coords.latitude,
        longitud: location.coords.longitude,
      },
      timestamp: location.timestamp,
    }).then((response) => console.log('Log created', response))
  })
})

export default requestPermissions
