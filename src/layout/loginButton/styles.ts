import styled from "styled-components/native";

export const Wrapper = styled.View<{ width: number }>`
  width: ${({ width }) => width - 40};
  border: 1px solid ${({ theme }) => theme.colors.grayscale.scale20};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  padding: 15px 0px;
  margin-top: 15px;
`;
