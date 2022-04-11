import styled from "styled-components/native";

export const ResultContainer = styled.TouchableHighlight`
    justify-content: center;
    width: 100%;
    height: 80px;
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.grayscale.scale20};
`;

export const ResultInlineBox = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 25px 8px 0 8px;
`;

export const TitleResult = styled.View`
    width: 100%;
    height: 40px;
`;

export const ResultElement = styled.Text`
    color: ${({theme}) => theme.colors.grayscale.scale100};
    font: ${({theme}) => theme.fonts.body3};
`;