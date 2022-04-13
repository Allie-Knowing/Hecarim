import styled from "styled-components/native";

export const Container = styled.View<{ width: number }>`
  width: ${({ width }) => width};
  margin-bottom: 10px;
`;

export const Banner = styled.Image`
  width: 100%;
`;
