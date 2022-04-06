import React, {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, LayoutAnimation, View } from "react-native";
import * as S from "./styles";
import { ThemeContext } from "styled-components/native";
import formattedNumber from "constant/formattedNumber";
import CommentBottomSheet from "components/BottomSheets/Comments";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import Tool, { ToolItem } from "components/BottomSheets/Tool";
import { Portal } from "react-native-portalize";
import isStackContext from "context/IsStackContext";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import { Question } from "api/Question";
import { useLikeMutation } from "../../queries/Like";
import { Video } from "expo-av";
import { useQuestionHashtag, useQuestionDetail } from "queries/Question";
import axios from "axios";
import { error } from "console";

const Heart = require("../../assets/icons/heart.png");
const Comment = require("../../assets/icons/comment.png");
const More = require("../../assets/icons/more.png");
const Camera = require("../../assets/icons/camera.png");

const { height } = Dimensions.get("screen");

interface PropsType {
  isCurrentPage: boolean;
}

const dateToString = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const FeedContent: FC<Question & PropsType> = ({
  id,
  video_url,
  title,
  comment_cnt,
  created_at,
  description,
  is_like,
  is_mine,
  like_cnt,
  profile,
  user_id,
  isCurrentPage,
}) => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);
  const commentBottomSheetRef = useRef<BottomSheet>(null);
  const toolSheetRef = useRef<BottomSheetModal>(null);
  const reportSheetRef = useRef<BottomSheetModal>(null);
  const confirmSheetRef = useRef<BottomSheetModal>(null);
  const isStack = useContext(isStackContext);
  const tabBarHeight = isStack ? 30 : 80;
  const navigation = useMainStackNavigation();
  const { like, unLike } = useLikeMutation(id);
  const { isLoading, refetch, data } = useQuestionDetail(id);
  const videoRef = useRef<Video>(null);

  const isLike = useMemo(() => data?.data.data.is_like || is_like, [data]);
  const likeCnt = useMemo(() => data?.data.data.like_cnt || like_cnt, [data]);

  const isLikeLoading = useMemo(
    () => like.isLoading || unLike.isLoading || isLoading,
    [like.isLoading, unLike.isLoading, isLoading]
  );

  const onMorePress = () => {
    LayoutAnimation.easeInEaseOut();
    setIsMore(!isMore);
  };

  const onReportPress = useCallback(
    () => () => {
      confirmSheetRef.current.present();
    },
    []
  );

  const onLikePress = useCallback(async () => {
    if (isLikeLoading) {
      return;
    }

    if (!isLike) {
      await like.mutateAsync();
    } else {
      await unLike.mutateAsync();
    }

    await refetch();
  }, [isLikeLoading, isLike, like, unLike]);

  const items: ToolItem[] = useMemo(
    () =>
      is_mine
        ? [
            {
              color: themeContext.colors.red.default,
              onPress: () => {},
              text: "삭제하기",
            },
          ]
        : [
            {
              color: themeContext.colors.red.default,
              onPress: () => {
                reportSheetRef.current.present();
              },
              text: "신고하기",
            },
          ],
    [themeContext]
  );

  const reportItems: ToolItem[] = useMemo(
    () => [
      {
        color: themeContext.colors.grayscale.scale100,
        onPress: onReportPress(),
        text: "스팸",
      },
      {
        color: themeContext.colors.grayscale.scale100,
        onPress: onReportPress(),
        text: "음란물 또는 불법촬영물",
      },
      {
        color: themeContext.colors.grayscale.scale100,
        onPress: onReportPress(),
        text: "괴롭힘 또는 따돌림",
      },
      {
        color: themeContext.colors.grayscale.scale100,
        onPress: onReportPress(),
        text: "욕설 및 비방",
      },
      {
        color: themeContext.colors.grayscale.scale100,
        onPress: onReportPress(),
        text: "명예회손 또는 저작권 침해",
      },
      {
        color: themeContext.colors.grayscale.scale100,
        onPress: onReportPress(),
        text: "기타 사유",
      },
    ],
    [onReportPress, themeContext]
  );

  const comfirmItems: ToolItem[] = useMemo(
    () => [
      {
        color: themeContext.colors.red.default,
        onPress: () => {},
        text: "신고 제출하기",
      },
      {
        color: themeContext.colors.grayscale.scale100,
        onPress: () => confirmSheetRef.current.dismiss(),
        text: "취소하기",
      },
    ],
    [themeContext]
  );

  useEffect(() => {
    if (isCurrentPage) {
      videoRef.current.playAsync();
    } else {
      videoRef.current.pauseAsync();
    }
  }, [isCurrentPage]);

  return (
    <Fragment>
      <S.Container style={{ height }}>
        <S.Video
          source={{ uri: video_url }}
          isLooping
          resizeMode="cover"
          ref={videoRef}
        />
        <S.BackBlack
          colors={["transparent", themeContext.colors.grayscale.scale100]}
          style={{ height: `${isMore ? 50 : 0}%` }}
        />
        <S.Content style={{ paddingBottom: tabBarHeight + 30 }}>
          <S.InfoOuter onPress={onMorePress}>
            <S.InfoContainer>
              <S.TitleContainer>
                <View>
                  <S.Q>Q.&nbsp;</S.Q>
                </View>
                <S.Title>{title}</S.Title>
              </S.TitleContainer>
              {isMore && (
                <S.Description>
                  {dateToString(new Date(created_at))}
                </S.Description>
              )}
              <S.Description numberOfLines={isMore ? undefined : 1}>
                {description}
              </S.Description>
              {isMore && <Hashtag id={id} />}
            </S.InfoContainer>
          </S.InfoOuter>
          <View>
            <S.Icons>
              <S.IconContainer>
                <S.ProfileImage source={{ uri: profile }} />
              </S.IconContainer>
              <S.IconContainer
                onPress={() => {
                  navigation.navigate("StackedQuestionList");
                }}
              >
                <S.Icon resizeMode="contain" source={Camera} />
                <S.IconLabel>답변하기</S.IconLabel>
              </S.IconContainer>
              <S.IconContainer onPress={onLikePress}>
                <Fragment>
                  <S.Icon
                    style={{
                      tintColor: isLike
                        ? themeContext.colors.primary.default
                        : themeContext.colors.grayscale.scale10,
                    }}
                    resizeMode="contain"
                    source={Heart}
                  />
                  <S.IconLabel
                    style={{
                      color: isLike
                        ? themeContext.colors.primary.default
                        : themeContext.colors.grayscale.scale10,
                    }}
                  >
                    {formattedNumber(likeCnt)}
                  </S.IconLabel>
                </Fragment>
              </S.IconContainer>
              <S.IconContainer
                onPress={() => commentBottomSheetRef.current?.snapToIndex(0)}
              >
                <S.Icon resizeMode="contain" source={Comment} />
                <S.IconLabel>{formattedNumber(comment_cnt)}</S.IconLabel>
              </S.IconContainer>
              <S.IconContainer
                onPress={() => {
                  toolSheetRef.current?.present();
                }}
              >
                <S.Icon resizeMode="contain" source={More} />
              </S.IconContainer>
            </S.Icons>
          </View>
        </S.Content>
      </S.Container>
      <Portal>
        <CommentBottomSheet
          navigation={navigation}
          ref={commentBottomSheetRef}
          questionId={id}
        />
        <Tool ref={toolSheetRef} items={items} />
        <Tool ref={reportSheetRef} items={reportItems} />
        <Tool ref={confirmSheetRef} items={comfirmItems} />
      </Portal>
    </Fragment>
  );
};

interface HashtagProps {
  id: number;
}

const Hashtag: FC<HashtagProps> = ({ id }) => {
  const { data, isLoading, isError, error } = useQuestionHashtag(id);

  const hashtags = useMemo(() => data?.data.data || [], []);

  if (isLoading) {
    return <S.Description>해쉬태그 로딩 중...</S.Description>;
  }

  if (isError && axios.isAxiosError(error) && error.response.status === 404) {
    return <S.Description>해쉬태그가 없습니다.</S.Description>;
  }

  if (isError) {
    return <S.Description>해쉬태그를 가져오는 중 오류 발생</S.Description>;
  }

  return (
    <Fragment>
      <S.HashTag>
        {hashtags.map((value) => `#${value.title}`).join(" ")}
      </S.HashTag>
    </Fragment>
  );
};

export default FeedContent;
