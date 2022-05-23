import styled from "styled-components/native";

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
  width: 98%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const SwitchText = styled.View`
  width: 50%;
  height: 80%;
  font: ${({ theme }) => theme.fonts.body3};
  text-align: center;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SwitchFont = styled.Text`
  font: ${({ theme }) => theme.fonts.body3};
  text-align: center;
`;
