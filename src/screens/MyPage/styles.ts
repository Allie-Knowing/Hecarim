import { FlatList } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const UserContainer = styled.View<{ topPad: number }>`
  position: absolute;
  padding-top: ${({ topPad }) => topPad};
  width: 100%;
  top: 0px;
  left: 0px;
  flex: 1;
`;

export const Container = styled.View`
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  flex: 1;
`;

export const AdContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background-color: #ffffff;
  padding: 5px;
`;
