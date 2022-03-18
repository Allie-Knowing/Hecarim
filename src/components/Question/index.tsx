import React, { useState, useEffect, FC } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import * as S from "./styles";
const rotateImg = require("../../assets/icons/rotate.png");
const recordingImg = require("../../assets/icons/recording.png");
const recordImg = require("../../assets/icons/record.png");
const videoImg = require("../../assets/icons/video.png");
const backImg = require("../../assets/icons/back.png");
const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

const Question: FC = (): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const [cameraRef, setCameraRef] = useState<null | Camera>(null);

  useEffect(() => {
    startCamera();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const videoRecordPromise = cameraRef.recordAsync();
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            setIsPreview(true);
            console.log("video source", source);
            setVideoSource(source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideoRecording = () => {
    if (cameraRef) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.stopRecording();
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const cancelPreview = async () => {
    if (cameraRef) {
      await cameraRef.resumePreview();
      setIsPreview(false);
      setVideoSource(null);
    }
  };

  const renderPreviewHeader = () => (
    <S.PreviewHeaderContainer>
      <S.BackImageContainer onPress={cancelPreview}>
        <S.BackImage source={backImg} />
      </S.BackImageContainer>
      <S.QuestionVideoText>질문 영상 촬영</S.QuestionVideoText>
      <S.PreviewNextContainer>
        <Text style={{ color: "#fff" }}>다음</Text>
      </S.PreviewNextContainer>
    </S.PreviewHeaderContainer>
  );

  const renderVideoPlayer = () => (
    <Video
      useNativeControls={true}
      source={{ uri: videoSource ?? "" }}
      style={{ ...StyleSheet.absoluteFillObject }}
      resizeMode={"cover"}
      isLooping
      shouldPlay
    />
  );

  const renderVideoRecordIndicator = () => (
    <S.RecordIndicatorContainer>
      <S.RecordDot />
      <S.RecordTitle>{"질문 촬영중..."}</S.RecordTitle>
    </S.RecordIndicatorContainer>
  );

  const renderCaptureControl = () => (
    <S.Control>
      <S.GetVideoContainer>
        <Image source={videoImg} style={{ width: 40, height: 40 }} />
      </S.GetVideoContainer>
      {isVideoRecording ? (
        <S.RecordVideoContainer
          activeOpacity={0.7}
          disabled={!isCameraReady}
          onPress={stopVideoRecording}
        >
          <Image source={recordingImg} style={{ width: 60, height: 60 }} />
        </S.RecordVideoContainer>
      ) : (
        <S.RecordVideoContainer onPress={recordVideo}>
          <S.RecordImageStyle source={recordImg} />
        </S.RecordVideoContainer>
      )}
      <S.FlipCameraContainer disabled={!isCameraReady} onPress={switchCamera}>
        <Image source={rotateImg} style={{ width: 48, height: 48 }} />
      </S.FlipCameraContainer>
    </S.Control>
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>카메라에 권한이 없습니다.</Text>;
  }

  return (
    <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
      <Camera
        ref={(el) => setCameraRef(el)}
        style={{ ...StyleSheet.absoluteFillObject }}
        type={cameraType}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("cammera error", error);
        }}
        // flashMode={Camera.Constants.FlashMode.on}
      />
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {isPreview && renderPreviewHeader()}
        {!videoSource && !isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
};

export default Question;
