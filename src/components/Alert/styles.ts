import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  border-radius: 10px;
  padding-top: 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
  min-width: 250px;
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  margin-bottom: 8px;
  text-align: center;
`;

export const Content = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
  margin-bottom: 16px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export const Button = styled.TouchableHighlight`
  flex: 1;
  padding: 15px 0px;
  overflow: hidden;
`;

export const ButtonLabel = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  text-align: center;
  width: 100%;
  text-align: center;
`;
