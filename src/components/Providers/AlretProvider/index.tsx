import { Alret, alretContext, AlretWithId } from "context/AlretContext";
import { FC, useCallback, useRef, useState } from "react";
import * as S from "./styles";
import AlretComponent, { AlretRef } from "../../Alert";
import { Dimensions } from "react-native";
import { runOnJS } from "react-native-reanimated";
import uniqueId from "constant/uniqueId";

const { height, width } = Dimensions.get("screen");

const AlretProvider: FC = ({ children }) => {
  const [alrets, setAlrets] = useState<AlretWithId[]>([]);
  const currentAlretRef = useRef<AlretRef>();

  const showAlret = useCallback(
    (alret: Alret) => {
      const callback = () => {
        setAlrets([...alrets, { ...alret, id: uniqueId() }]);
      };

      if (currentAlretRef.current) {
        currentAlretRef.current.closeAnimation(callback);
      } else {
        callback();
      }
    },
    [alrets]
  );

  const closeAlret = useCallback(
    (id: string) => {
      const callback = () => {
        const copyAlrets = [...alrets];

        copyAlrets.pop();

        setAlrets(alrets.filter((value) => value.id !== id));
      };

      currentAlretRef.current.closeAnimation(callback);
    },
    [alrets]
  );

  return (
    <alretContext.Provider
      value={{
        showAlret: runOnJS(showAlret),
        closeAlret: runOnJS(closeAlret),
      }}
    >
      {children}
      <S.Container
        style={{ height, width }}
        pointerEvents={alrets.length > 0 ? "auto" : "none"}
      >
        {alrets.length !== 0 && (
          <AlretComponent
            ref={currentAlretRef}
            key={alrets.reverse()[0].id}
            {...alrets.reverse()[0]}
          />
        )}
      </S.Container>
    </alretContext.Provider>
  );
};

export default AlretProvider;
