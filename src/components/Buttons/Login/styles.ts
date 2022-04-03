import styled from "styled-components/native";

export const Logo = styled.Image`
  width: 18px;
  height: 18px;
  position: absolute;
  left: 10px;
`;

export const Content = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale80};
  font-size: 14px;
`;
