import React, { FC } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import MyPageHeader from "components/Header/MyPage";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";
import * as S from "./styles";
import MakeKnowingBanner from "components/MakeKnowingBanner";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";
import { useMyId } from "queries/MyId";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
};

const MyPage: FC<Props> = ({ navigation }) => {
  const { data } = useMyId();

  return (
    <isStackContext.Provider value={false}>
      <S.Container>
        <MyPageHeader stackNavigation={navigation} />
        <Profile userId={data?.data.data} />
        <MyQuestionList userId={data?.data.data} navigation={navigation} />
      </S.Container>
    </isStackContext.Provider>
  );
};

export default MyPage;
