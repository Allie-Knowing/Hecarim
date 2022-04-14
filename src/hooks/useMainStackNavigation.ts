import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Question } from "api/Question";
import { searchTitle } from "constance/search";

export interface StackedQuestionListProps {
  data: Question[];
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
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  UserPage: { userId: number };
  Setting: undefined;
  Camera: { questionId?: number };
  CameraDetail: { questionId?: number };
};

type screenProp = StackNavigationProp<MainStackParamList>;

const useMainStackNavigation = () => useNavigation<screenProp>();

export default useMainStackNavigation;
