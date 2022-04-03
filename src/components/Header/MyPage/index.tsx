import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

const setting = require("assets/icons/MyPage/setting.png");

type Props = {
  stackNavigation: StackNavigationProp<MainStackParamList, "UserPage">;
};

const MyPageHeader: FC<Props> = ({ stackNavigation }) => {
  const { top: topPad } = useSafeAreaInsets();

  return (
    <S.Container topPad={topPad}>
      <S.Box />
      <S.Title topPad={topPad}>마이페이지</S.Title>
      <TouchableOpacity
        onPress={() => {
          stackNavigation.push("Setting");
        }}
      >
        <S.Setting source={setting} topPad={topPad} />
      </TouchableOpacity>
    </S.Container>
  );
};

export default MyPageHeader;
