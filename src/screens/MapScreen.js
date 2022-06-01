import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import Styles from "@config/styles";
import { getAllUsers } from "@services/usuarios_api_calls";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "@config/mapStyle";

function MapScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((users) => setUsers(users))
      .catch((error) => console.log(error));
  }, []);

  renderItem = ({ item }) => {
    return (
      <View style={Styles.container}>
        <Text>Latitud: {item.coordenadas.latitud}</Text>
        <Text>Longitud: {item.coordenadas.longitud}</Text>
      </View>
    );
  };

  emptyList = () => {
    return (
      <View style={Styles.container}>
        <Text>No hay usuarios</Text>
      </View>
    );
  };

  const onPressLearnMore = () => {
    console.log(users);
  };

  return (
    <View style={Styles.container}>
      {/* <FlatList
        data={users}
        keyExtractor={({ item }, index) => {
          return index.toString();
        }}
        renderItem={users ? this.renderItem : this.emptyList}
      /> */}
      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={Styles.mapStyle}
        initialRegion={{
          latitude: 41.3995345,
          longitude: 2.1909796,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
      ></MapView>
    </View>
  );
}

export default MapScreen;
