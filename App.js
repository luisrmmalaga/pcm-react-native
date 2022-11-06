// eslint-disable-next-line no-unused-vars
import { NavigationContainer } from '@react-navigation/native'
import FavScreen from '@screens/FavScreen'
import MainMenu from '@screens/MainMenu'
import MapScreen from '@screens/MapScreen'
import requestPermissions from '@tasks/backgroundLocation'
import userLogin from '@tasks/userLogin'

// eslint-disable-next-line no-undef, no-unused-vars
const Stack = createNativeStackNavigator()

function App() {
  requestPermissions()
  userLogin()

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
        <Stack.Screen name="FavScreen" component={FavScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
