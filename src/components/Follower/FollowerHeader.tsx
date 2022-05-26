import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

interface Props {
    isFollowerPage: boolean;
    setIsFollowerPage: React.Dispatch<React.SetStateAction<boolean>>;
    followerCount: number;
    followingCount: number;
}

const FollowerHeader = ({
    isFollowerPage,
    setIsFollowerPage,
    followerCount,
    followingCount,
}: Props) => {
    const animatedPercent = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateInstance = Animated.timing(
            animatedPercent,
            {
                toValue: isFollowerPage ? 0 : (Dimensions.get("window").width / 2),
                useNativeDriver: true,
                duration: 200,
            },
        );
        animateInstance.start();
        return () => animateInstance.stop();
    }, [isFollowerPage]);

    return (
        <Container>
            <NavigationButton onPress={() => setIsFollowerPage(true)}>
                <NavigationItem isActive={isFollowerPage}>팔로워 {followerCount}</NavigationItem>
            </NavigationButton>
            <NavigationButton onPress={() => setIsFollowerPage(false)}>
                <NavigationItem isActive={!isFollowerPage}>팔로잉 {followingCount}</NavigationItem>
            </NavigationButton>
            <Bar style={{ transform: [{ translateX: animatedPercent }] }} />
        </Container>
    );
}

const Container = styled.View`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    background: ${({ theme }) => theme.colors.grayscale.scale10};
`;

const NavigationButton = styled.TouchableOpacity`
    width: 50%;
    padding: 12px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const NavigationItem = styled.Text<{ isActive: boolean; }>`
    color: ${(props) => props.isActive ? props.theme.colors.grayscale.scale100 : props.theme.colors.grayscale.scale50};
    font: ${({ theme }) => theme.fonts.body3};
`;

const Bar = styled(Animated.View)`
    width: 50%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary.default};
    position: absolute;
    bottom: 0;
    left: 0;
`;

export default FollowerHeader;