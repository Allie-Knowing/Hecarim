import styled from "styled-components/native";

export const IQContainer = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const IQText = styled.Text`
  font: ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const PostScript = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale70};
  align-self: flex-end;
  margin-top: 8px;
`;
