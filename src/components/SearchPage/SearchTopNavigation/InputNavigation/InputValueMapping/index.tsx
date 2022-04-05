import React, { FC } from "react";
import * as S from "./style";
import { searchTitle } from "modules/dto/response/searchResponse";

interface Props {
  value: searchTitle;
}

export const InputValueMapping: FC<Props> = ({ value }) => {
  return (
    <>
      <S.ResultContainer>
        <S.ResultElement></S.ResultElement>
      </S.ResultContainer>
    </>
  );
};
