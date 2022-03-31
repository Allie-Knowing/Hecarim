import styled from "styled-components/native";

export const Wrapper = styled.View<{ topPad: number }>`
    width: 100%;
    margin-top: ${({topPad}) => 24 + topPad};
    height: ${({topPad}) => 50 + topPad};
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
`;