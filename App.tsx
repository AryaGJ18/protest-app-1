import { StatusBar } from "expo-status-bar";
import { YellowBox } from "react-native";
import { initFirebase } from "./firebaseConfig";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

YellowBox.ignoreWarnings(["Setting a timer"]);

initFirebase();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    // console.log("HI");
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
