import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FavScreen from '@screens/FavScreen'
import MainMenu from '@screens/MainMenu'
import MapScreen from '@screens/MapScreen'
import requestPermissions from '@tasks/backgroundLocation'
import userLogin from '@tasks/userLogin'
import React from 'react'

const Stack = createNativeStackNavigator()

function App () {
  requestPermissions()
  userLogin()

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null
        }}
        initialRouteName='MainMenu'
      >
        <Stack.Screen name='MainMenu' component={MainMenu} />
        <Stack.Screen name='MapScreen' component={MapScreen} />
        <Stack.Screen name='FavScreen' component={FavScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
