import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMenu from "./src/screens/MainMenu";
import MapScreen from "./src/screens/MapScreen";
import { Provider } from "react-redux";
import { Store } from "./src/services/usuarios_service/usuarios_store";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={Store}>
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
    </Provider>
  );
}

export default App;
