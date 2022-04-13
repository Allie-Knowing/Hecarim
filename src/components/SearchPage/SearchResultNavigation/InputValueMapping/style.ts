import styled from "styled-components/native";

export const ResultContainer = styled.TouchableHighlight`
    width: 100%;
    height: 76px;
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grayscale.scale20};
`;

export const ResultInlineBox = styled.View`
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const TitleResult = styled.View`
    width: 100%;
`;

export const ResultElement = styled.Text`
    color: ${({theme}) => theme.colors.grayscale.scale100};
    font: ${({theme}) => theme.fonts.body3};
`;