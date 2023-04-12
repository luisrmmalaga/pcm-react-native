import Styles from '@config/styles'
import { VStack } from '@react-native-material/core'
import { Icon, ListItem, Text } from '@rneui/themed'
import React, { useState } from 'react'
import EditButton from './EditButton'

const FavouriteLocationCard = ({ item, update, navigation }) => {
  const [check, setCheck] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const location = item.item
  const updateChecksState = update

  const getUnidadDeMedida = (title) => {
    switch (title) {
      case 'Densidad':
        return 'personas/km'

      case 'Radio':
        return 'm'
    }
  }

  return (
    <ListItem.Accordion
      containerStyle={Styles.accordionListItem}
      content={
        <>
          <ListItem.CheckBox
            checkedColor="red"
            uncheckedColor="black"
            iconType="antdesign"
            checkedIcon="minussquare"
            uncheckedIcon="plussquare"
            containerStyle={Styles.checkboxListItem}
            checked={check}
            onPress={() => {
              setCheck(!check)
              updateChecksState(item.index)
            }}
          />
          <ListItem.Content containerStyle={Styles.listItemContent}>
            <ListItem.Title>
              <Text>Nombre: {location.nombre}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text>
                Radio: {location.radio} {getUnidadDeMedida('Radio')}
              </Text>
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              <Text>
                Densidad: {location.densidad} {getUnidadDeMedida('Densidad')}
              </Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <EditButton props={{ location, navigation }} />
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded)
      }}
      icon={<Icon type="feather" name="chevron-up" />}
    >
      <ListItem containerStyle={Styles.expandedListItem}>
        <VStack>
          <ListItem.Content>
            <ListItem.Title>
              <Text>Latitud: {location.coordenadas.latitud}</Text>
            </ListItem.Title>
            <ListItem.Title>
              <Text>Longitud: {location.coordenadas.longitud}</Text>
            </ListItem.Title>
          </ListItem.Content>
        </VStack>
      </ListItem>
    </ListItem.Accordion>
  )
}

export default FavouriteLocationCard
