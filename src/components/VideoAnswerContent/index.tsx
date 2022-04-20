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
import { Dimensions, View } from "react-native";
import * as S from "./styles";
import formattedNumber from "constant/formattedNumber";
import isStackContext from "context/IsStackContext";
import { VideoAnswer as VideoAnswerType } from "api/Answer";
import { Audio, Video } from "expo-av";
import Tool, { ToolItem } from "components/BottomSheets/Tool";
import { useTheme } from "styled-components/native";
import { Portal } from "react-native-portalize";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useVideoMutation } from "queries/Video";
import useAlert from "hooks/useAlert";
import { useQueryClient } from "react-query";
import queryKeys from "constant/queryKeys";
import { useLikeMutation } from "queries/Like";
import { useVideoAnswerDetail, useVideoAnswerMutation } from "queries/Answer";
import useMainStackNavigation from "hooks/useMainStackNavigation";

const Heart = require("../../assets/icons/heart.png");
const More = require("../../assets/icons/more.png");
const Play = require("../../assets/play.png");
const defaultProfile = require("assets/profile.png");

const { height } = Dimensions.get("screen");

const dateToString = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

interface PropsType {
  isCurrentPage: boolean;
  isQuestionMine: boolean;
  isQuestionAdoption: boolean;
}

const VideoAnswerContent: FC<VideoAnswerType & PropsType> = ({
  created_at,
  id,
  is_adoption,
  is_mine,
  like_cnt,
  profile,
  title,
  user_id,
  video_url,
  isCurrentPage,
  isQuestionMine,
  is_like,
  isQuestionAdoption,
}) => {
  const isStack = useContext(isStackContext);
  const [isStop, setIsStop] = useState<boolean>(false);
  const tabBarHeight = isStack ? 30 : 80;
  const { like, unLike } = useLikeMutation(id);
  const videoRef = useRef<Video>(null);
  const theme = useTheme();
  const toolSheetRef = useRef<BottomSheetModal>(null);
  const reportSheetRef = useRef<BottomSheetModal>(null);
  const confirmSheetRef = useRef<BottomSheetModal>(null);
  const descriptionRef = useRef<string>("");
  const { dismissAll } = useBottomSheetModal();
  const { report } = useVideoMutation(id);
  const { showAlert, closeAlert } = useAlert();
  const queryClient = useQueryClient();
  const { remove, adoption } = useVideoAnswerMutation();
  const { data, isLoading, refetch } = useVideoAnswerDetail(id);
  const navigation = useMainStackNavigation();

  const isLike = useMemo(() => data?.data.data.is_like || is_like, [data]);
  const likeCnt = useMemo(() => data?.data.data.like_cnt || like_cnt, [data]);

  const onReportPress = useCallback(
    (description: string) => () => {
      descriptionRef.current = description;
      confirmSheetRef.current.present();
    },
    []
  );

  const isLikeLoading = useMemo(
    () => like.isLoading || unLike.isLoading || isLoading,
    [like.isLoading, unLike.isLoading, isLoading]
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

  const onPageChange = useCallback(async () => {
    if (isCurrentPage) {
      await videoRef.current.playFromPositionAsync(0);
    } else {
      videoRef.current.stopAsync();
    }
  }, [isCurrentPage]);

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
      content: "삭제한 영상답변은\n복구가 불가능합니다.",
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
            queryClient.invalidateQueries([queryKeys.answer]);

            showAlert({
              title: "삭제 완료",
              content: "영상 답변이 삭제되었습니다.",
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

  useEffect(() => {
    onPageChange();
  }, [onPageChange]);

  const onAdoptionAccpet = useCallback(
    async (alert: string) => {
      closeAlert(alert);

      await adoption.mutateAsync(id);

      showAlert({
        title: "채택되었습니다",
        content: "답변이 채택되었습니다.",
        buttons: [
          { color: "black", onPress: (id) => closeAlert(id), text: "확인" },
        ],
      });

      queryClient.invalidateQueries([queryKeys.answer]);
    },
    [closeAlert, adoption, id, queryClient]
  );

  const onAdoption = useCallback(() => {
    dismissAll();

    showAlert({
      title: "채택하시겠습니까?",
      content: "답변 채택 후 채택 취소 혹은\n추가 채택이 불가능합니다.",
      buttons: [
        { color: "black", onPress: (id) => closeAlert(id), text: "취소" },
        { color: "primary", onPress: onAdoptionAccpet, text: "채택" },
      ],
    });
  }, [dismissAll, showAlert, closeAlert, onAdoptionAccpet]);

  const items: ToolItem[] = useMemo(() => {
    const li = is_mine
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
        ];
    if (isQuestionMine && !is_mine && !isQuestionAdoption) {
      li.push({
        color: theme.colors.primary.default,
        onPress: onAdoption,
        text: "채택하기",
      });
    }
    return li;
  }, [theme, onDeletePress, isQuestionMine, onAdoption]);

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

  const stopVideo = () => {
    isStop ? videoRef.current.playAsync() : videoRef.current.pauseAsync();
    setIsStop(!isStop);
  };

  return (
    <Fragment>
      <S.Container style={{ height }} onPress={stopVideo} activeOpacity={1}>
        {isStop && <S.VideoStateIcon source={Play} />}
        <S.Video
          source={{ uri: video_url }}
          isLooping
          resizeMode="cover"
          ref={videoRef}
          rate={1.0}
          volume={1.0}
          style={{ backgroundColor: theme.colors.grayscale.scale100 }}
        />
        <S.Content style={{ paddingBottom: tabBarHeight + 30 }}>
          <S.InfoOuter>
            <S.InfoContainer>
              <View>
                {is_adoption === 1 && (
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignSelf: "flex-start",
                      marginBottom: 30,
                    }}
                  >
                    <S.AdoptionContainer
                      style={{
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                      }}
                    >
                      <S.AdoptionText>채택된 답변</S.AdoptionText>
                    </S.AdoptionContainer>
                  </View>
                )}
              </View>
              <S.TitleContainer>
                <View>
                  <S.A>A.&nbsp;</S.A>
                </View>
                <S.Title>{title}</S.Title>
              </S.TitleContainer>
              <S.Description>
                {dateToString(new Date(created_at))}
              </S.Description>
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
                <S.ProfileImage
                  source={profile ? { uri: profile } : defaultProfile}
                />
              </S.IconContainer>
              <S.IconContainer onPress={onLikePress}>
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
                    color: isLike
                      ? theme.colors.primary.default
                      : theme.colors.grayscale.scale10,
                  }}
                >
                  {formattedNumber(likeCnt)}
                </S.IconLabel>
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
        <Tool ref={toolSheetRef} items={items} />
        <Tool ref={reportSheetRef} items={reportItems} />
        <Tool ref={confirmSheetRef} items={comfirmItems} />
      </Portal>
    </Fragment>
  );
};

export default VideoAnswerContent;
