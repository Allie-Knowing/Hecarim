import React, {
  FC,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, LayoutAnimation, View } from "react-native";
import * as S from "./styles";
import { ThemeContext } from "styled-components/native";
import formattedNumber from "constant/formattedNumber";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import CommentBottomSheet from "components/BottomSheets/Comments";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import Tool, { ToolItem } from "components/BottomSheets/Tool";
import { Portal } from "react-native-portalize";

const Test = require("../../assets/feed_test.jpg");
const Heart = require("../../assets/icons/heart.png");
const Comment = require("../../assets/icons/comment.png");
const More = require("../../assets/icons/more.png");
const Camera = require("../../assets/icons/camera.png");

const { height } = Dimensions.get("screen");

const FeedContent: FC = () => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);
  const tabBarHeight = useBottomTabBarHeight();
  const commentBottomSheetRef = useRef<BottomSheet>(null);
  const toolSheetRef = useRef<BottomSheetModal>(null);
  const reportSheetRef = useRef<BottomSheetModal>(null);
  const confirmSheetRef = useRef<BottomSheetModal>(null);

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

  const items: ToolItem[] = useMemo(
    () => [
      {
        color: themeContext.colors.primary.default,
        onPress: () => {},
        text: "채택하기",
      },
      {
        color: themeContext.colors.red.default,
        onPress: () => {
          reportSheetRef.current.present();
        },
        text: "신고하기",
      },
      {
        color: themeContext.colors.red.default,
        onPress: () => {},
        text: "삭제하기",
      },
    ],
    []
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
    [onReportPress]
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
    []
  );

  return (
    <Fragment>
      <S.Container style={{ height }}>
        <S.Video source={Test} />
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
                <S.Title>제가 흥얼거리는 노래 제목 알려줭</S.Title>
              </S.TitleContainer>
              {isMore && <S.Description>2021년 12월 19일</S.Description>}
              <S.Description numberOfLines={isMore ? undefined : 1}>
                제가 흥얼거리는 노래 제목 알려주세요 대충가사는 이래요
                어느새부터 힙합은 안 멋져 이건 하나의 유행 혹은 TV쇼
              </S.Description>
              {isMore && (
                <S.HashTag>
                  #쇼미 #쇼미10 #국힙원탑 #이찬혁 #힙합 #노래 #디자인 #개하기
                  #싫다 #임연상 #니가 #하라고
                </S.HashTag>
              )}
            </S.InfoContainer>
          </S.InfoOuter>
          <View>
            <S.Icons>
              <S.IconContainer>
                <S.ProfileImage source={Test} />
              </S.IconContainer>
              <S.IconContainer>
                <S.Icon resizeMode="contain" source={Camera} />
                <S.IconLabel>답변하기</S.IconLabel>
              </S.IconContainer>
              <S.IconContainer>
                <S.Icon resizeMode="contain" source={Heart} />
                <S.IconLabel>{formattedNumber(123456)}</S.IconLabel>
              </S.IconContainer>
              <S.IconContainer
                onPress={() => commentBottomSheetRef.current?.snapToIndex(0)}
              >
                <S.Icon resizeMode="contain" source={Comment} />
                <S.IconLabel>{formattedNumber(56)}</S.IconLabel>
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
        <CommentBottomSheet ref={commentBottomSheetRef} />
        <Tool ref={toolSheetRef} items={items} />
        <Tool ref={reportSheetRef} items={reportItems} />
        <Tool ref={confirmSheetRef} items={comfirmItems} />
      </Portal>
    </Fragment>
  );
};

export default FeedContent;
