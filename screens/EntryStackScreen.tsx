import { RootStackScreen } from "./RootStack/RootStackScreen";
import React from "react";
import {Text} from "react-native";
import NewSocialScreen from "./RootStack/NewSocialScreen/NewSocialScreen.main";


export function EntryStackScreen() {
  // In Part B, we will add logic here that "observes", or
  // keeps track, of the Authentication State. If a user is signed in,
  // this screen will return the RootStack. Otherwise, this screen will
  // return the MainStack. For now, we just return the RootStack, since we
  // aren't adding sign-in functionality for this part of the project.
  return RootStackScreen();
}
