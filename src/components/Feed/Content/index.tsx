import { Text, View } from "react-native";
import * as S from "./styles";

const Test = require("../../../assets/feed_test.jpg");

const Content = () => {
  return (
    <S.Container>
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
            <View>
              <S.InvisiblePadding>Q.&nbsp;</S.InvisiblePadding>
            </View>
            <S.Description>제가 흥얼거리는 노래 제목 알려주세요 대충...</S.Description>
          </S.TitleContainer>
        </S.InfoContainer>
        <View>
          <S.Icons>
            <Text>qwe</Text>
            <Text>qqwe</Text>
            <Text>qqwe123</Text>
          </S.Icons>
        </View>
      </S.Content>
    </S.Container>
  );
};

export default Content;
