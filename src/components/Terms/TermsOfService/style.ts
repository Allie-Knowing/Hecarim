import styled from "styled-components/native";

export const Container = styled.ScrollView<{ height: number}>`
    width: 100%;
    height: 100%;
`;

export const Title = styled.Text`
    text-align: center;
    font: ${({ theme }) => theme.fonts.h2};
    margin-top: 20px;
`;

export const DescriptionContainer = styled.View`
    border: 1px solid ${({theme}) => theme.colors.grayscale.scale20};
    border-radius: 10px;
    margin: 20px 28px;
    padding: 28px 28px;
`;

export const Description = styled.Text`

`;