import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 57px;
  padding: 0px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LeftContent = styled.View`
  flex-direction: column;
`;

export const Description = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const Date = styled.Text`
  font: ${({ theme }) => theme.fonts.description2};
  color: ${({ theme }) => theme.colors.grayscale.scale70};
`;

export const Point = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;
