import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.grayscale.scale10};
    border-top-width: 10;
    border-top-color: ${({theme}) => theme.colors.grayscale.scale20};
`;

export const Message = styled.Text`
    color: ${({ theme }) => theme.colors.grayscale.scale50};
    text-align: center;
    font: ${({ theme }) => theme.fonts.body3};
`;

export const ResultAmount = styled.Text`
    color: ${({ theme }) => theme.colors.grayscale.scale100};
    font: ${({ theme }) => theme.fonts.body3};
    margin-left: 20;
    margin-top: 16;
    margin-bottom: 16;
`;
