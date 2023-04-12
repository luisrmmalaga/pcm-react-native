import { Button } from '@react-native-material/core'
import React from 'react'
import { Image, ImageBackground, View } from 'react-native'
import Styles from '../config/styles.js'

function MainMenu({ navigation }) {
  const goToMap = () => {
    navigation.navigate('MapScreen')
  }

  const goToFavs = () => {
    navigation.navigate('FavListScreen')
  }

  const goToMetrics = () => {
    console.log('metricas status: wip')
  }

  return (
    <View style={Styles.menuContainer}>
      <ImageBackground
        style={[Styles.menuBackground, Styles.menuContainer]}
        source={require('../assets/fondo-menu.jpg')}
      >
        <Image style={Styles.logo} source={require('../assets/pcm-icon.png')} />
        <Button
          onPress={goToMap}
          title="MAPA"
          style={[Styles.button, Styles.menuButton]}
        />
        <Button
          onPress={goToFavs}
          title="FAVORITOS"
          style={[Styles.button, Styles.menuButton]}
        />
        <Button
          onPress={goToMetrics}
          title="MÉTRICAS"
          style={[Styles.button, Styles.menuButton]}
        />
      </ImageBackground>
    </View>
  )
}

export default MainMenu
