import React, { Platform, UIManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "components/BottomTabNavigation";
import { ThemeProvider } from "styled-components/native";
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
import useMainStackNavigation, {
  MainStackParamList,
} from "hooks/useMainStackNavigation";
import Login from "screens/Login";
import TermsOfService from "screens/Login/TermsModal/TermsOfService";
import PrivacyPolicy from "screens/Login/TermsModal/PrivacyPolicy";
import AlretProvider from "components/Providers/AlretProvider";
import Setting from "screens/Setting";
import UserPage from "screens/MyPage/UserPage";
import { QueryClient, QueryClientProvider } from "react-query";

import CameraComponent from "components/Question/Camera";
import isStackContext from "./src/context/IsStackContext";
import CameraProvider from "context/CameraContext";
import CameraDetail from "components/Question/CameraDetail";
import { useCallback, useEffect, useState } from "react";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import isLoginContext from "context/IsLoginContext";
import theme from "theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchedQuestionsPage from "screens/Search/SearchedQuestionsPage";
import RefreshError from "types/RefreshError";
import useAlert from "hooks/useAlert";
import { Audio } from "expo-av";

const Root = createStackNavigator<MainStackParamList>();
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

if (__DEV__) {
  import("react-query-native-devtools").then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "SpoqaHanSansNeo-Bold": require("./src/assets/fonts/SpoqaHanSansNeo-Bold.ttf"),
    "SpoqaHanSansNeo-Medium": require("./src/assets/fonts/SpoqaHanSansNeo-Medium.ttf"),
    "SpoqaHanSansNeo-Regular": require("./src/assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
  });

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const check = useCallback(async () => {
    const accessToken = await localStorage.getItem<string>(
      storageKeys.accessToken
    );

    setIsLogin(accessToken !== null);
  }, []);

  useEffect(() => {
    check();
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <isLoginContext.Provider value={isLogin}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
              <ThemeProvider theme={theme}>
                <BottomSheetModalProvider>
                  <AlretProvider>
                    <NavigationContainer>
                      <Host>
                        <CameraProvider>
                          <MainNavigationScreen />
                        </CameraProvider>
                      </Host>
                    </NavigationContainer>
                  </AlretProvider>
                </BottomSheetModalProvider>
              </ThemeProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </isLoginContext.Provider>
    </GestureHandlerRootView>
  );
}

const MainNavigationScreen = () => {
  const navigation = useMainStackNavigation();
  const { closeAlert, showAlert } = useAlert();

  const onError = useCallback(
    (error: unknown) => {
      if (error instanceof RefreshError) {
        navigation.reset({ routes: [{ name: "Login" }] });

        showAlert({
          title: "로그인이 만료되었습니다.",
          content: "다시 로그인 해주세요.",
          buttons: [
            { color: "black", text: "확인", onPress: (id) => closeAlert(id) },
          ],
        });
      }
    },
    [navigation, closeAlert, showAlert]
  );

  queryClient.setDefaultOptions({ queries: { onError, retry: false } });

  return (
    <Root.Navigator
      initialRouteName="Main"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
        name="TermsOfService"
        component={TermsOfService}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
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
      <Root.Screen
        name="SearchedQuestionsPage"
        component={SearchedQuestionsPage}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="Camera"
        component={(props) => (
          <isStackContext.Provider value={true}>
            <CameraComponent {...props} />
          </isStackContext.Provider>
        )}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="CameraDetail"
        component={(props) => (
          <isStackContext.Provider value={true}>
            <CameraDetail {...props} />
          </isStackContext.Provider>
        )}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
};
