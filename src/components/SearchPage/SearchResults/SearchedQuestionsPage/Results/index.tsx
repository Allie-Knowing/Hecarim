import React, { FC } from "react";
import { Dimensions } from "react-native";
import * as S from "./style";

const questionImage = require("../../../../../assets/feed_test.jpg");

const { width } = Dimensions.get("screen");

const Results: FC = () => {
  return (
    <S.SearchedResults
      source={questionImage}
      imageWidth={width / 2 - 30}
      resizeMode="contain"
    />
  );
};

export default Results;
