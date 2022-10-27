import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import Styles from "@config/styles";
import Map from "../components/Map";
import * as Location from "expo-location";

function MapScreen() {
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

  return (
    <View style={Styles.container}>
      <Map currentLocation={location} />
    </View>
  );
}

export default MapScreen;
