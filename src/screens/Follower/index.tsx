import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FollowerHeader from 'components/Follower/FollowerHeader';
import FollowerItem from 'components/Follower/FollowerItem';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFollowers, useFollowings } from 'queries/Follow';
import { FollowItem } from 'api/Follow';
import { AxiosResponse } from 'axios';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from 'hooks/useMainStackNavigation';

interface Props {
  route: RouteProp<MainStackParamList, "UserPage">;
}

const Follower: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;
  const { top } = useSafeAreaInsets();
  const [isFollowerPage, setIsFollowerPage] = useState<boolean>(true);
  const { data: followersData } = useFollowers(userId);
  const { data: followingsData } = useFollowings(userId);

  const followers: AxiosResponse<FollowItem[]> = followersData ?? { data: [] } as AxiosResponse<FollowItem[]>;
  const followings: AxiosResponse<FollowItem[]> = followingsData ?? { data: [] } as AxiosResponse<FollowItem[]>;

  return (
    <Container top={top}>
      <FollowerHeader
        isFollowerPage={isFollowerPage}
        setIsFollowerPage={setIsFollowerPage}
        followerCount={followers.data.length}
        followingCount={followings.data.length}
      />
      <ScrollView>
        {
          (
            isFollowerPage 
              ? followers.data ?? [] 
              : followings.data ?? []
          ).map(({ id, ...data }) => <FollowerItem key={id} {...data} />)
        }
      </ScrollView>
    </Container>
  );
};

const Container = styled.View<{ top: number; }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  flex: 1;
  padding-top: ${({ top }) => top}px;
  background: ${({ theme }) => theme.colors.grayscale.scale10};
`;
  
export default Follower;