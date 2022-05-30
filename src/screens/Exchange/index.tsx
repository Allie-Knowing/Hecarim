import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ExchangeInputContainer from "components/Exchange/ExchangeInputContainer";
import HoldingIQ from "components/Exchange/holdingIQ";
import { BANK } from "constance/wallet/bank";
import useAlert from "hooks/useAlert";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { useExchangeCash } from "queries/Wallet";
import React, { FC, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Exchange">;
  route: RouteProp<MainStackParamList, "Exchange">;
};

const width = Dimensions.get("window").width;
const MIN_COST = 5000;

export type InputValueType = {
  price: number;
  bank: BANK;
  accountHolder: string;
  accountNumber: number;
};

const ExchangePage: FC<Props> = ({ navigation, route }) => {
  const { bottom: bottomPad } = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState<InputValueType>({
    price: 0,
    bank: "",
    accountHolder: "",
    accountNumber: 0,
  });
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const { closeAlert, showAlert } = useAlert();
  const { mutate, isSuccess, isError } = useExchangeCash();

  useEffect(() => {
    if (
      inputValue.bank !== "" &&
      inputValue.price !== 0 &&
      inputValue.accountHolder !== "" &&
      inputValue.accountNumber !== 0
    ) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (isSuccess) {
      showAlert({
        title: "성공적으로 등록되었습니다.",
        content: "3일 이내로 입금예정입니다.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
      navigation.reset({
        routes: [{ name: "Main" }],
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "잠시후 다시 시도해주세요.",
        content: "불편을 드려 죄송합니다.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  }, [isError]);

  const exchangeIQ = () => {
    if (inputValue.price > route.params.iq || inputValue.price < MIN_COST) {
      showAlert({
        title: "금액을 다시 확인해주세요.",
        content: "금액이 잘못되었습니다.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    } else {
      mutate({
        cash: inputValue.price,
        account_number: inputValue.accountNumber.toString(),
        account_owner: inputValue.accountHolder,
        bank: inputValue.bank,
      });
    }
  };

  return (
    <Screen width={width}>
      <Container>
        <HoldingIQ iq={route.params.iq} />
        <ExchangeInputContainer
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </Container>
      <ExchangeButton
        isCheck={isCheck}
        bottomPad={bottomPad}
        activeOpacity={0.9}
        onPress={
          isCheck
            ? exchangeIQ
            : () => {
                return;
              }
        }
      >
        <ExchangeButtonText>교환하기</ExchangeButtonText>
      </ExchangeButton>
    </Screen>
  );
};

const Screen = styled.View<{
  width: number;
}>`
  width: ${({ width }) => `${width}px`};
  flex: 1;
`;

const Container = styled.View`
  width: 100%;
  padding: 0px 20px;
  align-items: center;
`;

const ExchangeButton = styled.TouchableOpacity<{
  isCheck: boolean;
  bottomPad: number;
}>`
  width: 100%;
  height: ${({ bottomPad }) => `${bottomPad + 40}px`};
  position: absolute;
  bottom: 0;
  background-color: ${({ isCheck, theme }) =>
    isCheck ? theme.colors.primary.default : "#D7D9DE"};
  align-items: center;
  justify-content: center;
  padding-bottom: ${({ bottomPad }) => `${bottomPad / 2}px`};
`;

const ExchangeButtonText = styled.Text`
  font: ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.grayscale.scale10};
`;

export default ExchangePage;
