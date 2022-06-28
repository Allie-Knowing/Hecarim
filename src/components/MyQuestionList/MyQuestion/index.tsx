import { ProfileQuestion } from "api/Profile";
import React, { FC } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import * as S from "./style";
import heart from "assets/icons/heart.png";
import play from "assets/icons/playborder.png";
import { reduceNumberLength } from "utils/number";

const { width } = Dimensions.get("screen");

type Props = {
  question: ProfileQuestion;
  moveQuestionStack: () => void;
};

const MyQuestion: FC<Props> = ({ question, moveQuestionStack }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => moveQuestionStack()}>
      {question.thumbnail ? (
        <S.Question imageWidth={width / 2 - 30}>
          <S.QuestionImage source={{ uri: question.thumbnail }} resizeMode="cover" />
          <S.QuestionInformation>
            <S.QuestionInformationIcon source={play} />
            <S.QuestionInformationText>
              {(() => {
                return reduceNumberLength(question.views);
              })()}
            </S.QuestionInformationText>
            <S.QuestionInformationIcon source={heart} />
            <S.QuestionInformationText>
              {reduceNumberLength(question.like_cnt)}
            </S.QuestionInformationText>
          </S.QuestionInformation>
        </S.Question>
      ) : (
        <S.DefaultQuestion imageWidth={width / 2 - 30}>
          <S.QuestionInformation>
            <S.QuestionInformationIcon source={play} />
            <S.QuestionInformationText>
              {reduceNumberLength(question.views)}
            </S.QuestionInformationText>
            <S.QuestionInformationIcon source={heart} />
            <S.QuestionInformationText>
              {reduceNumberLength(question.like_cnt)}
            </S.QuestionInformationText>
          </S.QuestionInformation>
        </S.DefaultQuestion>
      )}
    </TouchableOpacity>
  );
};

export default MyQuestion;
