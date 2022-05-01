import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";

type Props = {
  stackNavigation: StackNavigationProp<MainStackParamList, "PrivacyPolicy">;
  submitProfileSetting: () => void;
  isLoading: boolean;
};

const backIcon = require("../../../assets/icons/login/backIcon.png");

const ProfileSettingHeader: FC<Props> = ({
  stackNavigation,
  submitProfileSetting,
  isLoading,
}) => {
  const { top: topPad } = useSafeAreaInsets();

  const goBack = () => {
    stackNavigation.pop();
  };

  return (
    <S.Container topPad={topPad}>
      <TouchableOpacity onPress={goBack}>
        <S.BackIcon topPad={topPad} source={backIcon} />
      </TouchableOpacity>
      <S.Title topPad={topPad}>프로필 수정</S.Title>
      <TouchableOpacity onPress={!isLoading ? submitProfileSetting : null}>
        <S.Save topPad={topPad}>{!isLoading ? "저장" : "저장중..."}</S.Save>
      </TouchableOpacity>
    </S.Container>
  );
};

export default ProfileSettingHeader;
