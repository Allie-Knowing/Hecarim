import React, { FC, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import MyPageHeader from "components/Header/MyPage";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";
import * as S from "./styles";
import MakeKnowingBanner from "components/MakeKnowingBanner";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import isStackContext from "context/IsStackContext";
import useMyId from "utils/hooks/myId/useMyId";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "UserPage">;
  route: any;
};

const MyPage: FC<Props> = ({ navigation }) => {
  const myIdHooks = useMyId();

  const getProfile = async () => {
    if (!(await localStorage.getItem(storageKeys.accessToken))) {
      navigation.push("Login");
    } else {
      myIdHooks.setState.myId();
    }
  };

  useEffect(() => {
    console.log(myIdHooks.state.id);
  }, [myIdHooks.state.id]);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <isStackContext.Provider value={false}>
      <S.Container>
        <MyPageHeader stackNavigation={navigation} />
        <Profile />
        <MakeKnowingBanner />
        <MyQuestionList />
      </S.Container>
    </isStackContext.Provider>
  );
};

export default MyPage;
