import React, { FC, useContext, useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "constant/defaultStyle";
import { StackNavigationProp } from "@react-navigation/stack";
import { CameraStackParamList } from "..";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { SCREEN_HEIGHT } from "constant/camera";
import uniqueId from "constant/uniqueId";
import theme from "theme/theme";
import * as S from "./styles";
import { cameraContext } from "context/CameraContext";
import isStackContext from "context/IsStackContext";
import { useVideoUrlMutation } from "queries/useVideoUrl";
import { useVideoDataMutation } from "queries/useVideoData";

interface Props {
  route?: {
    params: {
      questionId: number;
    };
  };
}

type screenProp = StackNavigationProp<CameraStackParamList, "CameraDetail">;

const CameraDetail: FC<Props> = ({ route }): JSX.Element => {
  const { uri } = useContext(cameraContext);
  const isAnswer = useContext(isStackContext);
  const [borderBottomColor, setBorderBottomColor] = useState<string>(
    theme.colors.grayscale.scale30
  );
  const { top: TOP_PAD, bottom: BOTTOM_PAD } = useSafeAreaInsets();
  const navigation = useNavigation<screenProp>();
  const backImage = require("../../../assets/icons/back-black.png");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");

  const { videoUrl } = useVideoUrlMutation();
  const { postQuestion, postAnswer } = useVideoDataMutation();

  //formData 생성 함수
  const createFormData = (uri: string) => {
    const formData = new FormData();
    const data = {
      uri,
      type: Platform.OS === "ios" ? "video/quicktime" : "video/mp4",
      name: `${uniqueId()}${Platform.OS === "ios" ? ".mov" : ".mp4"}`,
    } as unknown as string;

    formData.append("file", data);

    return formData as unknown as string;
  };

  //동영상 업로드 함수
  const uploadVideo = async () => {
    const formData = createFormData(uri);
    const hashTagArr = hashTag
      .split("#")
      .filter((value) => {
        return value.length > 0;
      })
      .map((value) => {
        return value.replaceAll(" ", "");
      });

    try {
      const videoUrlResponse = await videoUrl.mutateAsync({
        type: isAnswer ? "answer" : "question",
        file: formData,
      });

      isAnswer
        ? await postAnswer.mutateAsync({
            data: {
              title: title,
              video_url: videoUrlResponse.data.data.url,
            },
            feed_id: route.params.questionId,
          })
        : await postQuestion.mutateAsync({
            title: title,
            description: description,
            hash_tag: hashTagArr,
            video_url: videoUrlResponse.data.data.url,
          });
    } catch (err) {
      console.log(err);
    }
    isAnswer ? navigation.pop(2) : navigation.pop(1);
  };

  //이미지 캐싱 함수
  const cacheImage = () => {
    Promise.all([
      Asset.fromModule("../../../assets/icons/back-black.png").downloadAsync(),
    ]);
  };

  const autoHashTag = (text: string) => {
    const splittedText = text.split(" ").map((value) => {
      if (value[0] === "#" || value.length === 0) return value;
      else {
        return (value = "#" + value);
      }
    });

    setHashTag(splittedText.join(" "));
  };

  useEffect(() => {
    cacheImage();
  }, []);

  return (
    <KeyboardAwareScrollView
      extraHeight={40}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
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
          {videoUrl.isLoading ||
          postQuestion.isLoading ||
          postAnswer.isLoading ? (
            <S.UploadContainer>
              <S.UploadText color="#97979C">업로드중...</S.UploadText>
            </S.UploadContainer>
          ) : (
            <S.UploadContainer onPress={uploadVideo}>
              <S.UploadText color="#7366EF">업로드</S.UploadText>
            </S.UploadContainer>
          )}
        </S.QuestionDetailHeader>
        <S.QuestionDetailBody
          height={
            SCREEN_HEIGHT -
            (TOP_PAD + BOTTOM_PAD + HEADER_HEIGHT + FOOTER_HEIGHT)
          }
        >
          <ScrollView>
            <S.VideoContainer>
              <Video
                source={{ uri: uri }}
                style={{
                  width: 230,
                  height: 415,
                  borderRadius: 10,
                  backgroundColor: "#c6c6c6",
                }}
                shouldPlay
                isLooping
                resizeMode="cover"
                isMuted
              />
            </S.VideoContainer>
            {isAnswer ? (
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
                      onChangeText={(text) => setTitle(text)}
                    />
                  </S.TitleInputContainer>
                </S.InputBox>
              </S.InputContainer>
            ) : (
              <S.InputContainer>
                <S.InputBox>
                  <S.TitleInputContainer borderColor={borderBottomColor}>
                    <S.TitleText>제목</S.TitleText>
                    <S.TitleInput
                      placeholder="입력해주세요"
                      placeholderTextColor={theme.colors.grayscale.scale30}
                      onFocus={() =>
                        setBorderBottomColor(theme.colors.primary.default)
                      }
                      onBlur={() =>
                        setBorderBottomColor(theme.colors.grayscale.scale30)
                      }
                      onChangeText={(text) => setTitle(text)}
                    />
                  </S.TitleInputContainer>
                </S.InputBox>
                <S.InputBox>
                  <S.TitleText>설명</S.TitleText>
                  <S.TextArea
                    placeholder="입력해주세요"
                    multiline={true}
                    textAlignVertical={"center"}
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                  />
                </S.InputBox>
                <S.InputBox>
                  <S.TitleText>해쉬태그</S.TitleText>
                  <S.TextArea
                    placeholder="해쉬태그 입력 후 스페이스바를 눌러주세요"
                    multiline={true}
                    textAlignVertical={"center"}
                    onChangeText={(text) => autoHashTag(text)}
                    value={hashTag}
                  />
                </S.InputBox>
              </S.InputContainer>
            )}
          </ScrollView>
        </S.QuestionDetailBody>
      </S.QuestionDetailWrapper>
    </KeyboardAwareScrollView>
  );
};

export default CameraDetail;
