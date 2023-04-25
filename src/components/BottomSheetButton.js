import { BottomSheet, FAB, ListItem } from '@rneui/themed'
import React, { useState } from 'react'
import Styles from '../config/styles'
const BottomSheetButton = ({ props }) => {
  const [isVisible, setIsVisible] = useState(false)
  const list = props.list

  return (
    <>
      <FAB
        onPress={() => setIsVisible(true)}
        title={props.title}
        titleStyle={{ color: 'black' }}
        icon={{ name: 'filter', type: 'material-community' }}
        placement="left"
        buttonStyle={Styles.mapFilterButton}
      />
      <BottomSheet isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={props.keyName + '-' + i}
            containerStyle={l.containerStyle}
            onPress={() => {
              l.onPress()
              setIsVisible(false)
            }}
            topDivider
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  )
}

export default BottomSheetButton
