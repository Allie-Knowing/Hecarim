import { createContext } from "react";

export interface AlretContext {
  showAlret: (alret: Alret) => void;
}

export interface Button {
  color: "black" | "red" | "primary";
  text: string;
  onClick: () => void;
  type: "default" | "close";
}

export interface Alret {
  title: string;
  content: string;
  buttons: Button[];
}

export const alretContext = createContext<AlretContext>({
  showAlret: () => {},
});
