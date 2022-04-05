import { ProfileQuestionType } from "modules/dto/response/getProfileQuestionListResponse";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import * as S from "./style";

const questionImage = require("../../../assets/feed_test.jpg");

const { width } = Dimensions.get("screen");

type Props = {
  question: ProfileQuestionType;
};

const MyQuestion: FC<Props> = ({ question }) => {
  return (
    <S.Question
      source={questionImage}
      imageWidth={width / 2 - 30}
      resizeMode="contain"
    />
  );
};

export default MyQuestion;
