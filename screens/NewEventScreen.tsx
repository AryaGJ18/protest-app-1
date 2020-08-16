import * as React from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  Text,
  TextInput,
  ScrollView,
  Button,
  View,
} from "../components/Themed";
import * as firebase from "firebase";
import "@firebase/firestore";
import DateTimePicker from "../screens/DateTimePicker";
import SelectLocationScreen from "../screens/SelectLocationScreen";
import Geocoder from "react-native-geocoding";
import { MapsKey } from "../firebaseConfig";

const bkimg = require("../assets/images/protestSmall.jpg");
const db = firebase.firestore();

export default function NewEventScreen(props) {
  const [eventName, setName] = React.useState("");
  const [eventDescription, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [time, setTime] = React.useState(null);
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  Geocoder.init(MapsKey);
  function createProtest() {
    const ref = db.collection("protests").doc();

    var data = {
      protestName: eventName,
      desc: eventDescription,
      datetime: time,
      lat: lat,
      lng: lng,
      creator: firebase.auth().currentUser?.uid,
    };
    Object.keys(data).forEach((element) => {
      if (null == data[element] || data[element] == "") {
        alert(`${element} is missing`);
        return;
      }
    });
    data.centerpoint = new firebase.firestore.GeoPoint(lat, lng);
    delete data.lat, data.lng;
    setName("");
    setDescription("");
    setLocation("");
    setTime(null);
    setLat(null);
    setLng(null);
    ref.set(data);
  }
  return (
    <ScrollView scrollToOverflowEnabled="true">
      <ImageBackground source={bkimg} style={{ width: "100%", height: "100%" }}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          placeholder="Enter protest name"
          placeholderTextColor="grey"
          value={eventName}
        />
        <TextInput
          multiline
          numberOfLines={10}
          style={{ ...styles.input, height: "auto" }}
          placeholder="Enter protest description"
          placeholderTextColor="grey"
          onChangeText={(text) => setDescription(text)}
          value={eventDescription}
          textAlignVertical="center"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLocation(text)}
          value={location}
          placeholder="Enter protest location"
          placeholderTextColor="grey"
          onSubmitEditing={() => {
            Geocoder.from(location)
              .then((json) => {
                var latLong = json.results[0].geometry.location;
                setLat(latLong.lat);
                setLng(latLong.lng);
                console.log(latLong);
              })
              .catch((error) => console.warn(error));
          }}
        />

        <SelectLocationScreen
          lat={lat}
          lng={lng}
          width={Dimensions.get("window").width - 40}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "orange",
            textAlign: "center",
          }}
        >
          {!(time == null) ? `${time.toLocaleString()}` : ""}
        </Text>
        <TouchableOpacity
          style={{ ...styles.button, marginBottom: 25, paddingVertical: 0 }}
        >
          <DateTimePicker setter={setTime} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => createProtest()}>
          <Text style={styles.btn}>Create Protest</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: "transparent", height: 50 }}></View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  container2: {
    flex: 1,
  },
  input: {
    borderColor: "gray",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 60,
    color: "white",
    opacity: 0.8,
  },
  btn: {
    fontSize: 20,
    fontWeight: "bold",

    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#f07430",
    color: "white",
    padding: 10,
    width: "70%",
    borderRadius: 10,
    alignContent: "center",
  },
  picker: {
    alignSelf: "center",
    padding: 5,
    width: "70%",
    marginBottom: 50,
  },
});
