import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "components/BottomTabNavigation";
import React from "react-native";
import { ThemeProvider } from "styled-components/native";
import theme from "theme/theme";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import StackedQuestionList from "screens/StackedQuestionList";
import { Host } from "react-native-portalize";

export type QuestionStackParamList = {
  Main: undefined;
  StackedQuestionList: undefined;
};

const Root = createStackNavigator<QuestionStackParamList>();

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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
        <ThemeProvider theme={theme}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Host>
                <Root.Navigator
                  initialRouteName="Main"
                  screenOptions={{
                    cardStyleInterpolator:
                      CardStyleInterpolators.forHorizontalIOS,
                  }}
                >
                  <Root.Screen
                    name="Main"
                    component={BottomTabNavigation}
                    options={{ headerShown: false }}
                  />
                  <Root.Screen
                    name="StackedQuestionList"
                    component={StackedQuestionList}
                    options={{ headerShown: false }}
                  />
                </Root.Navigator>
              </Host>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
