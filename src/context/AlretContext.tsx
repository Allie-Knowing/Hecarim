import { createContext } from "react";

export interface AlretContext {
  showAlret: (alret: Alret) => void;
  closeCurrentAlret: () => void;
}

export type ButtonColor = "black" | "red" | "primary";

export interface Button {
  color: ButtonColor;
  text: string;
  onPress: () => void;
}

export interface Alret {
  title: string;
  content: string;
  buttons: Button[];
}

export const alretContext = createContext<AlretContext>({
  showAlret: () => {},
  closeCurrentAlret: () => {},
});
