import React from "react";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import * as S from "./style";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import SearchResults from "components/SearchPage/SearchResults";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

const Search = () => {
  const { top: topPad } = useSafeAreaInsets();
  const outerRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <S.Wrapper style={{ width }} topPad={topPad}>
      <SearchTopNavigation />
      <Stack.Navigator>
        <Stack.Screen
          name="DefaultScreen"
          component={SearchResults}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </S.Wrapper>
  );
};

export default Search;
