import React, { FC } from "react";
import MyPageHeader from "components/Header/MyPage";
import * as S from "./style";
import Profile from "components/Profile";
import MyQuestionList from "components/MyQuestionList";

const MyPage: FC = () => {
  return (
    <S.Container>
      <MyPageHeader />
      <Profile />
      <MyQuestionList />
    </S.Container>
  );
};

export default MyPage;
