import React, { Component } from "react";
import * as firebase from "firebase";
import "@firebase/auth";
import "firebase/database";
import { Text, View, Button, TextInput } from "../../components/Themed";
import { StyleSheet, Dimensions, Image, ToastAndroid } from "react-native";
import * as Themed from "../../components/Themed";
import * as Nav from "../../navigation/NavActions";
const widthConst = Dimensions.get("screen").width;
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: "Organization Signin/up",
      showInput: false,
      email: "",
      password: "",
    };
  }

  signIn = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => Nav.signInAction(this.props.navigation))
      .catch((error) => {
        this.setState({ errorMessage: error.message }, () => {
          alert(this.state.errorMessage);
        });
      });
  };

  signInWithCred = () => {
    if (!this.state.showInput) {
      this.setState({
        showInput: true,
        buttonText: "Sign In",
      });
    } else {
      console.log(this.state.email, this.state.password);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.setState({
            // showInput: false,
            // buttonText: "Sign in with credentials",
          });
          Nav.signInAction(this.props.navigation);
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message }, () => {
            alert(this.state.errorMessage);
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.fullHeight}>
        <View style={styles.btnWrapper}>
          <Text style={styles.title}>ProtestApp</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <Button
            title="Anonymously Sign In"
            color="#f07430"
            style={styles.btn}
            onPress={() => this.signIn()}
          />
        </View>
        {this.state.showInput && (
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              onChangeText={async (password) => {
                // console.log(password);
                this.setState({ password });
                // console.log(this.state);
              }}
              value={this.state.password}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
        )}
        <View style={styles.btnWrapper}>
          <Button
            title={this.state.buttonText}
            color="#f07430"
            style={styles.btn}
            onPress={() => this.signInWithCred()}
          />
        </View>
        {/* <Themed.Button
          title="Hello"
          contrastBg
          onPress={() => this.props.navigation.navigate("NewEvent")}
          lightColor="#000"
          darkColor="rgba(255,255,255,1)"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullHeight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 100,
    height: 100,
  },
  rn: {
    marginVertical: 5,
    fontSize: 18,
  },

  btnWrapper: {
    width: widthConst - 100,
    marginVertical: 10,
  },
  signin: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  enappdWrapper: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  enappdIcon: {
    width: 100,
    height: 40,
  },

  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 60,

    width: widthConst - 100,
  },
  inputWrapper: {
    marginVertical: 10,
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  btn: {
    borderRadius: 100,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
    padding: 5,
    backgroundColor: "#f07430",
    paddingHorizontal: 25,
    paddingVertical: 20,
    fontSize: 30,
  },
});
