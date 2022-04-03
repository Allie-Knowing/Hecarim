import { Dimensions } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;
export const MAX_DURATION = 60;
