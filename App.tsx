import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "components/BottomTabNavigation";
import { StatusBar } from "expo-status-bar";
import React from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "theme/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
