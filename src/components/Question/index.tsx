import { FC } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import CameraComponent from "./Camera";
import VideoDetail from "./VideoDetail";

export type RootStackParamList = {
  CameraPage: undefined;
  VideoDetailPage: undefined;
};

const Question: FC = (): JSX.Element => {
  const Root = createStackNavigator<RootStackParamList>();
  return (
    <Root.Navigator
      initialRouteName="CameraPage"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      <Root.Screen name="CameraPage" component={CameraComponent} />
      <Root.Screen name="VideoDetailPage" component={VideoDetail} />
    </Root.Navigator>
  );
};

export default Question;
