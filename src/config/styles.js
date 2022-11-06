import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: { fontSize: 40, margin: 10 },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export default Styles
