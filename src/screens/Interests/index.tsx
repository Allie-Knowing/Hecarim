import InterestsHeader from "components/Header/Interests";
import InterestsContent from "components/InterestsContent";
import React, { FC } from "react";
import * as S from "./style";

const Interests: FC = () => {
  return (
    <S.InterestsContainer>
      <InterestsHeader />
      <InterestsContent />
    </S.InterestsContainer>
  );
};

export default Interests;
