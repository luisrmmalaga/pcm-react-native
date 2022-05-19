import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import Style from "../config/styles";
import { getAllUsers } from "@services/usuarios_api_calls";

function MapScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  renderItem = (item) => {
    <View style={Style.container}>
      <Text>Latitud: {item.coordenadas.latitud}</Text>
      <Text>Longitud: {item.coordenadas.longitud}</Text>
    </View>;
  };

  return <FlatList data={users} renderItem={this.renderItem} />;
}

export default MapScreen;
