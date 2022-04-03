import React, { FC, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "constant/defaultStyle";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "..";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { SCREEN_HEIGHT } from "constant/camera";
import theme from "theme/theme";
import * as S from "./styles";

interface Props {
  videoURI: string;
}

type screenPop = StackNavigationProp<RootStackParamList, "VideoDetailPage">;

const VideoDetail: FC<Props> = ({ videoURI }): JSX.Element => {
  const [borderBottomColor, setBorderBottomColor] = useState<string>(
    theme.colors.grayscale.scale30
  );
  const { top: TOP_PAD, bottom: BOTTOM_PAD } = useSafeAreaInsets();

  const navigation = useNavigation<screenPop>();

  const backImage = require("../../../assets/icons/back-black.png");

  const uploadVideo = async () => {
    const formData = new FormData();
    const blobData = (await fetch(videoURI)).blob();

    formData.append("file", await blobData);
  };

  const cacheImage = () => {
    Promise.all([
      Asset.fromModule("../../../assets/icons/back-black.png").downloadAsync(),
    ]);
  };

  useEffect(() => {
    cacheImage();
  }, []);

  return (
    <KeyboardAwareScrollView
      extraHeight={20}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      scrollEnabled={true}
    >
      <S.QuestionDetailWrapper topPad={TOP_PAD + HEADER_HEIGHT}>
        <S.QuestionDetailHeader topPad={TOP_PAD}>
          <S.GoBackContainer
            onPress={() => {
              navigation.pop(1);
            }}
          >
            <S.GoBackImage source={backImage} />
          </S.GoBackContainer>
          <S.InputQuestionInfoText>질문 정보 입력</S.InputQuestionInfoText>
          <S.UploadContainer onPress={uploadVideo}>
            <S.UploadText>업로드</S.UploadText>
          </S.UploadContainer>
        </S.QuestionDetailHeader>
        <S.QuestionDetailBody
          height={
            SCREEN_HEIGHT -
            (TOP_PAD + BOTTOM_PAD + HEADER_HEIGHT + FOOTER_HEIGHT)
          }
        >
          <ScrollView scrollEnabled={true}>
            <S.VideoContainer>
              <Video
                source={{ uri: videoURI }}
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

export default VideoDetail;
