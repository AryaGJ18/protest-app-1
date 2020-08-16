import * as React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import * as Themed from "../components/Themed";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import * as Nav from "../navigation/NavActions";
import LoginScreen from "./LoginScreenComponents/LoginScreen";

export default function NewUserScreen(props) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View style={styles.login}>
          <LoginScreen navigation={props.navigation} />
        </View>
      </View>
    </KeyboardAvoidingView>
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
    width: "90%",
  },
  login: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
