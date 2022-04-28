import styled from "styled-components/native";

export const InterestsItemContainer = styled.TouchableOpacity`
  width: 26%;
  height: 30%;
  position: relative;
`;

export const BackgroundImage = styled.Image<{
  check: Boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: 1;
  border: ${({ theme, check }) =>
    check ? `4px solid ${theme.colors.primary.default}` : "none"};
`;

export const grayWrapper = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const checkCircle = styled.View<{
  check: Boolean;
}>`
  width: 24px;
  height: 24px;
  border: ${({ theme, check }) =>
    !check ? `2px solid ${theme.colors.grayscale.scale10}` : "none"};
  border-radius: 12px;
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${({ check, theme }) =>
    check ? theme.colors.primary.default : "rgba(0,0,0,0)"};
`;
