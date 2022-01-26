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

const iconMap = new Map<string, any>()
  .set("feed", FeedIcon)
  .set("mypage", MyPageIcon)
  .set("search", SearchIcon)
  .set("wallet", WalletIcon);

const labelMap = new Map<string, string>()
  .set("feed", "피드")
  .set("mypage", "MY")
  .set("search", "검색")
  .set("wallet", "지갑");

interface Screen {
  name: string;
  component: React.ComponentType<any>;
}

const screens: Screen[] = [
  {
    name: "feed",
    component: () => <Text>feed</Text>,
  },
  {
    name: "search",
    component: () => <Text>search</Text>,
  },
  {
    name: "mypage",
    component: () => <Text>mypage</Text>,
  },
  {
    name: "wallet",
    component: () => <Text>wallet</Text>,
  },
];

const BottomTabNavigation = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: "50px",
          width: "100%",
          backgroundColor: themeContext.colors.grayscale.scale10,
          justifyContent: "center",
          borderTopWidth: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
        tabBarIcon: Icon(route.name, iconMap, labelMap),
      })}
    >
      {screens.map((value) => (
        <Tab.Screen
          name={value.name}
          options={{ tabBarShowLabel: false }}
          component={value.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
