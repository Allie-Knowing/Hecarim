import { useFollowMutation, useIsFollow } from "queries/Follow";
import React, { FC, useEffect, useState } from "react";
import * as S from "./style";
import defaultProfile from "assets/profile.png";
import { ProfileInfo } from "api/Profile";

type Props = {
  userInfo: ProfileInfo;
  isLoading: boolean;
  isError: boolean;
  onPressFollower: () => void;
  userId: number;
};

const Profile: FC<Props> = ({ userInfo, isError, isLoading, onPressFollower, userId }) => {
  const { data } = useIsFollow(userId);
  const [isFollow, setIsFollow] = useState(false);
  const { mutateAsync } = useFollowMutation(userId);
  const [isClick, setClick] = useState(false);

  useEffect(() => {
    if (data) {
      setIsFollow(data.data.is_follow);
    }
  }, [data]);

  const onPressFollow = (condition: boolean) => {
    setClick(true);
    setIsFollow(condition);
  };

  useEffect(() => {
    if (userId !== -1 && isClick) {
      const timeout = setTimeout(() => {
        console.log("123");

        mutateAsync(isFollow);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isClick, isFollow, mutateAsync, userId]);

  return (
    <>
      <S.Container>
        {userInfo && (
          <>
            <S.ProfileImage
              source={userInfo.profile ? { uri: userInfo.profile } : defaultProfile}
            />
            <S.ProfileContent>
              <S.NameContainer>
                <S.Nickname ellipsizeMode="tail" numberOfLines={1}>
                  {userInfo.name}
                </S.Nickname>
                <S.Email ellipsizeMode="tail" numberOfLines={1}>
                  {userInfo.email}
                </S.Email>
              </S.NameContainer>
              <S.DescriptionButton onPress={onPressFollower}>
                <S.Description>
                  팔로워 {userInfo.follower_cnt} 팔로잉 {userInfo.following_cnt}
                </S.Description>
              </S.DescriptionButton>
            </S.ProfileContent>
            {userId !== -1 &&
              (!isFollow ? (
                <S.FollowButton onPress={() => onPressFollow(true)}>
                  <S.FollowButtonLabel>팔로우</S.FollowButtonLabel>
                </S.FollowButton>
              ) : (
                <S.UnFollowButton onPress={() => onPressFollow(false)}>
                  <S.UnFollowButtonLabel>팔로우 중</S.UnFollowButtonLabel>
                </S.UnFollowButton>
              ))}
          </>
        )}
        {isLoading && <S.Message>사용자 정보 불러오는중...</S.Message>}
        {isError && <S.Message>사용자 정보를 불러올 수 없습니다.</S.Message>}
      </S.Container>
    </>
  );
};

export default Profile;
