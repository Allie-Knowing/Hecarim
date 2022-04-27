import styled from "styled-components/native";

export const InterestsContentContainer = styled.View<{
  height: number;
}>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
  align-items: center;
  position: relative;
`;

export const Title = styled.Text`
  width: 90%;
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  margin-top: 20px;
`;

export const Description = styled.Text`
  width: 90%;
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const InterestsField = styled.View`
  width: 90%;
  height: 60%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  margin-top: 40px;
`;

export const CheckButton = styled.TouchableOpacity`
  width: 90%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 5px;
  bottom: 40px;
`;

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font-size: 14px;
`;
