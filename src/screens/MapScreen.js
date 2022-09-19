import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import Styles from "@config/styles";
//import { getAllLogsUser } from "@services/log_usuarios_api_calls"; //PRUEBAS
import Map from "../components/Map";
import * as Location from "expo-location";

function MapScreen() {
  // const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let isMounted = true;
    Location.getCurrentPositionAsync()
      .then((loc) => {
        if (isMounted) {
          setLocation({
            latitud: loc.coords.latitude,
            longitud: loc.coords.longitude,
          });
        }
      })
      .catch((error) => console.log(error));
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   getAllLogsUser()
  //     .then((logs) => {
  //       formattedLogs = logs.map(function (log) {
  //         return {
  //           latitude: log.coordenadas.latitud,
  //           longitude: log.coordenadas.longitud,
  //           weight: 1,
  //         };
  //       });
  //       setMarkers(formattedLogs);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  //------- PRUEBAS ----------------------------------------------
  // renderItem = ({ item }) => {
  //   return (
  //     <View style={Styles.container}>
  //       <Text>Latitud: {item.coordenadas.latitud}</Text>
  //       <Text>Longitud: {item.coordenadas.longitud}</Text>
  //     </View>
  //   );
  // };

  // emptyList = () => {
  //   return (
  //     <View style={Styles.container}>
  //       <Text>No hay usuarios</Text>
  //     </View>
  //   );
  // };

  // const onPressLearnMore = () => {
  //   console.log(users);
  // };

  //----------------------------------------------------------------

  return (
    <View style={Styles.container}>
      {/* <FlatList
        data={users}
        keyExtractor={({ item }, index) => {
          return index.toString();
        }}
        renderItem={users ? this.renderItem : this.emptyList}
      /> */}
      <Map currentLocation={location} />
      {/* propMarkers={markers} */}
    </View>
  );
}

export default MapScreen;
