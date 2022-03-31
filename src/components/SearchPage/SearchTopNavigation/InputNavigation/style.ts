import styled from "styled-components/native";

export const Wrapper = styled.View<{ topPad:number }>`
    justify-content: center;
    align-items: center;
    border: 1px ${({theme}) => theme.colors.grayscale.scale20};
    background-color: ${({theme}) => theme.colors.grayscale.scale20};
    border-radius: 10;
    height: 50;
    width: 340;
`;

export const MagnifyImage = styled.Image`
    position: absolute;
    left: 8px;
    width: 18px;
    height: 18px;
    z-index: 2;
`;

export const Input = styled.TextInput<{ topPad: number }>`
    position: absolute;
    padding: 0 32px;
    width: 100%;
    height: 100%;
    color: ${({theme}) => theme.colors.grayscale.scale50};
    font: ${({theme}) => theme.fonts.body3};
`;