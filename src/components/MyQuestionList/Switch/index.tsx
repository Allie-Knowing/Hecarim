import React, { FC } from "react";
import theme from "theme/theme";
import * as S from "./style";

type Props = {
  isLeft: boolean;
  setIsLeft: React.Dispatch<React.SetStateAction<boolean>>;
};

const Switch: FC<Props> = ({ isLeft, setIsLeft }) => {
  return (
    <S.SwitchButton
      activeOpacity={1}
      onPress={() => {
        setIsLeft(!isLeft);
      }}
    >
      <S.SwitchTextContainer>
        <S.SwitchText
          style={
            isLeft && {
              backgroundColor: theme.colors.primary.default,
            }
          }
        >
          <S.SwitchFont
            style={
              isLeft
                ? {
                    color: theme.colors.grayscale.scale10,
                  }
                : {
                    color: theme.colors.grayscale.scale50,
                  }
            }
          >
            나의 질문
          </S.SwitchFont>
        </S.SwitchText>
        <S.SwitchText
          style={
            !isLeft && {
              backgroundColor: theme.colors.primary.default,
            }
          }
        >
          <S.SwitchFont
            style={
              isLeft
                ? {
                    color: theme.colors.grayscale.scale50,
                  }
                : {
                    color: theme.colors.grayscale.scale10,
                  }
            }
          >
            나의 답변
          </S.SwitchFont>
        </S.SwitchText>
      </S.SwitchTextContainer>
    </S.SwitchButton>
  );
};

export default Switch;
