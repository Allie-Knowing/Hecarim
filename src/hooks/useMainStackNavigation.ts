import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { searchTitle } from "modules/dto/response/searchResponse";

export interface StackedQuestionListProps {
  data: string[];
  index: number;
}

export interface StackedSearchQuestionProps {
  title: string;
}

export type MainStackParamList = {
  Main: undefined;
  SearchedQuestionsPage: StackedSearchQuestionProps;
  StackedQuestionList: StackedQuestionListProps;
  Login: undefined;
  UserPage: { userId: number };
  Setting: undefined;
};

type screenProp = StackNavigationProp<MainStackParamList>;

const useMainStackNavigation = () => useNavigation<screenProp>();

export default useMainStackNavigation;
