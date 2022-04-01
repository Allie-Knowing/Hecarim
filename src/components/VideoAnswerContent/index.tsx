import React, { FC, Fragment, useContext, useRef } from "react";
import { Dimensions, View } from "react-native";
import * as S from "./styles";
import formattedNumber from "constant/formattedNumber";
import isStackContext from "context/IsStackContext";

const Test = require("../../assets/feed_test.jpg");
const Heart = require("../../assets/icons/heart.png");
const More = require("../../assets/icons/more.png");
const Camera = require("../../assets/icons/camera.png");

const { height } = Dimensions.get("screen");

const VideoAnswerContent: FC = () => {
  const isStack = useContext(isStackContext);
  const tabBarHeight = isStack ? 30 : 80;

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
              <S.IconContainer>
                <S.Icon resizeMode="contain" source={More} />
              </S.IconContainer>
            </S.Icons>
          </View>
        </S.Content>
      </S.Container>
    </Fragment>
  );
};

export default VideoAnswerContent;
