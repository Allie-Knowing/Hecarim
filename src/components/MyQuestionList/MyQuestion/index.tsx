import React from "react";
import { Dimensions } from "react-native";
import * as S from "./style";

const questionImage = require("../../../assets/feed_test.jpg");

const { height, width } = Dimensions.get("screen");

const MyQuestion = () => {
  return (
    <S.Question
      source={questionImage}
      imageWidth={width / 2 - 30}
      resizeMode="contain"
    />
  );
};

export default MyQuestion;
