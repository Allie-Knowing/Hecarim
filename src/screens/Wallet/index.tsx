import IQHistory from "components/Wallet/IQHistory";
import WalletInfo from "components/Wallet/WalletInfo";
import React, { FC } from "react";
import * as S from "./style";

const Wallet: FC = () => {
  return (
    <S.WalletContainer>
      <WalletInfo />
      <IQHistory />
    </S.WalletContainer>
  );
};

export default Wallet;
