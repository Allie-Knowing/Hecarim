import { createContext } from "react";

export interface AlretContext {
  showAlret: (alret: Alret) => void;
  closeAlret: (id: string) => void;
}

export type ButtonColor = "black" | "red" | "primary";

export interface Button {
  color: ButtonColor;
  text: string;
  onPress: (id: string) => void;
}

export interface Alret {
  title: string;
  content: string;
  buttons: Button[];
}

export interface AlretWithId extends Alret {
  id: string;
}

export const alretContext = createContext<AlretContext>({
  showAlret: () => {},
  closeAlret: () => {},
});
