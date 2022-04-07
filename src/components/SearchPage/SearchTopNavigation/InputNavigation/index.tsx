import React, { FC, useRef, useCallback } from "react";
import { Dimensions } from "react-native";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import * as S from "./style";
import themeContext from "hooks/useThemeContext";
import { useSearchMutation } from "queries/Search";
import InputValueMapping from "./InputValueMapping";

interface PropsType {
  topPad: number;
}

const Magnify = require("../../../../assets/icons/Search/Vector.png");
const ResetText = require("../../../../assets/icons/Search/Reset_text.png");

const InputNavigation: FC<PropsType> = ({ topPad }) => {
  const { width } = Dimensions.get("screen");
  const [inputValue, setInputValue] = React.useState<string>("");
  const [checkValue, setCheckValue] = React.useState<boolean>(false);
  const navigation = useMainStackNavigation();
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
    searchMutation.data?.data.data.map((result) => {
      if (inputValue === result.title) {
        setInputValue(result.title);
        navigation.navigate("SearchedQuestionsPage", {
          title: result.title,
        });
      }
    });
  };

  const Search = useCallback(async () => {
    const response = await searchMutation.mutateAsync(inputValue);

    return response;
  }, [inputValue]);

  const pressHandler = useCallback(
    (id: string, title: string) => {
      searchMutation.data?.data.data.map((result) => {
        if (title === result.title) {
          setInputValue(result.title);
          navigation.navigate("SearchedQuestionsPage", {
            title: result.title,
          });
        }
      });
    },
    [searchMutation]
  );

  React.useEffect(() => {
    if (inputValue.length > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = setTimeout(Search, 100);

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
          style={{ width }}
          bounces={false}
          bouncesZoom={false}
          topPad={topPad}
        >
          {searchMutation.data?.data.data &&
          searchMutation.data?.data.data.length > 0
            ? searchMutation.data?.data.data.map((value) => {
                return (
                  <InputValueMapping
                    key={value.id}
                    value={value}
                    pressHandler={pressHandler}
                  />
                );
              })
            : null}
        </S.ValueMappingContainer>
      </S.Wrapper>
    </>
  );
};

export default InputNavigation;
