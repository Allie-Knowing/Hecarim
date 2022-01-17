import { useState } from "react";

type Dispatch = [
  inputProps: { onFocus: () => void; onBlur: () => void },
  isFocus: boolean,
  setFocus: React.Dispatch<React.SetStateAction<boolean>>
];

const useFocus = (): Dispatch => {
  const [isFocus, setFocus] = useState<boolean>(false);

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return [{ onFocus, onBlur }, isFocus, setFocus];
};

export default useFocus;
