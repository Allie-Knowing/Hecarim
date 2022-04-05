import { createContext } from "react";

export interface AlertContext {
  showAlert: (alret: Alert) => void;
  closeAlret: (id: string) => void;
  currentAlretId: string | null;
}

export type ButtonColor = "black" | "red" | "primary";

export interface Button {
  color: ButtonColor;
  text: string;
  onPress: (id: string) => void;
}

export interface Alert {
  title: string;
  content: string;
  buttons: Button[];
}

export interface AlertWithId extends Alert {
  id: string;
}

export const alretContext = createContext<AlertContext>({
  showAlert: () => {},
  closeAlret: () => {},
  currentAlretId: null,
});
