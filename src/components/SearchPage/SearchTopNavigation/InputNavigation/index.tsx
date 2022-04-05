import React, { FC, useRef, useCallback } from "react";
import * as S from "./style";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "hooks/useSearchStackNavigation";
import themeContext from "hooks/useThemeContext";
import { searchTitleResponse } from "modules/dto/response/searchResponse";
import { useSearchMutation } from "queries/Search";
import InputValueMapping from "./InputValueMapping";

interface Props {
  topPad: number;
}

const Magnify = require("../../../../assets/icons/Search/Vector.png");
const ResetText = require("../../../../assets/icons/Search/Reset_text.png");

type screenProp = StackNavigationProp<RootStackParamList, "SearchedQuestions">;

const InputNavigation: FC<Props> = ({ topPad }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [checkValue, setCheckValue] = React.useState<boolean>(false);
  const navigation = useNavigation<screenProp>();
  const theme = themeContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchMutation = useSearchMutation();

  const ResetInputValue = () => {
    setInputValue("");
  };

  const InputHandler = useCallback((e) => {
    const { text } = e.nativeEvent;
    setInputValue(text);
  }, []);

  const SubmitHandler = () => {
    searchMutation.data.data.data.map((value) => {
      if (inputValue === value.title) navigation.navigate("SearchedQuestions");
    });
  };

  const Search = useCallback(async () => {
    const response = await searchMutation.mutateAsync(inputValue);

    return response;
  }, [inputValue]);

  React.useEffect(() => {
    if (inputValue.length > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = setTimeout(Search, 300);

      return setCheckValue(true);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      return setCheckValue(false);
    }
  }, [inputValue, Search]);

  return (
    <>
      <S.Wrapper topPad={topPad}>
        <S.MagnifyImage source={Magnify} />
        <S.Input
          topPad={topPad}
          value={inputValue}
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
        <S.ValueMappingContainer
          decelerationRate="fast"
          snapToAlignment="start"
          bounces={false}
          bouncesZoom={false}
          // scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {searchMutation.data?.data.data &&
          searchMutation.data?.data.data.length > 0
            ? searchMutation.data?.data.data.map((value) => {
                return <InputValueMapping key={value.id} value={value} />;
              })
            : null}
        </S.ValueMappingContainer>
      </S.Wrapper>
    </>
  );
};

export default InputNavigation;
