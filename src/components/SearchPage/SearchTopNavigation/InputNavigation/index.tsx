import React, { FC, useCallback } from "react";
import { Dimensions, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import * as S from "./style";
import themeContext from "hooks/useThemeContext";
import { useSearchMutation } from "queries/Search";
import Magnify from "../../../../assets/icons/Search/Vector.png";
import ResetText from "../../../../assets/icons/Search/Reset_text.png";

interface PropsType {
  topPad: number;
  title: string;
  inputValue: string;
  setInputValue: (e: string) => void;
  checkValue: boolean;
}

const { width } = Dimensions.get("screen");

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

  const InputHandler = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const { text } = e.nativeEvent;
      setInputValue(text);
    },
    [setInputValue]
  );

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
