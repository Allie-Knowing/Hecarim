import React, { FC } from "react";
import * as S from "./style";
import { searchTitle } from "modules/dto/response/searchResponse";
import { useTheme } from "styled-components/native";

interface Props {
  value: searchTitle;
  pressHandler: (title: string) => void;
}

const InputValueMapping: FC<Props> = ({ value, pressHandler }) => {
  const theme = useTheme();

  return (
    <>
      <S.ResultContainer
        activeOpacity={1}
        underlayColor={theme.colors.grayscale.scale20}
        onPress={() => pressHandler(value.title)}
      >
        <S.ResultInlineBox>
          <S.TitleResult>
            <S.ResultElement>{value.title}</S.ResultElement>
          </S.TitleResult>
        </S.ResultInlineBox>
      </S.ResultContainer>
    </>
  );
};

export default InputValueMapping;
