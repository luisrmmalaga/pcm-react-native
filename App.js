// eslint-disable-next-line no-unused-vars
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Provider } from '@react-native-material/core'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from '@rneui/themed'
import FavFormScreen from '@screens/FavFormScreen'
import FavListScreen from '@screens/FavListScreen'
import MainMenu from '@screens/MainMenu'
import MapScreen from '@screens/MapScreen'
import requestPermissions from '@tasks/backgroundLocation'
import userLogin from '@tasks/userLogin'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// eslint-disable-next-line no-undef, no-unused-vars
const Stack = createNativeStackNavigator()

function App() {
  requestPermissions()
  userLogin()

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Provider IconComponent={MaterialCommunityIcons}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                header: () => null,
              }}
              initialRouteName="MainMenu"
            >
              <Stack.Screen name="MainMenu" component={MainMenu} />
              <Stack.Screen name="MapScreen" component={MapScreen} />
              <Stack.Screen name="FavListScreen" component={FavListScreen} />
              <Stack.Screen name="FavFormScreen" component={FavFormScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default App
