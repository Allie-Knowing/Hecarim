import styled from "styled-components/native";

export const DefaultPageWrapper = styled.View`
    position: relative;
    width: 100%;
    flex: 1;
    top: 0px;
    left: 0px;      
`;
export const SearchedQuestionPageWrapper = styled.View`
    position: relative;
    background-color: ${({ theme }) => theme.colors.grayscale.scale10};
    width: 100%;
    flex: 1;
    top: 0px;
    left: 0px;  
`;