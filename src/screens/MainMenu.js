import React from 'react'
import { Button, Image, View } from 'react-native'
import Styles from '../config/styles.js'

function MainMenu({ navigation }) {
  const goToMap = () => {
    navigation.navigate('MapScreen')
  }

  const goToFavs = () => {
    navigation.navigate('FavScreen')
  }

  const goToMetrics = () => {
    console.log('metricas status: wip')
  }

  return (
    <View style={Styles.container}>
      <Image style={Styles.logo} source={require('../assets/pcm-icon.png')} />
      <Button onPress={goToMap} title="MAPA" color="dodgerblue" />
      <Button onPress={goToFavs} title="FAVORITOS" color="dodgerblue" />
      <Button onPress={goToMetrics} title="MÉTRICAS" color="dodgerblue" />
    </View>
  )
}

export default MainMenu
