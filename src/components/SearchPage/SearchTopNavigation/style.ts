import styled from "styled-components/native";

export const Wrapper = styled.View<{ topPad: number }>`
    height: ${({topPad}) => 50 + topPad}px;
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
`;