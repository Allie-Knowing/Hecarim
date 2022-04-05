import React, { FC } from "react";
import * as S from "./style";
import { searchPayload } from "constance/search";
import { searchTitleResponse } from "modules/dto/response/searchResponse";
import themeContext from "hooks/useThemeContext";
import { useRef } from "react";
import { useCallback } from "react";

interface Props {
  searchTitle: searchTitleResponse;
  getAutoComplete: (payload: searchPayload) => void;
  topPad: number;
}

const Magnify = require("../../../../assets/icons/Search/Vector.png");
const ResetText = require("../../../../assets/icons/Search/Reset_text.png");

const InputNavigation: FC<Props> = ({
  searchTitle,
  getAutoComplete,
  topPad,
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [checkValue, setCheckValue] = React.useState<boolean>(false);
  const theme = themeContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ResetInputValue = () => {
    setInputValue("");
  };

  const InputHandler = useCallback((e) => {
    const { text } = e.nativeEvent;
    setInputValue(text);
  }, []);

  const search = useCallback(() => {
    //do search
    console.log("a", inputValue);
    getAutoComplete({ q: inputValue });
  }, [getAutoComplete, inputValue]);

  React.useEffect(() => {
    if (inputValue.length > 0) {
      // 검색 값이 있는 경우 300ms 뒤에 search 메소드르 실행한다.
      if (timeoutRef.current) {
        //이미 검색을 하려고 대기중이면 timeout을 멈춘다.
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(search, 300);
      return setCheckValue(true);
    } else {
      if (timeoutRef.current) {
        //검색 값이 없고 검색을 하려고 대기중이면 검색 대기중인 timeout을 멈춘다.
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
    return setCheckValue(false);
  }, [inputValue, search]);

  return (
    <S.Wrapper topPad={topPad}>
      <S.MagnifyImage source={Magnify} />
      <S.Input
        topPad={topPad}
        value={inputValue}
        onChange={InputHandler}
        placeholder="해쉬태그를 입력해주세요..."
        placeholderTextColor={theme.colors.grayscale.scale50}
      />
      {checkValue && (
        <S.ResetImageContainer onPress={ResetInputValue}>
          <S.ResetTextImage source={ResetText} />
        </S.ResetImageContainer>
      )}
    </S.Wrapper>
  );
};

export default InputNavigation;
