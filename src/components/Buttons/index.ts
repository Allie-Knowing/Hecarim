import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
  children?: string;
  onPress?: (event: GestureResponderEvent) => void;
}
