import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as S from "./styles";

const Test = require("../../../assets/feed_test.jpg");
const Heart = require("../../../assets/icons/heart.svg");
const Comment = require("../../../assets/icons/comment.svg");
const More = require("../../../assets/icons/more.svg");

const { height } = Dimensions.get("screen");

const Content = () => {
  const [isMore, setIsMore] = useState<boolean>(false);

  return (
    <S.Container style={{ height: `${height}px` }}>
      <S.Video source={Test} />
      <S.Content>
        <S.InfoOuter onPress={() => setIsMore(!isMore)}>
          <S.InfoContainer>
            <S.TitleContainer>
              <View>
                <S.Q>Q.&nbsp;</S.Q>
              </View>
              <S.Title>제가 흥얼거리는 노래 제목 알려줭</S.Title>
            </S.TitleContainer>
            {isMore && <S.Description>2021년 12월 19일</S.Description>}
            <S.Description numberOfLines={isMore ? undefined : 1}>
              제가 흥얼거리는 노래 제목 알려주세요 대충가사는 이래요 어느새부터 힙합은 안 멋져 이건
              하나의 유행 혹은 TV쇼
            </S.Description>
            {isMore && (
              <S.HashTag>
                #쇼미#쇼미10#국힙원탑#이찬혁#힙합#노래 #디자인#개하기#싫다#임연상#니가#하라고
              </S.HashTag>
            )}
          </S.InfoContainer>
        </S.InfoOuter>
        <View>
          <S.Icons>
            <S.ProfileImage source={Test} />
            <S.IconContainer>
              <S.Icon resizeMode="contain" source={Heart} />
              <S.IconLabel>123.4k</S.IconLabel>
            </S.IconContainer>
            <S.IconContainer>
              <S.Icon resizeMode="contain" source={Comment} />
              <S.IconLabel>56</S.IconLabel>
            </S.IconContainer>
            <S.Icon resizeMode="contain" source={More} />
          </S.Icons>
        </View>
      </S.Content>
    </S.Container>
  );
};

export default Content;
