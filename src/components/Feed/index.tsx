import Content from "../FeedContent";
import * as S from "./styles";
import {
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CommentBottomSheet from "components/BottomSheets/Comments";

const { height } = Dimensions.get("screen");

const Feed = () => {
  const [page, setPage] = useState(0);
  const commentBottomSheetRef = useRef<RBSheet>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.y / height);
    setPage(newPage);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <Fragment>
      <S.Container
        style={{ height }}
        decelerationRate="fast"
        snapToAlignment="start"
        pagingEnabled
        contentContainerStyle={{ flexGrow: 1 }}
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        keyExtractor={(_, index) => index.toString()}
        data={[1, 2, 3, 4]}
        renderItem={() => (
          <Content
            openCommentBottomSheet={() => {
              commentBottomSheetRef.current?.open();
            }}
          />
        )}
      />
      <CommentBottomSheet ref={commentBottomSheetRef} />
    </Fragment>
  );
};

export default Feed;
