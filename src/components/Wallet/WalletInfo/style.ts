import styled from "styled-components/native";

export const WalletInfoContainer = styled.View<{
  topPad: number;
}>`
  background-color: ${({ theme }) => theme.colors.primary.default};
  padding: 0px 20px;
  padding-top: ${({ topPad }) => `${topPad}px`};
  position: relative;
`;

export const WalletHeader = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

export const HeaderTitle = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const TierContainer = styled.View`
  width: 100%;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TierInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TierImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const TierTitle = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle1};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const WalletHeaderButtonContainer = styled.View`
  flex-direction: row;
`;

export const WalletHeaderButton = styled.TouchableOpacity`
  border-radius: 4px;
  border: 1px solid #fff;
`;

export const ExchangeButton = styled.TouchableOpacity`
  border-radius: 4px;
  border: 1px solid #fff;
  margin-right: 5px;
`;

export const WalletHeaderButtonDescription = styled.Text`
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  padding: 4px 8px;
`;

export const Accumulate = styled.View`
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 60px;
`;

export const AccumulateContent = styled.View`
  flex-direction: column;
  margin-right: 80px;
`;

export const AccumulateTitle = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
  margin-bottom: 5px;
`;

export const AccumulateValue = styled.Text`
  font: ${({ theme }) => theme.fonts.subtitle2};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export const HoldingContainer = styled.View`
  width: 340px;
  height: 76px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale20};
  border-radius: 11px;
  position: absolute;
  bottom: 0;
  transform: translateY(38px);
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const HoldingContent = styled.View`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const HoldingLine = styled.View`
  width: 1px;
  height: 26px;
  background-color: ${({ theme }) => theme.colors.grayscale.scale30};
`;

export const HoldingTitle = styled.Text`
  font: ${({ theme }) => theme.fonts.description1};
  color: ${({ theme }) => theme.colors.grayscale.scale70};
`;

export const HoldingValue = styled.Text`
  font: ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.grayscale.scale100};
`;
