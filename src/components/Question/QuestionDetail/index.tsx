import React, { FC, useState } from "react";
import { Platform, Dimensions, ScrollView } from "react-native";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FooterHeight, HeaderHeight } from "constant/defaultStyle";
import * as S from "./styles";
import theme from "theme/theme";

//import image
const backImage = require("../../../assets/icons/back-black.png");

interface Props {
  previewVideoSrc: string;
  closeDetailPage: () => void;
}

const QuestionDetail: FC<Props> = ({
  closeDetailPage,
  previewVideoSrc,
}): JSX.Element => {
  const [borderBottomColor, setBorderBottomColor] = useState<string>(
    theme.colors.grayscale.scale30
  );
  const { top: topPad, bottom: bottomPad } = useSafeAreaInsets();
  const ScreenHeight = Dimensions.get("window").height;

  const uploadVideo = async () => {
    const formData = new FormData();
    const blobData = (await fetch(previewVideoSrc)).blob();

    formData.append("file", await blobData);

    console.warn(formData);
  };

  return (
    //키보드가 올라올시에 자동으로 인풋 위치를 패딩으로 조정해주는 컴포넌트
    <KeyboardAwareScrollView
      extraHeight={20}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === "ios"}
      scrollEnabled={false}
    >
      <S.QuestionDetailWrapper topPad={topPad + HeaderHeight}>
        <S.QuestionDetailHeader topPad={topPad}>
          <S.GoBackContainer onPress={closeDetailPage}>
            <S.GoBackImage source={backImage} />
          </S.GoBackContainer>
          <S.InputQuestionInfoText>질문 정보 입력</S.InputQuestionInfoText>
          <S.UploadContainer onPress={uploadVideo}>
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
                source={{ uri: previewVideoSrc }}
                style={{
                  aspectRatio: 3 / 4,
                  width: 250,
                  borderRadius: 10,
                  backgroundColor: "#c6c6c6",
                }}
                shouldPlay
                isLooping
                resizeMode="cover"
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
                <S.TextArea
                  placeholder="입력해주세요..."
                  multiline={true}
                  textAlignVertical={"center"}
                />
              </S.InputBox>
              <S.InputBox>
                <S.TitleText>해쉬태그</S.TitleText>
                <S.TextArea
                  placeholder="입력해주세요..."
                  multiline={true}
                  textAlignVertical={"center"}
                />
              </S.InputBox>
            </S.InputContainer>
          </ScrollView>
        </S.QuestionDetailBody>
      </S.QuestionDetailWrapper>
    </KeyboardAwareScrollView>
  );
};

export default QuestionDetail;
