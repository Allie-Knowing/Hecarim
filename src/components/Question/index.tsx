import { FC } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import CameraComponent from "./Camera";
import VideoDetail from "./VideoDetail";
import CameraProvider from "../../context/CameraContext";

export type RootStackParamList = {
  CameraPage: undefined;
  CameraDetailPage: undefined;
};

const Camera: FC = (): JSX.Element => {
  const Root = createStackNavigator<RootStackParamList>();
  return (
    <CameraProvider>
      <Root.Navigator
        initialRouteName="CameraPage"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      >
        <Root.Screen name="CameraPage" component={CameraComponent} />
        <Root.Screen name="CameraDetailPage" component={VideoDetail} />
      </Root.Navigator>
    </CameraProvider>
  );
};

export default Camera;
