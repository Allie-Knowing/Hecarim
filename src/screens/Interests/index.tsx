import { StackNavigationProp } from "@react-navigation/stack";
import InterestsHeader from "components/Header/Interests";
import InterestsContent from "components/InterestsContent";
import useAlert from "hooks/useAlert";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import * as S from "./style";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "InterestsSetting">;
};

const Interests: FC<Props> = ({ navigation }) => {

  return (
    <S.InterestsContainer>
      <InterestsHeader />
      <InterestsContent {...navigation} />
    </S.InterestsContainer>
  );
};

export default Interests;
