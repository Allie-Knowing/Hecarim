import React, { FC } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputValueType } from "screens/Exchange";
import ExchangeInput from "./ExchangeInput";
import * as S from "./style";

type Props = {
  inputValue: InputValueType;
  setInputValue: React.Dispatch<React.SetStateAction<InputValueType>>;
};

const ExchangeInputContainer: FC<Props> = ({ inputValue, setInputValue }) => {
  const onChangePriceValue = (text: string) => {
    const value = text.replace(/[^0-9]/g, "");

    if (!value) {
      setInputValue({
        ...inputValue,
        price: "",
      });
      return;
    }

    setInputValue({
      ...inputValue,
      price: parseInt(value),
    });
  };

  const onChangeAccountHolder = (text: string) => {
    setInputValue({
      ...inputValue,
      accountHolder: text,
    });
  };

  const onChangeAccountNumber = (text: string) => {
    const value = text.replace(/[^0-9]/g, "");

    if (!value) {
      setInputValue({
        ...inputValue,
        accountNumber: "",
      });
      return;
    }

    setInputValue({
      ...inputValue,
      accountNumber: parseInt(value),
    });
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={40}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      style={{ width: "100%" }}
    >
      <S.Container>
        <ExchangeInput
          placeholder="현금교환 금액"
          onChangeValue={onChangePriceValue}
          value={inputValue.price}
        />
        <ExchangeInput
          placeholder="예금주"
          onChangeValue={onChangeAccountHolder}
          value={inputValue.accountHolder}
        />
        <ExchangeInput
          placeholder="계좌번호 (-없이 입력해주세요)"
          onChangeValue={onChangeAccountNumber}
          value={inputValue.accountNumber}
        />
      </S.Container>
    </KeyboardAwareScrollView>
  );
};

export default ExchangeInputContainer;
