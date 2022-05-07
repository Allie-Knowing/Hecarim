import { FC, useState, createContext } from "react";

interface UploadingStatusContext {
  status: number;
  setStatus: (value: number) => void;
}

export const UploadingStatusContext = createContext<UploadingStatusContext>({
  status: 0,
  setStatus: () => {},
});

const UploadingStatusProvider: FC = ({ children }): JSX.Element => {
  const [status, setStatus] = useState<number>(0);

  return (
    <UploadingStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </UploadingStatusContext.Provider>
  );
};

export default UploadingStatusProvider;
