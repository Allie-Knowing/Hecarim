import styled from "styled-components/native"

export const Wrapper = styled.View<{ height: number }>`
    margin-top: 10px;
    width: 100%;
    height: ${({height }) => height};
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.grayscale.scale10};
    flex-grow: 1;
`;

export const ValueMappingContainer = styled.ScrollView`
    height: 100%;
    width: 100%;
    padding: 12px 14px;
`;

export const ResultViewTitle = styled.Text`
    font: ${({ theme }) => theme.fonts.description2};
    color: ${({ theme }) => theme.colors.grayscale.scale50};
    margin: 10px 0 10px 0;
`;

export const DefaultContainerView = styled.View<{ height: number }>`
    width: 100%;
    height: ${({height}) => 50 + height};
    justify-content: center;
    align-items: center;
`;

export const DefaultContainer = styled.Text`
    font: ${({ theme }) => theme.fonts.body3};
    color: ${({ theme }) => theme.colors.grayscale.scale50};
`;