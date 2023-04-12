import Styles from '@config/styles'
import { Icon } from '@rneui/themed'
import React from 'react'

const editButton = ({ props }) => {
  const navigation = props.navigation
  const location = props.location

  const goToFavFormScreen = () => {
    navigation.navigate('FavFormScreen', location)
  }

  return (
    <Icon
      reverse
      raised
      name="pencil"
      type="ionicon"
      color="#fb8500"
      size={20}
      onPress={() => goToFavFormScreen(location)}
      containerStyle={Styles.editIcon}
    />
  )
}

export default editButton
