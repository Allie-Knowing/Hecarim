import React, { FC } from "react";
import { Dimensions, Image } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";
import * as S from "./style";

const { height } = Dimensions.get("screen");

const SearchedQuestionsPage: FC = () => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Wrapper>
      {/* <S.BackBtn
        topPad={topPad}
        source={require("../../../../assets/icons/Search/Back_btn.png")}
        style={{ resizeMode: "stretch" }}
      /> */}
      <SearchTopNavigation />
      <S.View height={height}></S.View>
    </S.Wrapper>
  );
};

export default SearchedQuestionsPage;
