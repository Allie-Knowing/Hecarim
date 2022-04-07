import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { ProfileQuestionType } from "modules/dto/response/getProfileQuestionListResponse";
import React, { FC } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import * as S from "./style";

const { width } = Dimensions.get("screen");

type Props = {
  question: ProfileQuestionType;
  moveQuestionStack: () => void;
};

const MyQuestion: FC<Props> = ({ question, moveQuestionStack }) => {
  console.log(moveQuestionStack);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => moveQuestionStack()}>
      {question?.thumbnail ? (
        <S.Question
          source={{ uri: question.thumbnail }}
          imageWidth={width / 2 - 30}
          resizeMode="cover"
        />
      ) : (
        <S.DefaultQuestion imageWidth={width / 2 - 30} />
      )}
    </TouchableOpacity>
  );
};

export default MyQuestion;
