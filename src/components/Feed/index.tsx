import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import Content from "./Content";
import * as S from "./styles";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";

const { height } = Dimensions.get("screen");

const Feed = () => {
  const [page, setPage] = useState(0);

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <S.Container
      decelerationRate="fast"
      snapToAlignment="start"
      pagingEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      snapToInterval={height}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      data={[1, 2, 3, 4]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => <Content />}
    />
  );
};

export default Feed;
