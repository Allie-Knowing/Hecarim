import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Outer = styled(Animated.FlatList)`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  flex: 1;
`;

export const Wrapper = styled.View`
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  flex: 1;
`;

export const NavText = styled(Animated.Text)`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;
