import React, { FC } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputValueType } from "screens/Exchange";
import ExchangeInput from "./ExchangeInput";
import * as S from "./style";
import RNPickerSelect from "react-native-picker-select";
import { BANK, BANK_ARRAY } from "constance/wallet/bank";
import { StyleSheet } from "react-native";
import theme from "theme/theme";

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
        price: 0,
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
        accountNumber: 0,
      });
      return;
    }

    setInputValue({
      ...inputValue,
      accountNumber: parseInt(value),
    });
  };

  const onChangeBank = (value: BANK) => {
    setInputValue({
      ...inputValue,
      bank: value ? value : "",
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
          value={inputValue.price === 0 ? "" : inputValue.price}
        />
        <S.SelectPicker>
          <RNPickerSelect
            onValueChange={onChangeBank}
            useNativeAndroidPickerStyle={false}
            items={BANK_ARRAY}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "은행을 선택해주세요.",
            }}
            style={pickerSelectStyle}
          />
        </S.SelectPicker>
        <ExchangeInput
          placeholder="예금주"
          onChangeValue={onChangeAccountHolder}
          value={inputValue.accountHolder}
        />
        <ExchangeInput
          placeholder="계좌번호 (-없이 입력해주세요)"
          onChangeValue={onChangeAccountNumber}
          value={inputValue.accountNumber === 0 ? "" : inputValue.accountNumber}
        />
        <S.Description>
          1 IQ = 1원의 가치를 띄며, 영업일 3일 내로 입력하신 계좌에 입금됩니다.
        </S.Description>
      </S.Container>
    </KeyboardAwareScrollView>
  );
};

const pickerSelectStyle = StyleSheet.create({
  inputIOS: {
    width: "100%",
    height: "100%",
    color: theme.colors.grayscale.scale100,
    backgroundColor: theme.colors.grayscale.scale10,
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: "SpoqaHanSansNeo-Regular",
    borderRadius: 5,
  },
  inputAndroid: {
    width: "100%",
    height: "100%",
    color: theme.colors.grayscale.scale40,
    backgroundColor: theme.colors.grayscale.scale10,
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: "SpoqaHanSansNeo-Regular",
    borderRadius: 5,
  },
});

export default ExchangeInputContainer;
