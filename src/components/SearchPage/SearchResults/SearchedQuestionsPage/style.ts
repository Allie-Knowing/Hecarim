import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const Wrapper = styled.View`
    position: relative;
`;

export const BackBtn = styled.Image<{ topPad: number }>`
    position: absolute;
    width: 10;
    height: 18;
    z-index: 10;
`;

export const View = styled(Animated.View)<{ height: number }>`
    height: ${({height}) => height};
`;