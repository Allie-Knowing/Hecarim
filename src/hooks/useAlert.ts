import { alertContext } from "context/AlertContext";
import { useContext } from "react";

const useAlert = () => useContext(alertContext);

export default useAlert;
