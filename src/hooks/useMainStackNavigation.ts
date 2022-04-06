import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MainStackParamList = {
  Main: undefined;
  StackedQuestionList: undefined;
  Login: undefined;
  UserPage: undefined;
  Setting: undefined;
  CameraPage: undefined;
  CameraDetail: { questionId?: number | undefined };
};

type screenProp = StackNavigationProp<MainStackParamList>;

const useMainStackNavigation = () => useNavigation<screenProp>();

export default useMainStackNavigation;
