import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import Styles from "@config/styles";
import { getAllUsers } from "@services/usuarios_api_calls";

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
      <FlatList
        data={users}
        keyExtractor={({ item }, index) => {
          return index.toString();
        }}
        renderItem={users ? this.renderItem : this.emptyList}
      />
    </View>
  );
}

export default MapScreen;
