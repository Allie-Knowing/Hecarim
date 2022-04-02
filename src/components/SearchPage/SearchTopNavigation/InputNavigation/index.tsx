import React, { FC } from "react";
import * as S from "./style";
import { useTheme } from "styled-components";

interface Props {
  topPad: number;
}

const Magnify = require("../../../../assets/icons/Search/Vector.png");
const ResetText = require("../../../../assets/icons/Search/Reset_text.png");

const InputNavigation: FC<Props> = ({ topPad }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [checkValue, setCheckValue] = React.useState<boolean>(false);
  const theme = useTheme();

  const ResetInputValue = () => {
    setInputValue("");
  };

  React.useEffect(() => {
    if (inputValue.length > 0) {
      return setCheckValue(true);
    }
    return setCheckValue(false);
  }, [inputValue]);

  return (
    <S.Wrapper topPad={topPad}>
      <S.MagnifyImage source={Magnify} />
      <S.Input
        topPad={topPad}
        value={inputValue}
        onChange={(event) => {
          const { text } = event.nativeEvent;
          setInputValue(text);
        }}
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
