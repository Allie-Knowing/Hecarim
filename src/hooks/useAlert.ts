import { alertContext } from "context/AlertContext";
import { useContext } from "react";

const useAlret = () => useContext(alertContext);

export default useAlret;
