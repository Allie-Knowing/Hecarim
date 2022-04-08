import { searchTitle } from "constance/search";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as S from "./style";

const questionImage = require("../../../../../assets/feed_test.jpg");

const { width } = Dimensions.get("screen");

interface PropsType {
  item: searchTitle;
  moveQuestionStack: () => void;
}

const Results: FC<PropsType> = ({ item, moveQuestionStack }) => {
  return (
    <TouchableOpacity onPress={() => moveQuestionStack()}>
      <S.SearchedResults
        source={item.thumbnail ? { uri: item.thumbnail } : questionImage}
        imageWidth={width / 2 - 30}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default Results;
