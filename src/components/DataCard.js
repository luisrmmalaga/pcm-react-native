import Styles from '@config/styles'
import { HStack } from '@react-native-material/core'
import { Card, Icon, Text } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

const dataCard = ({ props }) => {
  const [title, setTitle] = useState(props.data.title)
  const [value, setValue] = useState(props.data.value)

  useEffect(() => {
    setTitle(props.data.title)
    setValue(props.data.value)
  }, [props.data])

  const getUnits = (title) => {
    switch (title) {
      case 'Densidad':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Text style={{ lineHeight: 30, fontWeight: 'bold' }}>{value}</Text>
            <Text style={{ lineHeight: 30, fontWeight: 'bold' }}> p/km</Text>
            <Text style={{ lineHeight: 18, fontWeight: 'bold' }}>2</Text>
          </View>
        )

      case 'Radio':
        return <Text style={{ fontWeight: 'bold' }}>{value} m</Text>
      default:
        return <Text style={{ fontWeight: 'bold' }}>{value}</Text>
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
            {value > 0 ? (
              <Icon color="red" type="entypo" name="plus" size={20} />
            ) : value < 0 ? (
              <Icon color="green" type="entypo" name="minus" size={20} />
            ) : null}
            <Text
              style={{ fontWeight: 'bold', color: value > 0 ? 'red' : 'green' }}
            >
              {Math.abs(value)}
              {'%'}
            </Text>
            {value > 0 ? (
              <Icon name="trending-up" type="feather" color="red" size={30} />
            ) : value < 0 ? (
              <Icon
                name="trending-down"
                type="feather"
                color="green"
                size={30}
              />
            ) : null}
          </HStack>
        ) : (
          getUnits(title)
        )}
      </View>
    </Card>
  )
}

export default dataCard
