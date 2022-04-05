import React from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "components/BottomTabNavigation";
import { ThemeProvider } from "styled-components/native";
import { Provider } from "react-redux";
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
import { MainStackParamList } from "hooks/useMainStackNavigation";
import Login from "screens/Login";
import store from "modules/redux/store";
import AlretProvider from "components/Providers/AlretProvider";
import theme from "theme/theme";
import Setting from "screens/Setting";
import UserPage from "screens/MyPage/UserPage";
import { QueryClient, QueryClientProvider } from "react-query";

const Root = createStackNavigator<MainStackParamList>();
const queryClient = new QueryClient();

if (__DEV__) {
  import("react-query-native-devtools").then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "SpoqaHanSansNeo-Bold": require("./src/assets/fonts/SpoqaHanSansNeo-Bold.ttf"),
    "SpoqaHanSansNeo-Medium": require("./src/assets/fonts/SpoqaHanSansNeo-Medium.ttf"),
    "SpoqaHanSansNeo-Regular": require("./src/assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <BottomSheetModalProvider>
                <AlretProvider>
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
                        <Root.Screen
                          name="Login"
                          component={Login}
                          options={{ headerShown: false }}
                        />
                        <Root.Screen
                          name="Setting"
                          component={Setting}
                          options={{ title: "설정" }}
                        />
                        <Root.Screen
                          name="UserPage"
                          component={UserPage}
                          options={{ headerShown: false }}
                        />
                      </Root.Navigator>
                    </Host>
                  </NavigationContainer>
                </AlretProvider>
              </BottomSheetModalProvider>
            </Provider>
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
