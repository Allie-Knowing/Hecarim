import React, { FC } from "react";
import * as S from "./style";

interface Props {
  tier: string;
  selection: string | number;
  iq: string | number;
}

const TierLine: FC<Props> = ({ tier, selection, iq }) => {
  return (
    <S.TableLine isLast={tier === "현인"}>
      <S.TableContent>{tier}</S.TableContent>
      <S.TableContent>{selection}</S.TableContent>
      <S.TableContent>{iq}</S.TableContent>
    </S.TableLine>
  );
};

export default TierLine;
