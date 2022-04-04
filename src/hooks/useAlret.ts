import { alretContext } from "context/AlretContext";
import { useContext } from "react";

const useAlret = () => useContext(alretContext);

export default useAlret;
