import React, { FC, useRef, useCallback } from "react";
import { Dimensions } from "react-native";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import * as S from "./style";
import { useSearchMutation } from "queries/Search";
import InputValueMapping from "./InputValueMapping";

interface PropsType {
  inputValue: string;
  setInputValue: (e: string) => void;
  setCheckValue: (e: boolean) => void;
}

const { height } = Dimensions.get("screen");

const ResultNavigation: FC<PropsType> = ({
  inputValue,
  setInputValue,
  setCheckValue,
}) => {
  const navigation = useMainStackNavigation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchMutation = useSearchMutation();

  const Search = useCallback(async () => {
    const response = await searchMutation.mutateAsync(inputValue);

    return response;
  }, [inputValue]);

  const pressHandler = useCallback(
    (title: string) => {
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
      <S.Wrapper height={height - 200}>
        {inputValue ? (
          <S.ValueMappingContainer bounces={false} bouncesZoom={false}>
            {searchMutation.data?.data.data.length > 0 ? (
              <S.ResultViewTitle>추천 검색어</S.ResultViewTitle>
            ) : null}
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
        ) : (
          <S.DefaultContainerView height={height / 1.44}>
            <S.DefaultContainer>
              검색을 통해 질문을 찾아보세요.
            </S.DefaultContainer>
          </S.DefaultContainerView>
        )}
      </S.Wrapper>
    </>
  );
};

export default ResultNavigation;
