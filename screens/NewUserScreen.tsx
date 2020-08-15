import * as React from "react";
import { StyleSheet } from "react-native";
import * as Themed from "../components/Themed";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import * as Nav from "../navigation/NavActions";
export default function NewUserScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testing</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Themed.Button
        title="Hello"
        contrastBg
        onPress={() => props.navigation.dispatch(Nav.resetToMainPage)}
        lightColor="#000"
        darkColor="rgba(255,255,255,1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
