import { FC } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import CameraComponent from "./Camera";
import CameraProvider from "context/CameraContext";
import isStackContext from "context/IsStackContext";
import CameraDetail from "./CameraDetail";

export type RootStackParamList = {
  Camera: undefined;
  CameraDetail: undefined;
};

const Root = createStackNavigator<RootStackParamList>();

const Camera: FC = (): JSX.Element => {
  return (
    <isStackContext.Provider value={false}>
      <CameraProvider>
        <Root.Navigator
          initialRouteName="Camera"
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: false,
          }}
        >
          <Root.Screen name="Camera" component={CameraComponent} />
          <Root.Screen name="CameraDetail" component={CameraDetail} />
        </Root.Navigator>
      </CameraProvider>
    </isStackContext.Provider>
  );
};

export default Camera;
