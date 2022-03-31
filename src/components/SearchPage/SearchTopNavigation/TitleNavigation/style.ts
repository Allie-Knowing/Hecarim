import styled from "styled-components/native";

export const Wrapper = styled.View<{ topPad: number }>`
    position: absolute;
`;

export const Title = styled.Text<{ topPad: number }>`
    color: ${({ theme }) => theme.colors.grayscale.scale100};
    font: ${({ theme }) => theme.fonts.body2};
    margin-bottom: 86;
`;