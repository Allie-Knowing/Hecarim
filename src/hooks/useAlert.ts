import { alretContext } from "context/AlertContext";
import { useContext } from "react";

const useAlret = () => useContext(alretContext);

export default useAlret;
