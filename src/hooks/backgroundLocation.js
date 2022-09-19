import React from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { createLogUser } from "@services/log_usuarios_api_calls";

const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  try {
    if (!(await Location.requestForegroundPermissionsAsync())) {
      alert(
        "Se necesita permiso para que la aplicación se ejecute en primer plano"
      );
      return;
    }

    if (!(await Location.requestBackgroundPermissionsAsync())) {
      alert(
        "Se necesita permiso para que la aplicación se ejecute en segundo plano"
      );
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      //CHECK LOCATIONS OPTIONS
      accuracy: Location.Accuracy.High,
      timeInterval: 2500,
    });
  } catch (error) {
    console.log("Error getting location permission: " + error);
  }
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log("Error getting location in background task: " + error);
    return;
  }

  const location = data.locations[0];
  // console.log("background location: ", location);
  createLogUser({
    idUsuario: "6243369cf43cadc650142025",
    coordenadas: {
      latitud: location.coords.latitude,
      longitud: location.coords.longitude,
    },
    timestamp: location.timestamp,
  }).then((response) => console.log("Log created", response));
});

export default requestPermissions;
