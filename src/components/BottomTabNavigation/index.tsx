import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "components/Feed";
import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import Icon from "./Icon";

const FeedIcon = require("../../assets/icons/navigation/feed.svg");
const MyPageIcon = require("../../assets/icons/navigation/mypage.svg");
const SearchIcon = require("../../assets/icons/navigation/search.svg");
const QuestionIcon = require("../../assets/icons/navigation/question.svg");

const Tab = createBottomTabNavigator();

interface Screen {
  name: string;
  label: string;
  icon: any;
  component: React.ComponentType<any>;
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
    component: () => <Text>search</Text>,
  },
  {
    name: "question",
    label: "질문",
    icon: QuestionIcon,
    component: () => <Text>question</Text>,
  },
  {
    name: "mypage",
    label: "MY",
    icon: MyPageIcon,
    component: () => <Text>mypage</Text>,
  },
];

const { width } = Dimensions.get("window");

const BottomTabNavigation = () => {
  const themeContext = useContext(ThemeContext);
  const { bottom: bottomPad } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          height: 50 + bottomPad,
          width: width,
          backgroundColor: themeContext.colors.grayscale.scale10,
          borderTopWidth: 0,
          shadowOpacity: 0,
          paddingBottom: bottomPad,
        },
        headerShown: false,
      }}
    >
      {screens.map((value) => (
        <Tab.Screen
          name={value.name}
          options={{
            tabBarIcon: Icon(value.icon, value.label),
            tabBarShowLabel: false,
          }}
          component={value.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
