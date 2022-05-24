import React, { FC } from "react";
import * as S from "./style";

interface Props {
  tier: string;
  selection: string | number;
  iq: string | number;
}

const TierLine: FC<Props> = ({ tier, selection, iq }) => {
  return (
    <S.TableLine>
      <S.TableContent isBold={tier === "티어"}>{tier}</S.TableContent>
      <S.TableContent isBold={tier === "티어"}>{selection}</S.TableContent>
      <S.TableContent isBold={tier === "티어"}>{iq}</S.TableContent>
    </S.TableLine>
  );
};

export default TierLine;
