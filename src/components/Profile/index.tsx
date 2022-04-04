import React, { FC } from "react";
import useProfile from "utils/hooks/profile/useProfile";
import * as S from "./style";

const Profile: FC = () => {
  const { state } = useProfile();

  return (
    <S.Container>
      <S.ProfileImage source={{ uri: state.profile }} />
      <S.ProfileContent>
        <S.Nickname>{state.name ? state.name : ""}</S.Nickname>
        <S.Description>내가 올린 질문 {state.videoCnt}개</S.Description>
      </S.ProfileContent>
    </S.Container>
  );
};

export default Profile;
