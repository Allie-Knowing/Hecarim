import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./style";
import backIcon from "../../../assets/icons/login/backIcon.png";

type Props = {
  stackNavigation: StackNavigationProp<MainStackParamList, "PrivacyPolicy">;
};


const PrivacyPolicyPage: FC<Props> = ({ stackNavigation }) => {
  const { top: topPad } = useSafeAreaInsets();

  const goBack = () => {
    stackNavigation.pop();
  };

  return (
    <S.Container topPad={topPad}>
      <TouchableOpacity onPress={goBack}>
        <S.BackIcon topPad={topPad} source={backIcon} />
      </TouchableOpacity>
    </S.Container>
  );
};

export default PrivacyPolicyPage;
