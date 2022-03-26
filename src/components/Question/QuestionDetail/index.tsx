import React, { FC, useState } from "react";
import { Platform, Dimensions, ScrollView } from "react-native";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VideoDataType } from "interface/Question";
import * as S from "./styles";
const backImage = require("../../../assets/icons/back-black.png");
import theme from "theme/theme";

interface Props {
  videoData: VideoDataType | null;
  closeDetailPage: () => void;
}

const QuestionDetail: FC<Props> = ({
  videoData,
  closeDetailPage,
}): JSX.Element => {
  const [borderBottomColor, setBorderBottomColor] = useState<string>(
    theme.colors.grayscale.scale30
  );
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
          <S.GoBackContainer onPress={closeDetailPage}>
            <S.GoBackImage source={backImage} />
          </S.GoBackContainer>
          <S.InputQuestionInfoText>질문 정보 입력</S.InputQuestionInfoText>
          <S.UploadContainer>
            <S.UploadText>업로드</S.UploadText>
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
                source={{ uri: videoData?.uri ?? "" }}
                style={{
                  aspectRatio: 3 / 4,
                  width: 250,
                  borderRadius: 10,
                }}
                shouldPlay
                isLooping
              />
            </S.VideoContainer>
            <S.InputContainer>
              <S.InputBox>
                <S.TitleInputContainer borderColor={borderBottomColor}>
                  <S.TitleText>제목</S.TitleText>
                  <S.TitleInput
                    placeholder="입력해주세요..."
                    placeholderTextColor={theme.colors.grayscale.scale30}
                    onFocus={() =>
                      setBorderBottomColor(theme.colors.primary.default)
                    }
                    onBlur={() =>
                      setBorderBottomColor(theme.colors.grayscale.scale30)
                    }
                  />
                </S.TitleInputContainer>
              </S.InputBox>
              <S.InputBox>
                <S.TitleText>설명</S.TitleText>
                <S.TextArea placeholder="입력해주세요..." multiline={true} />
              </S.InputBox>
              <S.InputBox>
                <S.TitleText>해쉬태그</S.TitleText>
                <S.TextArea placeholder="입력해주세요..." multiline={true} />
              </S.InputBox>
            </S.InputContainer>
          </ScrollView>
        </S.QuestionDetailBody>
      </S.QuestionDetailWrapper>
    </KeyboardAwareScrollView>
  );
};

export default QuestionDetail;
