import { ProfileQuestionType } from "modules/dto/response/getProfileQuestionListResponse";
import React, { FC } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import * as S from "./style";

const questionImage = require("../../../assets/feed_test.jpg");

const { width } = Dimensions.get("screen");

type Props = {
  question: ProfileQuestionType;
};

const MyQuestion: FC<Props> = ({ question }) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <S.Question
        source={
          question?.thumbnail ? { uri: question.thumbnail } : questionImage
        }
        imageWidth={width / 2 - 30}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default MyQuestion;
