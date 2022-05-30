import styled from "styled-components/native";

export const TierModalContainer = styled.TouchableOpacity<{
  width: number;
  height: number;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(196, 196, 196, 0.8);
`;

export const TireModalContent = styled.View`
  width: 320px;
  height: 420px;
  border-radius: 5px;
  background-color: white;
`;

export const Header = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 15px 20px;
`;

export const Logo = styled.Image`
  width: 25px;
  height: 25px;
`;

export const TireName = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  font: ${({ theme }) => theme.fonts.body1};
  margin-top: 10px;
`;

export const NextTire = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale30};
  font: ${({ theme }) => theme.fonts.description2};
`;

export const TireGaugeContainer = styled.View`
  width: 90%;
  margin-top: 16px;
  align-self: center;
`;

export const TireBarBackground = styled.View`
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
`;

export const TireBar = styled.View<{
  width: number;
}>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 5px;
`;

export const TireDescription = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0px 5px;
`;

export const TireDescriptionFont = styled.Text`
  font: ${({ theme }) => theme.fonts.description2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;

export const TireTable = styled.View`
  width: 90%;
  margin-top: 16px;
  border-top-width: 1px;
  border-color: #bbbcc4;
  border-style: solid;
  align-self: center;
  padding-top: 10px;
`;
