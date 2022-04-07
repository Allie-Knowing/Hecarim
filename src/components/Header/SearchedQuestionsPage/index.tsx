import { StackNavigationProp } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const setting = require("assets/icons/MyPage/setting.png");

type Props = {
  stackNavigation: StackNavigationProp<
    MainStackParamList,
    "SearchedQuestionsPage"
  >;
};

const backIcon = require("../../../assets/icons/login/backIcon.png");

const SearchedQuestionsPageHeader: FC<Props> = ({ stackNavigation }) => {
  const { top: topPad } = useSafeAreaInsets();

  const goBack = () => {
    stackNavigation.pop();
  };

  return (
    <S.Container topPad={topPad}>
      <TouchableOpacity onPress={goBack}>
        <S.BackIcon topPad={topPad} source={backIcon} />
      </TouchableOpacity>
      <S.Title topPad={topPad}>검색된 질문</S.Title>
    </S.Container>
  );
};

export default SearchedQuestionsPageHeader;
