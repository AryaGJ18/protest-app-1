import { CommonActions } from "@react-navigation/native";

export function signInAction(navigation) {
  navigation.dispatch(resetToMainPage);
  // TODO: Implement sign out action for user
}

export const resetToMainPage = CommonActions.reset({
  index: 1,
  routes: [{ name: "Root" }],
});

export function signOutAction(navigation) {
  navigation.dispatch(resetToSignIn);
  // TODO: Implement sign in action for user
}

export const resetToSignIn = CommonActions.reset({
  index: 1,
  routes: [{ name: "NewUser" }],
});
