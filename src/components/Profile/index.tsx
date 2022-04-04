import ProfileState from "modules/redux/reducer/profile/interface";
import React, { FC } from "react";
import * as S from "./style";

const Profile: FC<ProfileState> = ({ name, profile, videoCnt }) => {
  return (
    <S.Container>
      <S.ProfileImage source={require("../../assets/profile_test.png")} />
      <S.ProfileContent>
        <S.Nickname>{name ? name : ""}</S.Nickname>
        <S.Description>내가 올린 질문 {videoCnt}개</S.Description>
      </S.ProfileContent>
    </S.Container>
  );
};

export default Profile;
