import React, { FC, useRef, useCallback } from "react";
import * as S from "./style";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "hooks/useSearchStackNavigation";
import themeContext from "hooks/useThemeContext";
import { searchPayload } from "constance/search";
import { searchTitleResponse } from "modules/dto/response/searchResponse";
import { InputValueMapping } from "./InputValueMapping";

interface Props {
  searchTitle: searchTitleResponse;
  getAutoComplete: (payload: searchPayload) => void;
  topPad: number;
}

const Magnify = require("../../../../assets/icons/Search/Vector.png");
const ResetText = require("../../../../assets/icons/Search/Reset_text.png");

type screenProp = StackNavigationProp<RootStackParamList, "SearchedQuestions">;

const InputNavigation: FC<Props> = ({
  searchTitle,
  getAutoComplete,
  topPad,
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [checkValue, setCheckValue] = React.useState<boolean>(false);
  const [toggled, setTggled] = React.useState<boolean>(false);
  const navigation = useNavigation<screenProp>();
  const theme = themeContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ResetInputValue = () => {
    setInputValue("");
  };

  const InputHandler = useCallback((e) => {
    const { text } = e.nativeEvent;
    setInputValue(text);
  }, []);

  const SubmitHandler = () => {
    searchTitle.data.map((value) => {
      if (inputValue === value.title) navigation.navigate("SearchedQuestions");
    });
  };

  const Search = useCallback(() => {
    //do search
    console.log("a", inputValue);
    getAutoComplete({ q: inputValue });
  }, [inputValue]);

  React.useEffect(() => {
    if (inputValue.length > 0) {
      // 검색 값이 있는 경우 300ms 뒤에 search 메소드를 실행한다.
      if (timeoutRef.current) {
        //이미 검색을 하려고 대기중이면 timeout을 멈춘다.
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(Search, 1000);
      return setCheckValue(true);
    } else {
      if (timeoutRef.current) {
        //검색 값이 없고 검색을 하려고 대기중이면 검색 대기중인 timeout을 멈춘다.
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
    return setCheckValue(false);
  }, [inputValue, Search]);

  return (
    <S.Wrapper topPad={topPad}>
      <S.MagnifyImage source={Magnify} />
      <S.Input
        topPad={topPad}
        value={inputValue}
        onChange={InputHandler}
        onSubmitEditing={SubmitHandler}
        placeholder="해쉬태그를 입력해주세요..."
        placeholderTextColor={theme.colors.grayscale.scale50}
      />
      {checkValue && (
        <S.ResetImageContainer onPress={ResetInputValue}>
          <S.ResetTextImage source={ResetText} />
        </S.ResetImageContainer>
      )}
      {searchTitle &&
        searchTitle.data.map((value) => {
          return <InputValueMapping key={value.id} value={value} />;
        })}
    </S.Wrapper>
  );
};

export default InputNavigation;
