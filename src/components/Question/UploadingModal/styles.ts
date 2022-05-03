import styled from "styled-components/native";

export const UploadingContainer = styled.View<{ topPad: number }>`
  position: absolute;
  left: 0;
  top: ${(props) => props.topPad + 130};
  width: 120;
  height: 40;
  background-color: ${({ theme }) => theme.colors.primary.default};
  z-index: 99;
  border-top-right-radius: 10;
  border-bottom-right-radius: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const UploadingText = styled.Text`
  font: ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-right: 5px;
`;

export const UploadingStatus = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;
