import React, { FC } from "react";
import * as S from "./style";

const Profile: FC = () => {
  return (
    <S.Container>
      <S.ProfileImage source={require("../../assets/profile_test.png")} />
      <S.ProfileContent>
        <S.Nickname>user1234</S.Nickname>
        <S.Description>내가 올린 질문 12개</S.Description>
      </S.ProfileContent>
    </S.Container>
  );
};

export default Profile;
