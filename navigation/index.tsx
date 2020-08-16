import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import ProtestDetailPage from "../screens/ProtestDetailPage";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import NewUserScreen from "../screens/NewUserScreen";
import NewEventScreen from "../screens/NewEventScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import * as firebase from "firebase";
import "@firebase/auth";
import { initFirebase } from "../firebaseConfig";
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();
function RootNavigator() {
  const normal = (
    <>
      <Stack.Screen name="NewUser" component={NewUserScreen} />
      <Stack.Screen name="NewEvent" component={NewEventScreen} />
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      /> */}
    </>
  );

  const loggedIn = (
    <>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="ProtestDetail" component={ProtestDetailPage} />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </>
  );
  const [signedIn, setSignedIn] = React.useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {signedIn ? loggedIn : normal}
    </Stack.Navigator>
  );
}
