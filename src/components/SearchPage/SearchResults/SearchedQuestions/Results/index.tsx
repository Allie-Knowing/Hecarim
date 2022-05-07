import { searchTitle } from "constance/search";
import React, { FC } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as S from "./style";

const { width } = Dimensions.get("screen");

interface PropsType {
  item: searchTitle;
  moveQuestionStack: () => void;
}

const Results: FC<PropsType> = ({ item, moveQuestionStack }) => {
  return (
    <TouchableOpacity onPress={() => moveQuestionStack()}>
      {item.thumbnail ? (
        <S.SearchedResults
          source={{ uri: item.thumbnail }}
          imageWidth={width / 2 - 30}
          resizeMode="cover"
        />
      ) : (
        <S.DefaultQuestion imageWidth={width / 2 - 30} />
      )}
    </TouchableOpacity>
  );
};

export default Results;
