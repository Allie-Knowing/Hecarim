import React, {
  FC,
  Fragment,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, LayoutAnimation, Platform, View } from "react-native";
import * as S from "./styles";
import { ThemeContext } from "styled-components/native";
import formattedNumber from "constant/formattedNumber";
import CommentBottomSheet from "components/BottomSheets/Comments";
import BottomSheet, { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import Tool, { ToolItem } from "components/BottomSheets/Tool";
import { Portal } from "react-native-portalize";
import isStackContext from "context/IsStackContext";
import useMainStackNavigation from "hooks/useMainStackNavigation";
import { Question } from "api/Question";
import { useLikeMutation } from "../../queries/Like";
import { AVPlaybackStatus, Video } from "expo-av";
import { useQuestionHashtag, useQuestionDetail, useQuestionMutation } from "queries/Question";
import axios from "axios";
import { useQueryClient } from "react-query";
import queryKeys from "constant/queryKeys";
import useAlert from "hooks/useAlert";
import { useVideoMutation } from "queries/Video";

const Heart = require("../../assets/icons/heart.png");
const Comment = require("../../assets/icons/comment.png");
const More = require("../../assets/icons/more.png");
const Camera = require("../../assets/icons/camera.png");
const Play = require("../../assets/play.png");
const defaultProfile = require("assets/profile.png");

const { height } = Dimensions.get("screen");

interface PropsType {
  isCurrentPage: boolean;
  isNextPage: boolean;
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
  is_adoption,
  isNextPage,
}) => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isStop, setIsStop] = useState<boolean>(false);
  const theme = useContext(ThemeContext);
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
  const { remove } = useQuestionMutation();
  const queryClient = useQueryClient();
  const { showAlert, closeAlert } = useAlert();
  const { report } = useVideoMutation(id);
  const descriptionRef = useRef<string>("");
  const { dismissAll } = useBottomSheetModal();

  const isLike = useMemo(() => data?.data.data.is_like || is_like, [data]);
  const likeCnt = useMemo(() => data?.data.data.like_cnt || like_cnt, [data]);

  const isLikeLoading = useMemo(
    () => like.isLoading || unLike.isLoading || isLoading,
    [like.isLoading, unLike.isLoading, isLoading]
  );

  const onMorePress = () => {
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setIsMore(!isMore);
  };

  const onReportPress = useCallback(
    (description: string) => () => {
      descriptionRef.current = description;
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

  const onSubmitPress = useCallback(async () => {
    dismissAll();

    await report.mutateAsync(descriptionRef.current);

    showAlert({
      title: "신고 제출 완료",
      content: `신고가 제출되었습니다.\n사유: '${descriptionRef.current}'`,
      buttons: [
        {
          text: "확인",
          color: "black",
          onPress: (id) => closeAlert(id),
        },
      ],
    });
  }, [id, showAlert, dismissAll, closeAlert]);

  const onDeletePress = useCallback(async () => {
    dismissAll();

    showAlert({
      title: "삭제하시겠습니까?",
      content: "삭제한 질문은\n복구가 불가능합니다.",
      buttons: [
        {
          color: "black",
          text: "취소",
          onPress: (id) => {
            closeAlert(id);
          },
        },
        {
          color: "red",
          text: "삭제",
          onPress: async (alret) => {
            closeAlert(alret);
            await remove.mutateAsync(id);
            queryClient.invalidateQueries(queryKeys.question);
            showAlert({
              title: "삭제 완료",
              content: "질문이 삭제되었습니다.",
              buttons: [
                {
                  text: "확인",
                  color: "black",
                  onPress: (id) => closeAlert(id),
                },
              ],
            });
          },
        },
      ],
    });
  }, [remove, queryClient, id, closeAlert, showAlert, dismissAll]);

  const items: ToolItem[] = useMemo(
    () =>
      is_mine
        ? [
            {
              color: theme.colors.red.default,
              onPress: onDeletePress,
              text: "삭제하기",
            },
          ]
        : [
            {
              color: theme.colors.red.default,
              onPress: () => {
                reportSheetRef.current.present();
              },
              text: "신고하기",
            },
          ],
    [theme, onDeletePress]
  );

  const reportItems: ToolItem[] = useMemo(
    () => [
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("스팸"),
        text: "스팸",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("음란물 또는 불법촬영물"),
        text: "음란물 또는 불법촬영물",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("괴롭힘 또는 따돌림"),
        text: "괴롭힘 또는 따돌림",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("욕설 및 비방"),
        text: "욕설 및 비방",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("명예회손 또는 저작권 침해"),
        text: "명예회손 또는 저작권 침해",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: onReportPress("기타 사유"),
        text: "기타 사유",
      },
    ],
    [onReportPress, theme]
  );

  const comfirmItems: ToolItem[] = useMemo(
    () => [
      {
        color: theme.colors.red.default,
        onPress: onSubmitPress,
        text: "신고 제출하기",
      },
      {
        color: theme.colors.grayscale.scale100,
        onPress: () => dismissAll(),
        text: "취소하기",
      },
    ],
    [theme, onSubmitPress, dismissAll]
  );

  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const onPageChange = useCallback(async () => {
    if (isCurrentPage) {
      await videoRef.current.setStatusAsync({
        shouldPlay: true,
        positionMillis: 0,
        isLooping: true,
      });
    } else {
      await videoRef.current.setStatusAsync({
        shouldPlay: false,
        positionMillis: 0,
        isLooping: true,
      });
    }
  }, [isCurrentPage]);

  const load = useCallback(async () => {
    if (isCurrentPage) {
      const status = await videoRef.current.getStatusAsync();

      if (!status.isLoaded && !isLoad) {
        setIsLoad(true);
        await videoRef.current.loadAsync({ uri: video_url });
        console.log(video_url);
      }
    }
  }, [isCurrentPage, video_url, isLoad]);

  const changeVideoState = useCallback(async () => {
    const status = await videoRef.current.getStatusAsync();

    if (status.isLoaded && status.shouldPlay) {
      await videoRef.current.pauseAsync();
    } else if (status.isLoaded) {
      await videoRef.current.playAsync();
    }
  }, [isStop]);

  useEffect(() => {
    load();
    onPageChange();
  }, [onPageChange, load]);

  const onPlaybackStatusUpdate = useCallback((e: AVPlaybackStatus) => {
    setVideoStatus(e);
  }, []);

  return (
    <Fragment>
      <S.Container style={{ height }} onPress={changeVideoState} activeOpacity={1}>
        {videoStatus && videoStatus.isLoaded && !videoStatus.shouldPlay && (
          <S.VideoStateIcon source={Play} />
        )}
        <S.Video
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          isLooping
          resizeMode="cover"
          ref={videoRef}
          rate={1.0}
          volume={1.0}
          style={{ backgroundColor: theme.colors.grayscale.scale100 }}
          onLoad={() => console.log(id, "load end")}
          onLoadStart={() => console.log(id, "load start")}
        />
        <S.BackBlack
          colors={["transparent", theme.colors.grayscale.scale100]}
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
              {isMore && <S.Description>{dateToString(new Date(created_at))}</S.Description>}
              <S.Description numberOfLines={isMore ? undefined : 1}>{description}</S.Description>
              {isMore && <Hashtag id={id} />}
            </S.InfoContainer>
          </S.InfoOuter>
          <View>
            <S.Icons>
              <S.IconContainer
                onPress={() => {
                  videoRef.current.pauseAsync();
                  setIsStop(true);
                  navigation.push("UserPage", { userId: user_id });
                }}
              >
                <S.ProfileImage source={profile ? { uri: profile } : defaultProfile} />
              </S.IconContainer>
              <S.IconContainer
                onPress={() => {
                  videoRef.current.pauseAsync();
                  setIsStop(true);
                  navigation.navigate("Camera", { questionId: id });
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
                        ? theme.colors.primary.default
                        : theme.colors.grayscale.scale10,
                    }}
                    resizeMode="contain"
                    source={Heart}
                  />
                  <S.IconLabel
                    style={{
                      color: isLike ? theme.colors.primary.default : theme.colors.grayscale.scale10,
                    }}
                  >
                    {formattedNumber(likeCnt)}
                  </S.IconLabel>
                </Fragment>
              </S.IconContainer>
              <S.IconContainer onPress={() => commentBottomSheetRef.current?.snapToIndex(0)}>
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
          isQuestionAdoption={is_adoption === 1}
          navigation={navigation}
          ref={commentBottomSheetRef}
          questionId={id}
          is_mine={is_mine}
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

  const hashtags = useMemo(() => data?.data.data || [], [data]);

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
      <S.HashTag>{hashtags.map((value) => `#${value.title}`).join(" ")}</S.HashTag>
    </Fragment>
  );
};

export default memo(FeedContent);
