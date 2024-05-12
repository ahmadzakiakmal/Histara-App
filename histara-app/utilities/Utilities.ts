import { Dimensions } from "react-native";

export const Utilities = {
  getWindowWidth: () => Dimensions.get('window').width,
  getWindowHeight: () => Dimensions.get('window').height,
  getScreenWidth: () => Dimensions.get('screen').width,
  getScreenHeight: () => Dimensions.get('screen').height,
}