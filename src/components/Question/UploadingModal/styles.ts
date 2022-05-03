import styled from "styled-components/native";

export const UploadingContainer = styled.View<{ topPad: number }>`
  position: absolute;
  left: 0;
  top: ${(props) => props.topPad + 130};
  width: 100;
  height: 40;
  background-color: ${({ theme }) => theme.colors.primary.default};
  z-index: 99;
  border-top-right-radius: 10;
  border-bottom-right-radius: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadingText = styled.Text`
  font: ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;
