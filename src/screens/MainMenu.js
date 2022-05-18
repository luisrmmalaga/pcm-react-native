import React from "react";
import { Text, View, Image, Button } from "react-native";
import Styles from "../config/styles.js";

function MainMenu({ navigation }) {
  const goToMap = () => {
    navigation.navigate("MapScreen");
  };

  const onPressLearnMore = () => {
    console.log("metricas status: wip");
  };

  return (
    <View style={Styles.container}>
      <Text>Hello Luis!</Text>
      <Image style={Styles.logo} source={require("../assets/pcm-icon.png")} />
      <Button onPress={goToMap} title="MAPA" color="dodgerblue" />
      <Button onPress={onPressLearnMore} title="MÉTRICAS" color="dodgerblue" />
    </View>
  );
}

export default MainMenu;
