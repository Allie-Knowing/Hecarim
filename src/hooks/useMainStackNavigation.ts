import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface StackedQuestionListProps {
  data: string[];
  index: number;
}

export type MainStackParamList = {
  Main: undefined;
  StackedQuestionList: StackedQuestionListProps;
  Login: undefined;
  UserPage: { userId: number };
  Setting: undefined;
};

type screenProp = StackNavigationProp<MainStackParamList>;

const useMainStackNavigation = () => useNavigation<screenProp>();

export default useMainStackNavigation;
