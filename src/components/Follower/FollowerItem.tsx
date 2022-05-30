import { FollowItem } from 'api/Follow';
import styled from 'styled-components/native';
import defaultProfile from "assets/profile.png";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends Omit<FollowItem, "id"> {
    
}

const FollowerItem = ({
    profile,
    name,
}: Props) => {
    return (
        <Container>
            <Avatar source={profile ? { uri: profile } : defaultProfile} />
            <Name>{name}</Name>
        </Container>
    );
}

const Container = styled.View`
    width: 100%;
    padding: 12px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${({ theme }) => theme.colors.grayscale.scale10};
`;

const Avatar = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 20px;
`;

const Name = styled.Text`
    font: ${({ theme }) => theme.fonts.description1};
    color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export default FollowerItem;