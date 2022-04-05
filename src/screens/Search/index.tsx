import React, { FC, Fragment } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { useSearch } from "utils/hooks/search";
import { RootStackParamList } from "hooks/useSearchStackNavigation";
import useThemeContext from "hooks/useThemeContext";
import DefaultSearchPage from "components/SearchPage/SearchResults/DefaultSearchPage";
import SearchedQuestionsPage from "components/SearchPage/SearchResults/SearchedQuestionsPage";
import BackBtn from "components/SearchPage/SearchResults/SearchedQuestionsPage/BackBtn";

const Root = createStackNavigator<RootStackParamList>();

const Search: FC = () => {
  const { state, setState } = useSearch();
  const themeContext = useThemeContext();

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
          options={{
            headerTitle: "검색",
            headerTitleStyle: {
              fontFamily: "SpoqaHanSansNeo-Medium",
              color: themeContext.colors.grayscale.scale100,
              fontSize: 16,
            },
            headerTitleAlign: "center",
            headerTitleContainerStyle: {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          {(props) => <DefaultSearchPage {...props} {...state} {...setState} />}
        </Root.Screen>
        <Root.Screen
          name="SearchedQuestions"
          options={{
            headerTitle: "검색된 질문",
            headerTitleStyle: {
              fontFamily: "SpoqaHanSansNeo-Medium",
              color: themeContext.colors.grayscale.scale100,
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
        >
          {(props) => (
            <SearchedQuestionsPage {...props} {...state} {...setState} />
          )}
        </Root.Screen>
      </Root.Navigator>
    </Fragment>
  );
};

export default Search;
