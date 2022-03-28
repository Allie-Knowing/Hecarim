import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import * as S from "./style";
import { useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  AnimateStyle,
  useAnimatedScrollHandler,
  useAnimatedRef,
  scrollTo,
  useDerivedValue,
} from "react-native-reanimated";
import { LayoutChangeEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback } from "react";

const { height, width } = Dimensions.get("screen");
const navGap = 24;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Search = () => {
  return <S.Wrapper></S.Wrapper>;
};

const styles = StyleSheet.create({
  outer: {
    position: "relative",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    flex: 1,
  },
});

export default Search;
