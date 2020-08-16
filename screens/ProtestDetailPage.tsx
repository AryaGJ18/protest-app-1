import * as React from "react";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";
import Constants from "expo-constants";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, SectionList } from "../components/Themed";
import * as firebase from "firebase";
import "@firebase/firestore";
import { initFirebase } from "../firebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import Geocoder from "react-native-geocoding";
import MapView, { Marker } from "react-native-maps";
import { createStackNavigator } from "@react-navigation/stack";
import SelectLocationScreen from "./SelectLocationScreen";
initFirebase();
const bkimg = require("../assets/images/protestSmall.jpg");
const Stack = createStackNavigator();
export default function ProtestDetailPage(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Temp"
        component={Details}
        initialParams={{ ...props.route.params }}
        options={{ title: "Protest Details" }}
      />
    </Stack.Navigator>
  );
}

function Details(props) {
  const data = props.route.params;
  console.log(data);
  const [userName, setUserName] = React.useState(null);
  React.useEffect(() => {
    const creator = props.route.params.creator;
    console.log(creator);
    if (creator != null) {
      const ref = firebase.firestore().collection("users").doc(creator);
      ref.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          console.log("hi");
          ref.onSnapshot((doc) => {
            console.log(doc.data());
            setUserName(doc.data().name);
          });
        } else {
          setUserName(`User ${creator}`);
        }
      });
    }
  }, []);
  return (
    <View>
      <ImageBackground source={bkimg} style={{ width: "100%", height: "100%" }}>
        {/* <View style={styles.container}> */}
        <View style={styles.text}>
          <Text style={styles.title}>{data.protestName}</Text>
          <Text style={styles.body}>
            {data.datetime.toDate().toLocaleString()}
          </Text>
          <Text style={styles.body}>{data.desc}</Text>
          <Text style={styles.body}>{"Organizer: " + userName}</Text>
        </View>
        {/* <Text style={styles.body}>{"\n\nLocation:"}</Text> */}
        <SelectLocationScreen
          lat={data.centerpoint.latitude}
          lng={data.centerpoint.longitude}
          width={Dimensions.get("window").width - 40}
          style={{ alignItems: "center", alignContent: "center" }}
        />
        {/* </View> */}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    backgroundColor: "rgba(54, 73, 78,.8)",
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 15,
    padding: 8,
  },
  item: {
    backgroundColor: "gray",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  body: {
    fontSize: 25,
  },
});
