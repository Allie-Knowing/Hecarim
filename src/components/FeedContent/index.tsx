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
import { useQuestionMutation } from "queries/Question";
import { useQueryClient } from "react-query";
import queryKeys from "constant/queryKeys";
import useAlert from "hooks/useAlert";
import { useVideoMutation } from "queries/Video";

import Heart from "../../assets/icons/heart.png";
import Comment from "../../assets/icons/comment.png";
import More from "../../assets/icons/more.png";
import Camera from "../../assets/icons/camera.png";
import Play from "../../assets/play.png";
import defaultProfile from "assets/profile.png";
import ReportModal from "components/BottomSheets/ReportModal";
import HashTag from "components/HashTag";
import useBlock from "hooks/useBlock";
import useDoubleTap from "hooks/useDoubleTap";
import { useViewsMutation } from "queries/Views";

const { height } = Dimensions.get("screen");

interface PropsType {
  isCurrentPage: boolean;
  isNextPage: boolean;
  isFar: boolean;
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
  isFar,
}) => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const theme = useContext(ThemeContext);
  const commentBottomSheetRef = useRef<BottomSheet>(null);
  const toolSheetRef = useRef<BottomSheetModal>(null);
  const reportSheetRef = useRef<BottomSheetModal>(null);
  const isStack = useContext(isStackContext);
  const tabBarHeight = isStack ? 30 : 80;
  const navigation = useMainStackNavigation();
  const { like, unLike } = useLikeMutation(id);
  const videoRef = useRef<Video>(null);
  const { remove } = useQuestionMutation();
  const queryClient = useQueryClient();
  const { showAlert, closeAlert } = useAlert();
  const { report } = useVideoMutation(id);
  const { dismissAll } = useBottomSheetModal();
  const { onBlockPress } = useBlock(id);
  const [isLike, setIsLike] = useState<boolean>(is_like);
  const views = useViewsMutation(id);

  const onMorePress = () => {
    if (Platform.OS === "ios") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setIsMore(!isMore);
  };

  const onReport = useCallback(
    async (description: string) => {
      await report.mutateAsync(description);
    },
    [report]
  );

  const likeTimeout = useRef<NodeJS.Timeout | null>(null);

  const onLikePress = useCallback(async () => {
    if (likeTimeout.current) {
      clearTimeout(likeTimeout.current);
      likeTimeout.current = null;
    }

    if (!isLike) {
      setIsLike(true);
      likeTimeout.current = setTimeout(() => {
        like.mutateAsync();
        likeTimeout.current = null;
      }, 1000);
    } else {
      setIsLike(false);
      likeTimeout.current = setTimeout(() => {
        unLike.mutateAsync();
        likeTimeout.current = null;
      }, 1000);
    }
  }, [isLike, like, unLike]);

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

  const items: ToolItem[] = useMemo(() => {
    const item: ToolItem[] = [];
    if (is_mine) {
      item.push({
        color: theme.colors.red.default,
        onPress: onDeletePress,
        text: "삭제하기",
      });
    } else {
      item.push(
        {
          color: theme.colors.red.default,
          onPress: () => {
            reportSheetRef.current.present();
          },
          text: "신고하기",
        },
        {
          text: "차단하기",
          color: theme.colors.red.default,
          onPress: () => {
            dismissAll();
            onBlockPress();
          },
        }
      );
    }

    return item;
  }, [is_mine, theme.colors.red.default, onDeletePress, dismissAll, onBlockPress]);

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
    if (isCurrentPage || isNextPage) {
      const status = await videoRef.current.getStatusAsync();

      if (!status.isLoaded && !isLoad) {
        setIsLoad(true);
        await videoRef.current.loadAsync({
          uri: video_url,
          overrideFileExtensionAndroid: "m3u8",
        });
      }
    }
  }, [isCurrentPage, isNextPage, isLoad, video_url]);

  const changeVideoState = useCallback(async () => {
    const status = await videoRef.current.getStatusAsync();

    if (status.isLoaded && status.shouldPlay) {
      await videoRef.current.pauseAsync();
    } else if (status.isLoaded) {
      await videoRef.current.playAsync();
    }
  }, []);

  const onCommetProfilePress = useCallback(async () => {
    await videoRef.current?.pauseAsync();
    commentBottomSheetRef.current?.close();
  }, []);

  useEffect(() => {
    load();
    onPageChange();
  }, [onPageChange, load]);

  const onPlaybackStatusUpdate = useCallback((e: AVPlaybackStatus) => {
    setVideoStatus(e);
  }, []);

  const unLoad = useCallback(async () => {
    const status = await videoRef.current.getStatusAsync();

    if (status.isLoaded && isFar) {
      videoRef.current.unloadAsync();
      setIsLoad(false);
    }
  }, [isFar]);

  useEffect(() => {
    unLoad();
  }, [unLoad]);

  const onlyLike = () => {
    if (!isLike) {
      setIsLike(true);
      like.mutate();
    }
  };

  useEffect(() => {
    if (isCurrentPage) {
      views.mutateAsync();
    }
  }, [isCurrentPage]);

  const onScreenPress = useDoubleTap(200, changeVideoState, onlyLike);

  return (
    <Fragment>
      <S.Container style={{ height }} onPress={onScreenPress} activeOpacity={1}>
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
          shouldPlay={false}
          style={{ backgroundColor: theme.colors.grayscale.scale100 }}
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
              {isMore && <HashTag id={id} />}
            </S.InfoContainer>
          </S.InfoOuter>
          <View>
            <S.Icons>
              <S.IconContainer
                onPress={() => {
                  videoRef.current.pauseAsync();
                  navigation.push("UserPage", { userId: user_id });
                }}
              >
                <S.ProfileImage source={profile ? { uri: profile } : defaultProfile} />
              </S.IconContainer>
              <S.IconContainer
                onPress={() => {
                  videoRef.current.pauseAsync();
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
                    {formattedNumber(like_cnt + (isLike ? 1 : 0))}
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
          onProfilePress={onCommetProfilePress}
          isQuestionAdoption={is_adoption === 1}
          ref={commentBottomSheetRef}
          questionId={id}
          is_mine={is_mine}
        />
        <Tool ref={toolSheetRef} items={items} />
        <ReportModal ref={reportSheetRef} reportCallback={onReport} />
      </Portal>
    </Fragment>
  );
};

export default memo(FeedContent);
