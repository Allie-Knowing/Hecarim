import { useProfile } from "queries/Profile";
import React, { FC } from "react";
import * as S from "./style";
import defaultProfile from "assets/profile.png";

type Props = {
  userId: number;
};

const Profile: FC<Props> = ({ userId }) => {
  const { data, isLoading, error } = useProfile(userId);

  return (
    <>
      <S.Container>
        {data && (
          <>
            <S.ProfileImage
              source={data.data.data.profile ? { uri: data.data.data.profile } : defaultProfile}
            />
            <S.ProfileContent>
              <S.NameContainer>
                <S.Nickname>{data.data.data.name}</S.Nickname>
                <S.Email>{data.data.data.email}</S.Email>
              </S.NameContainer>
              <S.Description>영상 질문 {data.data.data.video_cnt}개</S.Description>
            </S.ProfileContent>
          </>
        )}
        {isLoading && <S.Message>잠시만 기다려주세요.</S.Message>}
        {error && <S.Message>사용자 정보를 불러올 수 없습니다.</S.Message>}
      </S.Container>
    </>
  );
};

export default Profile;
