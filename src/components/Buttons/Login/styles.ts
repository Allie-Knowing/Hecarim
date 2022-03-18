import styled from "styled-components/native";

export const Container = styled.View<{ width: number }>`
  width: ${({ width }) => width};
  height: 38px;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.scale20};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
`;

export const LoginIcon = styled.Image`
  width: 18px;
  height: 18px;
  position: absolute;
  left: 10px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale80};
  font-size: 14px;
`;
