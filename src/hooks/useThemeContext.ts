import { useContext } from "react";
import { ThemeContext } from "styled-components/native";

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;
