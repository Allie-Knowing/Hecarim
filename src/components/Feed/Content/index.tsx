import { Dimensions, Text, View } from "react-native";
import * as S from "./styles";

const Test = require("../../../assets/feed_test.jpg");
const Heart = require("../../../assets/icons/heart.svg");
const Comment = require("../../../assets/icons/comment.svg");
const More = require("../../../assets/icons/more.svg");

const { height } = Dimensions.get("screen");

const Content = () => {
  return (
    <S.Container style={{ height: `${height}px` }}>
      <S.Video source={Test} />
      <S.Content>
        <S.InfoContainer>
          <S.TitleContainer>
            <View>
              <S.Q>Q.&nbsp;</S.Q>
            </View>
            <S.Title>제가 흥얼거리는 노래 제목 알려줭</S.Title>
          </S.TitleContainer>
          <S.TitleContainer>
            <S.Description>제가 흥얼거리는 노래 제목 알려주세요 대충...</S.Description>
          </S.TitleContainer>
        </S.InfoContainer>
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
