import Styles from '@config/styles'
import { HStack } from '@react-native-material/core'
import { Card, Icon, Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'

const dataCard = ({ props }) => {
  const { title, value } = props.data

  const getUnidadDeMedida = () => {
    switch (title) {
      case 'Densidad':
        return 'p/km'

      case 'Radio':
        return 'm'
    }
  }

  return (
    <Card containerStyle={Styles.favDataCard}>
      <Card.Title>{title}</Card.Title>
      <Card.Divider width={2} color="black" />
      <View
        style={{
          alignItems: 'center',
        }}
      >
        {title === 'Tendencia' ? (
          <HStack center>
            {value !== 'hola' ? (
              <Icon color="red" type="entypo" name="plus" size={20} />
            ) : (
              <Icon color="green" type="entypo" name="minus" size={20} />
            )}
            <Text h4>
              {value}
              {'%'}
            </Text>
            {value !== 'hola' ? (
              <Icon name="trending-up" type="feather" color="red" size={30} />
            ) : (
              <Icon
                name="trending-down"
                type="feather"
                color="green"
                size={30}
              />
            )}
          </HStack>
        ) : (
          <Text h4>
            {value} {getUnidadDeMedida()}
          </Text>
        )}
      </View>
    </Card>
  )
}

export default dataCard
