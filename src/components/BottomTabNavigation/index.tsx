import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import React, { useContext } from "react";
import { Image, Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import Icon from "./Icon";

const FeedIcon = require("../../assets/icons/navigation/feed.svg");
const MyPageIcon = require("../../assets/icons/navigation/mypage.svg");
const SearchIcon = require("../../assets/icons/navigation/search.svg");
const WalletIcon = require("../../assets/icons/navigation/wallet.svg");

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
    component: () => <Text>feed</Text>,
  },
  {
    name: "search",
    label: "검색",
    icon: SearchIcon,
    component: () => <Text>search</Text>,
  },
  {
    name: "mypage",
    label: "MY",
    icon: MyPageIcon,
    component: () => <Text>mypage</Text>,
  },
  {
    name: "wallet",
    label: "지갑",
    icon: WalletIcon,
    component: () => <Text>wallet</Text>,
  },
];

const BottomTabNavigation = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: "50px",
          width: "100%",
          backgroundColor: themeContext.colors.grayscale.scale10,
          justifyContent: "center",
          borderTopWidth: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      }}
    >
      {screens.map((value) => (
        <Tab.Screen
          name={value.name}
          options={({ route }) => ({
            tabBarIcon: Icon(route.name, value.icon, value.label),
            tabBarShowLabel: false,
          })}
          component={value.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
