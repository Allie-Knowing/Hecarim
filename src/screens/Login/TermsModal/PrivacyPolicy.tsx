import React, { FC } from "react";
import * as S from "./style";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";

const PrivacyPolicy: FC<
  StackScreenProps<MainStackParamList, "PrivacyPolicy">
> = ({ navigation }) => {
  return (
    <isStackContext.Provider value={true}>
      <S.Wrapper></S.Wrapper>
    </isStackContext.Provider>
  );
};

export default PrivacyPolicy;
