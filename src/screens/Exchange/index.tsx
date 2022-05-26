import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ExchangeInputContainer from "components/Exchange/ExchangeInputContainer";
import HoldingIQ from "components/Exchange/holdingIQ";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import React, { FC, useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Exchange">;
  route: RouteProp<MainStackParamList, "Exchange">;
};

const width = Dimensions.get("window").width;

export type InputValueType = {
  price: number | string;
  bank: string;
  accountHolder: string;
  accountNumber: number | string;
};

const ExchangePage: FC<Props> = ({ navigation, route }) => {
  const [inputValue, setInputValue] = useState<InputValueType>({
    price: 0,
    bank: "",
    accountHolder: "",
    accountNumber: 0,
  });

  return (
    <Container width={width}>
      <HoldingIQ iq={route.params.iq} />
      <ExchangeInputContainer
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </Container>
  );
};

const Container = styled.View<{
  width: number;
}>`
  width: ${({ width }) => `${width}px`};
  padding: 0px 20px;
  align-items: center;
`;

export default ExchangePage;
