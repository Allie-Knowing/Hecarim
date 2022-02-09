import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Content from "./Content";
import * as S from "./styles";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("screen");

const Feed = () => {
  return (
    <S.Container
      decelerationRate="fast"
      snapToAlignment="start"
      pagingEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      snapToInterval={height}
      showsVerticalScrollIndicator={false}
      data={[1, 2, 3, 4]}
      renderItem={() => <Content />}
    />
  );
};

export default Feed;
