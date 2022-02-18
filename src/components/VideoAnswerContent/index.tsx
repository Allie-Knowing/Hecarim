import React, { FC, Fragment, useRef } from "react";
import { Dimensions, GestureResponderEvent, View } from "react-native";
import * as S from "./styles";
import formattedNumber from "constant/formattedNumber";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import RBSheet from "react-native-raw-bottom-sheet";
import CommentBottomSheet from "components/BottomSheets/Comments";

const Test = require("../../assets/feed_test.jpg");
const Heart = require("../../assets/icons/heart.png");

const { height } = Dimensions.get("screen");

interface Icon {
  onPress?: (e: GestureResponderEvent) => void;
  component: FC;
}

const VideoAnswerContent: FC = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const commentBottomSheetRef = useRef<RBSheet>(null);

  const icons: Icon[] = [
    //프로필 사진
    {
      component: () => <S.ProfileImage source={Test} />,
    },
    //좋아요 아이콘
    {
      component: () => (
        <>
          <S.Icon resizeMode="contain" source={Heart} />
          <S.IconLabel>{formattedNumber(123456)}</S.IconLabel>
        </>
      ),
    },
  ];

  return (
    <Fragment>
      <S.Container style={{ height }}>
        <S.Video source={Test} />
        <S.Content style={{ paddingBottom: tabBarHeight + 30 }}>
          <S.InfoOuter>
            <S.InfoContainer>
              <S.TitleContainer>
                <View>
                  <S.A>A.&nbsp;</S.A>
                </View>
                <S.Title>제가 흥얼거리는 노래 제목 알려줭</S.Title>
              </S.TitleContainer>
              <S.Description>2021년 12월 19일</S.Description>
            </S.InfoContainer>
          </S.InfoOuter>
          <View>
            <S.Icons>
              {icons.map((value, index) => (
                <S.IconContainer key={index} onPress={value.onPress}>
                  {React.createElement(value.component)}
                </S.IconContainer>
              ))}
            </S.Icons>
          </View>
        </S.Content>
      </S.Container>
      <CommentBottomSheet ref={commentBottomSheetRef} />
    </Fragment>
  );
};

export default VideoAnswerContent;
