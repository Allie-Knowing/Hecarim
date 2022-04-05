import isLoginContext from "context/IsLoginContext";
import { useContext } from "react";

const useIsLogin = () => useContext(isLoginContext);

export default useIsLogin;
