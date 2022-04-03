import { Alret, alretContext } from "context/AlretContext";
import { FC, useCallback, useState } from "react";

const AlretProvider: FC = ({ children }) => {
  const [alrets, setAlrets] = useState<Alret[]>([]);

  const showAlret = useCallback(
    (alret: Alret) => {
      setAlrets([...alrets, alret]);
    },
    [alrets]
  );

  return (
    <alretContext.Provider value={{ showAlret }}>
      {children}
    </alretContext.Provider>
  );
};

export default AlretProvider;
