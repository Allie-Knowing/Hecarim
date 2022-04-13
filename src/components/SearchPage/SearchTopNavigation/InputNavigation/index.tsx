import React, { FC, useCallback } from "react";
import { Dimensions } from "react-native";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import * as S from "./style";
import themeContext from "hooks/useThemeContext";
import { useSearchMutation } from "queries/Search";

interface PropsType {
  topPad: number;
  title: string;
  inputValue: string;
  setInputValue: (e: string) => void;
  checkValue: boolean;
}

const { width } = Dimensions.get("screen");

const Magnify = require("../../../../assets/icons/Search/Vector.png");
const ResetText = require("../../../../assets/icons/Search/Reset_text.png");

const InputNavigation: FC<PropsType> = ({
  topPad,
  title,
  inputValue,
  setInputValue,
  checkValue,
}) => {
  const navigation = useMainStackNavigation();
  const theme = themeContext();
  const searchMutation = useSearchMutation();

  const ResetInputValue = () => {
    setInputValue("");
  };

  const InputHandler = useCallback((e) => {
    const { text } = e.nativeEvent;
    setInputValue(text);
  }, []);

  const SubmitHandler = () => {
    searchMutation.data?.data.data.map((result) => {
      if (inputValue === result.title) {
        setInputValue(result.title);
        navigation.navigate("SearchedQuestionsPage", {
          title: result.title,
        });
      }
    });
  };

  return (
    <>
      <S.Wrapper topPad={topPad} style={{ width: width - 50 }}>
        <S.MagnifyImage source={Magnify} />
        <S.Input
          topPad={topPad}
          defaultValue={inputValue || title}
          onChange={InputHandler}
          // onFocus={() => navigation.navigate("Login")}
          onSubmitEditing={SubmitHandler}
          placeholder="제목을 입력해주세요..."
          placeholderTextColor={theme.colors.grayscale.scale50}
        />
        {checkValue && (
          <S.ResetImageContainer onPress={ResetInputValue}>
            <S.ResetTextImage source={ResetText} />
          </S.ResetImageContainer>
        )}
      </S.Wrapper>
    </>
  );
};

export default InputNavigation;
