import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import React, { useContext } from "react";
import { Image, Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import Label from "./Label";

const FeedIconDisable = require("../../assets/icons/navigation/feed/deactive.svg");
const MyPageIconDisable = require("../../assets/icons/navigation/mypage/deactive.svg");
const SearchIconDisable = require("../../assets/icons/navigation/search/deactive.svg");
const WalletIconDisable = require("../../assets/icons/navigation/wallet/deactive.svg");

const Tab = createBottomTabNavigator();

const iconMap = new Map<string, any>()
  .set("feed", FeedIconDisable)
  .set("mypage", MyPageIconDisable)
  .set("search", SearchIconDisable)
  .set("wallet", WalletIconDisable);

const BottomTabNavigation = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let tabIcon = iconMap.get(route.name)!;

          return (
            <Image
              source={tabIcon}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
                tintColor: !focused
                  ? themeContext.colors.grayscale.scale30
                  : themeContext.colors.primary.default,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="feed"
        options={{ tabBarLabel: Label("피드") }}
        component={() => <Text>feed</Text>}
      />
      <Tab.Screen
        name="mypage"
        options={{ tabBarLabel: Label("MY") }}
        component={() => <Text>mypage</Text>}
      />
      <Tab.Screen
        name="search"
        options={{ tabBarLabel: Label("검색") }}
        component={() => <Text>search</Text>}
      />
      <Tab.Screen
        name="wallet"
        options={{ tabBarLabel: Label("지갑") }}
        component={() => <Text>wallet</Text>}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
