import styled from "styled-components/native";

export const Wrapper = styled.View`
    width: 100%;
    flex: 1;
    top: 0px;
    left: 0px;      
    background-color: ${({ theme }) => theme.colors.grayscale.scale10};
`;