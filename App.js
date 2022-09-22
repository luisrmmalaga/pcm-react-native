import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./src/screens/MainMenu";
import MapScreen from "./src/screens/MapScreen";
import requestPermissions from "@hooks/backgroundLocation";
import { createOrUpdateUserSession } from "./src/services/usuarios_api_calls";

const Stack = createNativeStackNavigator();

function App() {
  createOrUpdateUserSession("1111", Date.now());
  requestPermissions();
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
