import Styles from '@config/styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  HStack,
  Text,
  VStack,
} from '@react-native-material/core'
import React from 'react'
import { View } from 'react-native'

function CustomModal({ props }) {
  return (
    <View>
      <Dialog visible={props.modalVisible} onDismiss={props.changeVisibility}>
        <DialogContent>
          <VStack spacing={4} center>
            <Text variant="subtitle1" style={Styles.modalText}>
              {props.modalText}
            </Text>
            <MaterialCommunityIcons
              size={50}
              style={Styles.mTop}
              name={props.icon ?? 'check-circle-outline'}
              color={props.color ?? 'green'}
            />
          </VStack>
        </DialogContent>
        <DialogActions>
          <HStack>
            <Button
              title="Cerrar"
              compact
              style={Styles.button}
              onPress={props.changeVisibility}
            />
          </HStack>
        </DialogActions>
      </Dialog>
    </View>
  )
}

export default CustomModal
