import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MainStackParamList = {
  Main: undefined;
  StackedQuestionList: undefined;
};

type screenProp = StackNavigationProp<MainStackParamList>;

const useMainStackNavigation = () => useNavigation<screenProp>();

export default useMainStackNavigation;
