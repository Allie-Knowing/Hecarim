import { StackNavigationProp } from "@react-navigation/stack";
import IQHistory from "components/Wallet/IQHistory";
import WalletInfo from "components/Wallet/WalletInfo";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC } from "react";
import * as S from "./style";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Main">;
};

const Wallet: FC<Props> = ({ navigation }) => {
  return (
    <S.WalletContainer>
      <WalletInfo navigation={navigation} />
      <IQHistory />
    </S.WalletContainer>
  );
};

export default Wallet;
