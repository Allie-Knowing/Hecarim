import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const Wrapper = styled.View<{ height: number }>`
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
    height: ${({height}) => height};
    margin-top: 10;
`;

export const View = styled(Animated.View)`
    
`;

export const Text = styled(Animated.Text)`
    font: ${({theme}) => theme.fonts.body3};
    color: ${({theme}) => theme.colors.grayscale.scale50};
`;