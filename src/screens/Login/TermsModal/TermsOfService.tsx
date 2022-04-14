import React, { FC } from "react";
import * as S from "./style";
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";
import TermsHeader from "components/Header/TermsPage";
import TermsPage from "components/Terms/TermsOfService";

const TermsOfService: FC<
  StackScreenProps<MainStackParamList, "TermsOfService">
> = ({ navigation }) => {
  return (
    <isStackContext.Provider value={true}>
      <S.Wrapper>
        <TermsHeader stackNavigation={navigation} />
        <TermsPage />
      </S.Wrapper>
    </isStackContext.Provider>
  );
};

export default TermsOfService;
