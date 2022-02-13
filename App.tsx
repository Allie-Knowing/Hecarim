import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "components/BottomTabNavigation";
import { StatusBar } from "expo-status-bar";
import React from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "theme/theme";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    "SpoqaHanSansNeo-Bold": require("./src/assets/fonts/SpoqaHanSansNeo-Bold.ttf"),
    "SpoqaHanSansNeo-Medium": require("./src/assets/fonts/SpoqaHanSansNeo-Medium.ttf"),
    "SpoqaHanSansNeo-Regular": require("./src/assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
