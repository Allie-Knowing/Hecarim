import React, { Fragment } from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import * as S from "./style";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import DefaultSearchPage from "components/SearchPage/SearchResults/DefaultSearchPage";
import SearchedQuestionsPage from "components/SearchPage/SearchResults/SearchedQuestionsPage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

const Search = () => {
  const { top: topPad } = useSafeAreaInsets();
  const outerRef = useAnimatedRef<Animated.ScrollView>();
  const theme = useTheme();

  return (
    // <S.Wrapper style={{ width }} topPad={topPad}>
    <Fragment>
      <Stack.Navigator>
        <Stack.Screen
          name="검색"
          component={DefaultSearchPage}
          options={{
            headerTitleStyle: {
              fontFamily: "SpoqaHanSansNeo-Medium",
              color: theme.colors.grayscale.scale100,
              fontSize: 16,
            },
            headerTitleContainerStyle: {
              flex: 100,
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="검색된 질문"
          component={SearchedQuestionsPage}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Fragment>
    // </S.Wrapper>
  );
};

export default Search;
