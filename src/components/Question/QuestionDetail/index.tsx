import React, { FC, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as S from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import theme from "theme/theme";
const backImage = require("../../../assets/icons/back-black.png");

interface Props {
  videoSrc: string | null;
  closeDetailPage: () => void;
}

const QuestionDetail: FC<Props> = ({
  videoSrc,
  closeDetailPage,
}): JSX.Element => {
  const [borderBottomColor, setBorderBottomColor] = useState<string>("#C9C8CF");
  const { top: topPad, bottom: bottomPad } = useSafeAreaInsets();
  const FooterHeight = 50;
  const HeaderHeight = 50;
  const ScreenHeight = Dimensions.get("window").height;

  return (
    <KeyboardAwareScrollView
      extraHeight={20}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === "ios"}
      scrollEnabled={false}
    >
      <S.QuestionDetailWrapper
        topPad={topPad + HeaderHeight}
        height={ScreenHeight}
      >
        <S.QuestionDetailHeader topPad={topPad}>
          <TouchableOpacity
            onPress={closeDetailPage}
            style={{ flex: 1, alignItems: "flex-start" }}
          >
            <Image source={backImage} style={{ width: 10, height: 18 }} />
          </TouchableOpacity>
          <Text style={{ flex: 1, textAlign: "center", fontSize: 16 }}>
            질문 정보 입력
          </Text>
          <S.UploadContainer>
            <Text style={{ fontSize: 16, color: "#7366ef" }}>업로드</Text>
          </S.UploadContainer>
        </S.QuestionDetailHeader>
        <S.QuestionDetailBody
          height={
            ScreenHeight - (topPad + bottomPad + HeaderHeight + FooterHeight)
          }
        >
          <ScrollView scrollEnabled={true}>
            <S.VideoContainer>
              <Video
                source={{ uri: videoSrc ?? "" }}
                style={{ width: 225, height: 400, borderRadius: 15 }}
                useNativeControls={true}
                shouldPlay={true}
                isLooping={true}
              />
            </S.VideoContainer>
            <S.InputContainer>
              <S.TitleInputContainer borderColor={borderBottomColor}>
                <S.TitleText>제목</S.TitleText>
                <S.TitleInput
                  placeholder="입력해주세요..."
                  placeholderTextColor={"#C9C8CF"}
                  onFocus={() => setBorderBottomColor("#7366ef")}
                  onBlur={() => setBorderBottomColor("#c9c9cf")}
                />
              </S.TitleInputContainer>
              <View style={{ marginTop: 16 }}>
                <S.TitleText>설명</S.TitleText>
                <S.TextArea placeholder="입력해주세요..." multiline={true} />
              </View>
              <View style={{ marginTop: 16 }}>
                <S.TitleText>해쉬태그</S.TitleText>
                <S.TextArea placeholder="입력해주세요..." multiline={true} />
              </View>
            </S.InputContainer>
          </ScrollView>
        </S.QuestionDetailBody>
      </S.QuestionDetailWrapper>
    </KeyboardAwareScrollView>
  );
};

export default QuestionDetail;
