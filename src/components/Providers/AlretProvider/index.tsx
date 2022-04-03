import { Alret, alretContext } from "context/AlretContext";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import AlretComponent, { AlretRef } from "../../Alert";
import { Dimensions } from "react-native";
import { runOnJS } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

const AlretProvider: FC = ({ children }) => {
  const [alrets, setAlrets] = useState<Alret[]>([]);
  const currentAlretRef = useRef<AlretRef>();

  const showAlret = useCallback(
    (alret: Alret) => {
      const callback = () => {
        setAlrets([...alrets, alret]);
      };

      if (currentAlretRef.current) {
        currentAlretRef.current.closeAnimation(callback);
      } else {
        callback();
      }
    },
    [alrets]
  );

  const closeCurrentAlret = useCallback(() => {
    const callback = () => {
      const copyAlrets = [...alrets];

      copyAlrets.pop();

      setAlrets(copyAlrets);
    };

    currentAlretRef.current.closeAnimation(callback);
  }, [alrets]);

  return (
    <alretContext.Provider
      value={{
        showAlret: runOnJS(showAlret),
        closeCurrentAlret: runOnJS(closeCurrentAlret),
      }}
    >
      {children}
      <S.Container
        style={{ height, width }}
        pointerEvents={alrets.length > 0 ? "auto" : "none"}
      >
        {alrets.length !== 0 && (
          <AlretComponent ref={currentAlretRef} {...alrets.reverse()[0]} />
        )}
      </S.Container>
    </alretContext.Provider>
  );
};

export default AlretProvider;
