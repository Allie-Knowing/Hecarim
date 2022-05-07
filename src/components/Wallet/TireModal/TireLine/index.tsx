import React, { FC } from "react";
import * as S from "./style";

interface Props {
  tire: string;
  selection: string | number;
  iq: string | number;
}

const TireLine: FC<Props> = ({ tire, selection, iq }) => {
  return (
    <S.TableLine isLast={tire === "현인"}>
      <S.TableContent>{tire}</S.TableContent>
      <S.TableContent>{selection}</S.TableContent>
      <S.TableContent>{iq}</S.TableContent>
    </S.TableLine>
  );
};

export default TireLine;
