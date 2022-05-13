import styled from "styled-components/native";

export const Container = styled.View<{
  height: number;
}>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const SwitchButton = styled.TouchableOpacity`
  width: 320px;
  height: 37px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
  margin-top: 20px;
  align-self: center;
  align-items: center;
`;

export const SwitchTextContainer = styled.View`
  width: 90%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const CurrentSwitchContent = styled.View`
  width: 50%;
  height: 80%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 10px;
`;

export const SwitchText = styled.Text<{ isWhite: boolean }>`
  width: 50%;
  font: ${({ theme }) => theme.fonts.body3};
  text-align: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  font: ${({ theme }) => theme.fonts.subtitle2};
  margin-top: 16px;
  margin-left: 20px;
`;

export const QuestionContainer = styled.FlatList`
  width: 100%;
  margin-top: 12px;
  height: 500px;
`;

export const Notice = styled.Text`
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;
