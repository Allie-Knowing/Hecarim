import React, { Fragment } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useTheme } from "styled-components";
import DefaultSearchPage from "components/SearchPage/SearchResults/DefaultSearchPage";
import SearchedQuestionsPage from "components/SearchPage/SearchResults/SearchedQuestionsPage";
import BackBtn from "components/SearchPage/SearchResults/SearchedQuestionsPage/BackBtn";

export type RootStackParamList = {
  DefaultSearchPage: undefined;
  SearchedQuestions: undefined;
};

const Root = createStackNavigator<RootStackParamList>();

const Search = () => {
  const outerRef = useAnimatedRef<Animated.ScrollView>();
  const theme = useTheme();

  return (
    <Fragment>
      <Root.Navigator
        initialRouteName="DefaultSearchPage"
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Root.Screen
          name="DefaultSearchPage"
          component={DefaultSearchPage}
          options={{
            headerTitle: "검색",
            headerTitleStyle: {
              fontFamily: "SpoqaHanSansNeo-Medium",
              color: theme.colors.grayscale.scale100,
              fontSize: 16,
            },
            headerTitleAlign: "center",
            headerTitleContainerStyle: {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
        <Root.Screen
          name="SearchedQuestions"
          component={SearchedQuestionsPage}
          options={{
            headerTitle: "검색된 질문",
            headerTitleStyle: {
              fontFamily: "SpoqaHanSansNeo-Medium",
              color: theme.colors.grayscale.scale100,
              fontSize: 16,
            },
            headerTitleContainerStyle: {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 25,
            },
            headerTitleAlign: "center",
            headerLeftContainerStyle: {
              paddingLeft: 25,
            },
            headerLeft: () => <BackBtn />,
          }}
        />
      </Root.Navigator>
    </Fragment>
  );
};

export default Search;
