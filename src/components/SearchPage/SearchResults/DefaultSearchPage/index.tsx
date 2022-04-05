import React, { FC } from "react";
import {
  Dimensions,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "hooks/useSearchStackNavigation";
import { searchPayload } from "constance/search";
import * as S from "./style";
import { searchTitleResponse } from "modules/dto/response/searchResponse";
import SearchTopNavigation from "components/SearchPage/SearchTopNavigation";

const { height } = Dimensions.get("screen");

interface Props {
  searchTitle: searchTitleResponse;
  getAutoComplete: (payload: searchPayload) => void;
}

const DefaultSearchPage: FC<Props> = ({ searchTitle, getAutoComplete }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <SearchTopNavigation
          searchTitle={searchTitle}
          getAutoComplete={getAutoComplete}
        />
        <S.View height={height / 1.44}>
          <S.Text>검색을 통해 질문을 찾아보세요.</S.Text>
        </S.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DefaultSearchPage;
