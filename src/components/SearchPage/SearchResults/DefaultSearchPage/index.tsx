import React, { FC } from "react";
import {
  Dimensions,
  Button,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "screens/Search";
import * as S from "./style";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";

const { height } = Dimensions.get("screen");

type screenProp = StackNavigationProp<RootStackParamList, "SearchedQuestions">;

const DefaultSearchPage: FC = () => {
  const navigation = useNavigation<screenProp>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <SearchTopNavigation />
        <S.View height={height / 1.44}>
          <S.Text>검색을 통해 질문을 찾아보세요.</S.Text>
          <Button
            title="Go"
            onPress={() => navigation.navigate("SearchedQuestions")}
          />
        </S.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DefaultSearchPage;
