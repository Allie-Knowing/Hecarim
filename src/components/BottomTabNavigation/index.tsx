import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import React, { useContext } from "react";
import { Image, Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import Icon from "./Icon";

const Tab = createBottomTabNavigator();

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
        tabBarIcon: Icon(route.name),
      })}
    >
      <Tab.Screen
        name="feed"
        options={{ tabBarShowLabel: false }}
        component={() => <Text>feed</Text>}
      />
      <Tab.Screen
        name="mypage"
        options={{ tabBarShowLabel: false }}
        component={() => <Text>mypage</Text>}
      />
      <Tab.Screen
        name="search"
        options={{ tabBarShowLabel: false }}
        component={() => <Text>search</Text>}
      />
      <Tab.Screen
        name="wallet"
        options={{ tabBarShowLabel: false }}
        component={() => <Text>wallet</Text>}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
