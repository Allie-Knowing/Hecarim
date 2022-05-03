import { createContext, useState, FC } from "react";
export interface uploadingContext {
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
}

export const IsUploadingContext = createContext<uploadingContext>({
  isUploading: false,
  setIsUploading: () => {},
});

const IsUploadingProvider: FC = ({ children }) => {
  const [isUploading, setIsUploading] = useState<boolean>();

  return (
    <IsUploadingContext.Provider value={{ isUploading, setIsUploading }}>
      {children}
    </IsUploadingContext.Provider>
  );
};

export default IsUploadingProvider;
