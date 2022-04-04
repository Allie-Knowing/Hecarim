import { Dimensions, Text } from "react-native";
import React, { FC } from "react";
import * as S from "./styles";
import InquiryButton from "components/Buttons/Setting/InquiryButton";
import LogoutButton from "components/Buttons/Setting/LogoutButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";

const { width } = Dimensions.get("window");

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Setting">;
};

const Setting: FC<Props> = ({ navigation }) => {
  return (
    <S.Container width={width}>
      <InquiryButton />
      <LogoutButton navigation={navigation} />
    </S.Container>
  );
};

export default Setting;
