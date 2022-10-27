import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./src/screens/MainMenu";
import MapScreen from "./src/screens/MapScreen";
import requestPermissions from "@tasks/backgroundLocation";
import {
  findAndUpdateUserSession,
  createUser,
} from "./src/services/usuarios_api_calls";
import * as SecureStore from "expo-secure-store";
import CONSTANTS from "@config/constants";

const Stack = createNativeStackNavigator();

function App() {
  //permisos para empezar geolocalización
  requestPermissions();

  // SecureStore.deleteItemAsync(CONSTANTS.USER_SESSION);
  SecureStore.getItemAsync(CONSTANTS.USER_SESSION).then((result) => {
    if (!result) {
      createUser({
        timestampCreacion: Date.now(),
        timestampFin: Date.now(),
        timestampUltimoRegistro: Date.now(),
        coordenadas: { latitud: 0, longitud: 0 },
      }).then((response) => {
        console.log("Nuevo usuario registrado con éxito - " + response);

        //guarda el id del nuevo usuario en el almacenamiento global
        SecureStore.setItemAsync(CONSTANTS.USER_SESSION, response);
      });
    } else {
      findAndUpdateUserSession(result, Date.now()).then((response) => {
        //updatea el log del usuario ya existente
        console.log("Sesión actualizada correctamente");
      });
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}
        initialRouteName="MainMenu"
      >
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
