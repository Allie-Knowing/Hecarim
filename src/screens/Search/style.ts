import styled from "styled-components/native";

export const Wrapper = styled.View<{topPad: number}>`
    position: relative;
    top: 0;
    left: 0;  
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
    height: ${({topPad}) => 103 + topPad}px;
`;