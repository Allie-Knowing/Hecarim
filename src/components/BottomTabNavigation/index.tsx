import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { FC, Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import Icon from "./Icon";
import Feed from "screens/Feed";
import MyPage from "screens/MyPage/MyPage";
import Question from "components/Question";
import Search from "screens/Search/DefaultSearchPage";
import storageKeys from "constant/storageKeys";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import localStorage from "utils/localStorage";
import { useQueryClient } from "react-query";
import queryKeys from "constant/queryKeys";

const FeedIcon = require("../../assets/icons/navigation/feed.png");
const MyPageIcon = require("../../assets/icons/navigation/mypage.png");
const SearchIcon = require("../../assets/icons/navigation/search.png");
const QuestionIcon = require("../../assets/icons/navigation/question.png");

const Tab = createBottomTabNavigator();

interface Screen {
  name: string;
  label: string;
  icon: any;
  component: React.FC;
}

const screens: Screen[] = [
  {
    name: "feed",
    label: "피드",
    icon: FeedIcon,
    component: Feed,
  },
  {
    name: "search",
    label: "검색",
    icon: SearchIcon,
    component: Search,
  },
  {
    name: "question",
    label: "질문하기",
    icon: QuestionIcon,
    component: Question,
  },
  {
    name: "mypage",
    label: "MY",
    icon: MyPageIcon,
    component: MyPage,
  },
];

type Props = { navigation: StackNavigationProp<MainStackParamList, "Main"> };

const { width } = Dimensions.get("window");

const BottomTabNavigation: FC<Props> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();
  const [pressName, setPressName] = useState<string>("feed");
  const queryClient = useQueryClient();

  useEffect(() => {
    const loginCheck = async () => {
      if (!(await localStorage.getItem<string>(storageKeys.accessToken))) {
        navigation.reset({ routes: [{ name: "Login" }] });
      }
    };
    loginCheck();
  }, []);

  useEffect(() => {
    if (pressName === "feed") {
      queryClient.invalidateQueries(queryKeys.question);
    }
  }, [pressName, queryClient]);

  return (
    <Fragment>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            height: 50 + bottomPad,
            width: width,
            bottom: 0,
            left: 0,
            backgroundColor:
              pressName === "feed" || pressName === "question"
                ? "transparent"
                : themeContext.colors.grayscale.scale10,
            borderTopWidth: 0,
            shadowOpacity: 0,
            paddingTop: 6,
            paddingBottom: bottomPad,
            zIndex: 2,
            elevation: 2,
          },
          headerShown: false,
          unmountOnBlur: true,
        }}
        initialRouteName="feed"
      >
        {screens.map((value) => (
          <Tab.Screen
            key={`${value.name}_screen`}
            name={value.name}
            listeners={{
              tabPress: () => setPressName(value.name),
            }}
            options={{
              tabBarIcon: Icon(value.icon, value.label, pressName),
              tabBarShowLabel: false,
            }}
            component={value.component}
          />
        ))}
      </Tab.Navigator>
    </Fragment>
  );
};

export default BottomTabNavigation;
