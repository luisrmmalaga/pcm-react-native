import Constants from 'expo-constants'
import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023047',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#023047',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 150,
    height: 150,
  },
  menuBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: { fontSize: 40, margin: 10 },
  bubble: {
    flexDirection: 'row',
    backgroundColor: '#219EBC',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#fff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#219EBC',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#219EBC',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapOptionsBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  favListOptionsBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#023047',
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    width: Dimensions.get('window').width / 1.5,
    padding: 10,
    borderRadius: 4,
  },
  formButton: {
    width: Dimensions.get('window').width / 3,
    backgroundColor: '#023047',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#023047',
    borderRadius: 4,
  },
  menuButton: {
    width: Dimensions.get('window').width / 3,
  },
  markerActionsButton: {
    backgroundColor: '#fb8500',
  },
  mapFilterButton: {
    backgroundColor: '#fb8500',
  },
  favButton: {
    backgroundColor: '#FFB703',
  },
  clearButton: {
    backgroundColor: '#8ECAE6',
  },
  timeFilterDropdown: {
    width: Dimensions.get('window').width / 2,
  },
  timeFilterDropdownBox: {
    width: Dimensions.get('window').width / 2,
  },
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
    padding: 5,
    fontSize: 15,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#37056D',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius: 5,
  },
  textError: {
    color: 'red',
    alignSelf: 'stretch',
    fontSize: 15,
  },
  modalText: {
    marginTop: Constants.statusBarHeight,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mTop: {
    marginTop: Constants.statusBarHeight,
  },
  favList: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 8,
  },
  expandedListItem: {
    backgroundColor: '#219ebc',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  accordionListItem: {
    backgroundColor: '#8ECAE6',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  checkboxListItem: {
    backgroundColor: '#8ECAE6',
    marginRight: 25,
  },
  removeFavLocationButton: {
    backgroundColor: 'red',
    borderRadius: 4,
  },
  editIcon: {
    marginHorizontal: 20,
  },
  formStack: {
    backgroundColor: '#8ecae6',
    padding: 25,
    paddingTop: 0,
  },
  dialogChip: {
    backgroundColor: '#8ECAE6',
    justifyContent: 'center',
  },
  chip: {
    width: Dimensions.get('window').width / 2,
    elevation: 10,
  },
  dialogTitle: { fontSize: 25 },
  favDataCard: {
    elevation: 10,
    backgroundColor: '#8ECAE6',
  },
  graphicsView: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: Dimensions.get('window').width,
    flex: 1,
  },
  graphicTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  tabContainer: {
    backgroundColor: '#023047',
  },
  tabIndicator: {
    backgroundColor: 'white',
    height: 3,
  },
})

export default Styles
