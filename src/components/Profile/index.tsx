import { useProfile } from "queries/Profile";
import React, { FC } from "react";
import * as S from "./style";
import defaultProfile from "assets/profile.png";
import { ProfileInfo } from "api/Profile";

type Props = {
  userInfo: ProfileInfo;
  isLoading: boolean;
  isError: boolean;
  onPressFollower: () => void;
};

const Profile: FC<Props> = ({ userInfo, isError, isLoading, onPressFollower }) => {
  return (
    <>
      <S.Container>
        {userInfo && (
          <>
            <S.ProfileImage
              source={
                userInfo.profile ? { uri: userInfo.profile } : defaultProfile
              }
            />
            <S.ProfileContent>
              <S.NameContainer>
                <S.Nickname>{userInfo.name}</S.Nickname>
                <S.Email>{userInfo.email}</S.Email>
              </S.NameContainer>
              <S.DescriptionButton onPress={onPressFollower}>
                <S.Description>
                  팔로워 {userInfo.follower_cnt} 팔로잉{" "}
                  {userInfo.following_cnt}
                </S.Description>
              </S.DescriptionButton>
            </S.ProfileContent>
          </>
        )}
        {isLoading && <S.Message>사용자 정보 불러오는중...</S.Message>}
        {isError && <S.Message>사용자 정보를 불러올 수 없습니다.</S.Message>}
      </S.Container>
    </>
  );
};

export default Profile;
