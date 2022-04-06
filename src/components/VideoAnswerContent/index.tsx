import React, { FC, Fragment, useContext, useRef } from "react";
import { Dimensions, View } from "react-native";
import * as S from "./styles";
import formattedNumber from "constant/formattedNumber";
import isStackContext from "context/IsStackContext";
import useLikeEvent from "hooks/useLikeEvent";
import { VideoAnswer as VideoAnswerType } from "api/Answer";
import { Video } from "expo-av";

const Test = require("../../assets/feed_test.jpg");
const Heart = require("../../assets/icons/heart.png");
const More = require("../../assets/icons/more.png");
const Camera = require("../../assets/icons/camera.png");

const { height } = Dimensions.get("screen");

const dateToString = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

const VideoAnswerContent: FC<VideoAnswerType> = ({
  created_at,
  id,
  is_adoption,
  is_mine,
  like_cnt,
  profile,
  title,
  user_id,
  video_url,
}) => {
  const isStack = useContext(isStackContext);
  const tabBarHeight = isStack ? 30 : 80;
  const { like, unlike } = useLikeEvent(-1);
  const videoRef = useRef<Video>(null);

  return (
    <Fragment>
      <S.Container style={{ height }}>
        <S.Video
          source={{ uri: video_url }}
          isLooping
          resizeMode="cover"
          ref={videoRef}
          rate={1.0}
          volume={1.0}
        />
        <S.Content style={{ paddingBottom: tabBarHeight + 30 }}>
          <S.InfoOuter>
            <S.InfoContainer>
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
