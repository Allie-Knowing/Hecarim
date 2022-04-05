import React, { FC } from "react";
import * as S from "./style";
import { searchTitle } from "modules/dto/response/searchResponse";

interface Props {
  value: searchTitle;
}

const InputValueMapping: FC<Props> = ({ value }) => {
  return (
    <>
      <S.ResultContainer>
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
