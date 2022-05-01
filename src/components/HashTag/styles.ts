import styled from "styled-components/native";

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.description2};
  margin-left: 35px;
  margin-top: 5px;
`;

export const HashTag = styled(Description)`
  color: ${({ theme }) => theme.colors.primary.default};
  margin-top: 5px;
`;
