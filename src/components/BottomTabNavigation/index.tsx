import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "components/Feed";
import React, { useContext } from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeContext } from "styled-components/native";
import Icon from "./Icon";

const FeedIcon = require("../../assets/icons/navigation/feed.png");
const MyPageIcon = require("../../assets/icons/navigation/mypage.png");
const SearchIcon = require("../../assets/icons/navigation/search.png");
const QuestionIcon = require("../../assets/icons/navigation/question.png");

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
  const [pressName, setPressName] = useState<string>("feed");

  return (
    <Tab.Navigator
      screenListeners={{}}
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          height: 50 + bottomPad,
          width: width,
          backgroundColor:
            pressName === "feed"
              ? "#00000000"
              : themeContext.colors.grayscale.scale10,
          borderTopWidth: 0,
          shadowOpacity: 0,
          paddingTop: 6,
          paddingBottom: bottomPad,
        },
        headerShown: false,
      }}
    >
      {screens.map((value) => (
        <Tab.Screen
          key={`${value}_screen`}
          name={value.name}
          listeners={{
            tabPress: () => setPressName(value.name),
          }}
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
