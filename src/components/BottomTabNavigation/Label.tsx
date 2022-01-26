import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { FC } from "react";
import * as S from "./styles";

interface LabelPropsType {
  focused: boolean;
  color: string;
  position: LabelPosition;
}

const Label =
  (name: string): FC<LabelPropsType> =>
  ({ focused }) => {
    return <S.Label focused={focused}>{name}</S.Label>;
  };

export default Label;
