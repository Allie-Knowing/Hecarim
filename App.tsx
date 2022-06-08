import React, { Platform, UIManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from "components/BottomTabNavigation";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import StackedQuestionList from "screens/StackedQuestionList";
import { Host } from "react-native-portalize";
import useMainStackNavigation, { MainStackParamList } from "hooks/useMainStackNavigation";
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
import IsUploadingProvider, { IsUploadingContext } from "context/IsUploadingContext";
import UploadingStatusProvider, { UploadingStatusContext } from "context/UploadingStatusContext";
import CameraDetail from "components/Question/CameraDetail";
import { useCallback, useEffect, useState } from "react";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import isLoginContext from "context/IsLoginContext";
import theme from "theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchedQuestionsPage from "screens/Search/SearchedQuestionsPage";
import RefreshError from "types/RefreshError";
import { Audio } from "expo-av";
import Interests from "screens/Interests";
import Question from "components/Question";
import ProfileEditPage from "screens/ProfileEdit/ProfileEditPage";
import UploadingModal from "components/Question/UploadingModal";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import * as Notifications from "expo-notifications";
import { postExpoToken } from "utils/api/notification";
import { RecoilRoot } from "recoil";
import ExchangePage from "screens/Exchange";
import Follower from "screens/Follower";

const Root = createStackNavigator<MainStackParamList>();
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

if (__DEV__) {
  import("react-query-native-devtools").then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
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

  const check = async () => {
    const accessToken = await localStorage.getItem<string>(storageKeys.accessToken);

    setIsLogin(accessToken !== null);
  };

  const askPermissions = async () => {
    setTimeout(async () => {
      await requestTrackingPermissionsAsync();
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        postExpoToken(token);
      }
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "알람",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }
    }, 500);
  };

  useEffect(() => {
    check();
    askPermissions();
  }, []);

  const postToken = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    postExpoToken(token);
    localStorage.setItem("isSendedToken", true);
  };

  useEffect(() => {
    if (isLogin) {
      (async () => {
        const [isSendedToken, { status }] = await Promise.all([
          localStorage.getItem("isSendedToken"),
          Notifications.getPermissionsAsync(),
        ]);
        if (status === "granted" && !isSendedToken) postToken();
        else {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status === "granted") postToken();
        }
      })();
    }
  }, [isLogin]);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <isLoginContext.Provider value={isLogin}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <SafeAreaProvider>
              <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
                <ThemeProvider theme={theme}>
                  <IsUploadingProvider>
                    <UploadingStatusProvider>
                      <BottomSheetModalProvider>
                        <AlretProvider>
                          <NavigationContainer>
                            <Host>
                              <CameraProvider>
                                <IsUploadingContext.Consumer>
                                  {(isUploading) =>
                                    isUploading.isUploading ? (
                                      <UploadingStatusContext.Consumer>
                                        {(status) => <UploadingModal status={status.status} />}
                                      </UploadingStatusContext.Consumer>
                                    ) : (
                                      <></>
                                    )
                                  }
                                </IsUploadingContext.Consumer>
                                <MainNavigationScreen />
                              </CameraProvider>
                            </Host>
                          </NavigationContainer>
                        </AlretProvider>
                      </BottomSheetModalProvider>
                    </UploadingStatusProvider>
                  </IsUploadingProvider>
                </ThemeProvider>
              </SafeAreaView>
            </SafeAreaProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </isLoginContext.Provider>
    </GestureHandlerRootView>
  );
}

const MainNavigationScreen = () => {
  const navigation = useMainStackNavigation();

  const onError = useCallback(
    (error: unknown) => {
      if (error instanceof RefreshError) {
        navigation.reset({ routes: [{ name: "Login" }] });
      }
    },
    [navigation]
  );

  queryClient.setDefaultOptions({ queries: { onError, retry: false } });

  return (
    <Root.Navigator
      initialRouteName="Main"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Root.Screen name="Main" component={BottomTabNavigation} options={{ headerShown: false }} />
      <Root.Screen
        name="StackedQuestionList"
        component={StackedQuestionList}
        options={{ headerShown: false }}
      />
      <Root.Screen name="Login" component={Login} options={{ headerShown: false }} />
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
      <Root.Screen name="Setting" component={Setting} options={{ title: "설정" }} />
      <Root.Screen name="UserPage" component={UserPage} options={{ headerShown: false }} />
      <Root.Screen name="Follower" component={Follower} options={{ headerShown: false }} />
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
      <Root.Screen name="Ask" component={Question} options={{ headerShown: false }} />
      <Root.Screen name="InterestsSetting" component={Interests} options={{ headerShown: false }} />
      <Root.Screen
        name="ProfileEdit"
        component={ProfileEditPage}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="Exchange"
        component={ExchangePage}
        options={{
          title: "IQ 현금교환",
          headerBackTitle: " ",
        }}
      />
    </Root.Navigator>
  );
};
