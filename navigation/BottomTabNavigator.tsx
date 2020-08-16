import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from "react-native";
import * as React from "react";
import * as Themed from "../components/Themed";
import * as Nav from "./NavActions";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import LocalProtests from "../screens/LocalProtests";
import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";
import NewEventScreen from "../screens/NewEventScreen";
import * as firebase from "firebase";
import "firebase/auth";
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Protests"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="list" size={24} color={color} />
          ),
        }}
      />
      {firebase.auth().currentUser != null &&
      !firebase.auth().currentUser.isAnonymous ? (
        <BottomTab.Screen
          name="New Protest"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="plus" size={24} color={color} />
            ),
          }}
        />
      ) : (
        <></>
      )}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator(props) {
  const signoutPrompt = () => {
    const title = "Confirm sign out?";
    const message = "You will lose all your data!";
    const buttons = [
      { text: "Cancel", type: "cancel" },
      {
        text: "Continue!",
        onPress: () => Nav.signOutAction(props.navigation),
      },
    ];
    Alert.alert(title, message, buttons);
  };
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Protests"
        component={LocalProtests}
        options={{
          headerTitle: "Local Protests",
          headerRight: () => (
            <Themed.Button
              title="Sign Out"
              contrastBg={false}
              onPress={() => signoutPrompt()}
            />
          ),
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="New Protest"
        component={NewEventScreen}
        options={{ headerTitle: "New Protest" }}
      />
    </TabTwoStack.Navigator>
  );
}
