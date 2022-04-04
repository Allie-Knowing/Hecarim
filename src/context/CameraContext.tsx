import { createContext, FC } from "react";
import { useState } from "react";
export interface CameraContext {
  uri: string;
  setUri: (uri: string) => void;
}

export const cameraContext = createContext<CameraContext>({
  uri: "",
  setUri: () => {},
});
const { Provider } = cameraContext;

const CameraProvider: FC = ({ children }) => {
  const [uri, setUri] = useState<string>("");

  return <Provider value={{ uri, setUri }}>{children}</Provider>;
};

export default CameraProvider;
