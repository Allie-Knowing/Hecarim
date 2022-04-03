import { Alret, alretContext } from "context/AlretContext";
import { FC, useCallback, useRef, useState } from "react";
import * as S from "./styles";
import AlretComponent, { AlretRef } from "../../Alert";
import { Dimensions } from "react-native";

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

      return;
    },
    [alrets]
  );

  const closeCurrentAlret = useCallback(() => {
    const copyAlrets = [...alrets];

    copyAlrets.pop();

    setAlrets(copyAlrets);
  }, [alrets]);

  return (
    <alretContext.Provider value={{ showAlret, closeCurrentAlret }}>
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
