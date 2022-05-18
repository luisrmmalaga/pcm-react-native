import React from "react";
import { Text, View, Image, Button } from "react-native";
import Styles from "../config/styles.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../redux/actions";

function MainMenu({ navigation }) {
  const { users } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

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
