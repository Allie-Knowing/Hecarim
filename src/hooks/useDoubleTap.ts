import { useRef } from "react";

const useDoubleTap = (delay: number, onPress: () => void, doublePress: () => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onPressHandler = () => {
    if (!timeoutRef.current) {
      //처음 클릭
      timeoutRef.current = setTimeout(() => {
        onPress();
        timeoutRef.current = null;
      }, delay);
    } else {
      //두번째 클릭
      clearTimeout(timeoutRef.current);
      doublePress();
      timeoutRef.current = null;
    }
  };

  return onPressHandler;
};

export default useDoubleTap;
