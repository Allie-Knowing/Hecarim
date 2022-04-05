import styled from "styled-components/native";
import { useTheme } from "styled-components";

export const Wrapper = styled.View<{ topPad:number }>`
    justify-content: center;
    align-items: center;
    border: 1px ${({theme}) => theme.colors.grayscale.scale20};
    background-color: ${({theme}) => theme.colors.grayscale.scale20};
    border-radius: 10;
    height: 50px;
    width: 365px;
`;

export const MagnifyImage = styled.Image`
    position: absolute;
    left: 8;
    width: 18px;
    height: 18px;
    z-index: 2;
`;

export const Input = styled.TextInput<{ topPad: number }>`
    position: absolute;
    padding: 0 32px;
    width: 100%;
    height: 100%;
    color: ${({theme}) => theme.colors.grayscale.scale100};
    font: ${({theme}) => theme.fonts.body3};
`;

export const ResetImageContainer = styled.TouchableOpacity`
    position: absolute;
    right: 8;
`;

export const ResetTextImage = styled.Image`
    width: 18;
    height: 18;
    z-index: 2;
`;

export const TitleAutoCompleteBox = styled.View`
    position : absolute;
    z-index: 3;
    width: 365px;
    height: 200px;
`;

export const TitleElement = styled.Text`
    
`;