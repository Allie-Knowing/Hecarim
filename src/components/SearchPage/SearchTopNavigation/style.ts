import styled from "styled-components/native";

export const Wrapper = styled.View<{ topPad: number }>`
    width: 100%;
    height: ${({topPad}) => 50 + topPad};
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
`;