import * as React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import EditScreenInfo from "../components/EditScreenInfo";
import {
  Text,
  View,
  SectionList,
  TextInput,
  Button,
} from "../components/Themed";
import * as firebase from "firebase";
import "@firebase/firestore";
import { initFirebase } from "../firebaseConfig";

import Geocoder from "react-native-geocoding";
import { TouchableOpacity } from "react-native-gesture-handler";
initFirebase();
const db = firebase.firestore();

async function getProtestInfo() {}

async function getDocNearby(
  lat: number,
  lng: number,
  rad: number,
  dbRef: firebase.database.reference,
  setData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      datetime: Date;
      creator: string;
      location: firebase.firestore.GeoPoint;
      desc: string;
      id: string;
    }>
  >
) {
  const mi_lat = 0.0144927536231884;
  const mi_lon = 0.0181818181818182;
  let lowerLat = lat - mi_lat * rad;
  lowerLat = lowerLat < -90 ? -90 : lowerLat;
  let lowerLon = lng - mi_lon * rad;
  lowerLon = lowerLon < -90 ? -90 : lowerLon;
  let greaterLat = lat + mi_lat * rad;
  greaterLat = greaterLat > 90 ? 90 : greaterLat;
  let greaterLon = lng + mi_lon * rad;
  greaterLon = greaterLon > 90 ? 90 : greaterLon;
  const lower = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
  const upper = new firebase.firestore.GeoPoint(greaterLat, greaterLon);
  const query = dbRef
    .where("centerpoint", ">", lower)
    .where("centerpoint", "<", upper)
    .get()
    .then(function (querySnapshot) {
      const total = [];
      querySnapshot.forEach(async function (doc) {
        console.log(doc.id);
        total.push({ ...doc.data(), id: doc.id });
      });
      setData(total);
    });
}

export default function LocalProtests(props) {
  const [location, setLocation] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dist, setDist] = React.useState(20);
  const protestRef = db.collection("protests");
  const getLocationProtests = async () => {
    setRefreshing(true);
    await getLocation().then((location) =>
      getDocNearby(
        location["coords"]["latitude"],
        location["coords"]["longitude"],
        dist * 1.6,
        protestRef,
        setData
      )
    );

    setRefreshing(false);
  };

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Location not found! Make sure its on");
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    if (location) {
      setLocation(location);
    } else {
      await alert("Some error in getting location, using old location");
    }
    return location;
  };

  React.useEffect(() => {
    getLocationProtests();
  }, []);

  let text = "Waiting..";
  if (location) {
    text =
      location["coords"]["longitude"] + " " + location["coords"]["latitude"];
  }

  const [data, setData] = React.useState([
    {
      protestName: "Drag to Refresh",
      datetime: new firebase.firestore.Timestamp(2020, 1, 1),
      creator: "sdfs",
      centerpoint: new firebase.firestore.GeoPoint(0, 0),
      desc: "",
      id: "",
    },
  ]);

  const Item = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("ProtestDetail", { ...title });
      }}
      activeOpacity={0.6}
      onLongPress={() => {
        if (title.creator == firebase.auth().currentUser?.uid) {
          Alert.alert("Delete Protest?", "Action is irreversible!", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yup!",
              onPress: () =>
                db
                  .collection("protests")
                  .doc(title.id)
                  .delete()
                  .then(() => getLocationProtests()),
            },
          ]);
        }
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title.protestName}</Text>

        <Text style={styles.title}>
          {title.datetime.toDate().toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setDist(text)}
        placeholder="Enter protest name"
        placeholderTextColor="grey"
        keyboardType="number-pad"
        value={dist.toString()}
        placeholder="Search Radius (mi)"
        onSubmitEditing={() => {
          getLocationProtests();
        }}
        placeholderTextColor="grey"
      />
      <SectionList
        data={data}
        refreshing={refreshing}
        onRefresh={() => getLocationProtests()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <Item title={item} />;
        }}
        style={{ minHeight: 600 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: "#f07430",
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 60,
    color: "white",
  },
});
