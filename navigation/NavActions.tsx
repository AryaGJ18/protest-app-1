import { CommonActions } from "@react-navigation/native";
import * as firebase from "firebase";
import "@firebase/auth";

export function signInAction(navigation) {
  // navigation.dispatch(resetToMainPage);
  // TODO: Implement sign out action for user
}

export const resetToMainPage = CommonActions.reset({
  index: 1,
  routes: [{ name: "Root" }],
});

export function signOutAction(navigation) {
  var curr = firebase.auth().currentUser;
  if (curr.isAnonymous) {
    curr.delete();
  } else {
    firebase.auth().signOut();
  }
  // signOut();
  // navigation.dispatch(resetToSignIn);
}

export const resetToSignIn = CommonActions.reset({
  index: 1,
  routes: [{ name: "NewUser" }],
});
