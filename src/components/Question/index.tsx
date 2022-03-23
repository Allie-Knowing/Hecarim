import React, { useState, useEffect, FC } from "react";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import * as S from "./styles";
import QuestionDetail from "./QuestionDetail";

//Import images
const rotateImg = require("../../assets/icons/rotate.png");
const recordingImg = require("../../assets/icons/recording.png");
const recordImg = require("../../assets/icons/record.png");
const videoImg = require("../../assets/icons/video.png");

const Question: FC = (): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
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
    setIsPreview(false);
    setVideoSource(null);
  };

  const renderVideoRecordIndicator = () => (
    <S.RecordIndicatorContainer>
      <S.RecordDot />
      <S.RecordTitle>{"질문 촬영중..."}</S.RecordTitle>
    </S.RecordIndicatorContainer>
  );

  const renderVideoControl = () => (
    <S.Control>
      {isVideoRecording ? (
        <S.RecordVideoContainer
          activeOpacity={0.7}
          disabled={!isCameraReady}
          onPress={stopVideoRecording}
        >
          <Image source={recordingImg} style={{ width: 60, height: 60 }} />
        </S.RecordVideoContainer>
      ) : (
        <>
          <S.GetVideoContainer>
            <Image source={videoImg} style={{ width: 40, height: 40 }} />
          </S.GetVideoContainer>
          <S.RecordVideoContainer onPress={recordVideo}>
            <S.RecordImageStyle source={recordImg} />
          </S.RecordVideoContainer>
          <S.FlipCameraContainer
            disabled={!isCameraReady}
            onPress={switchCamera}
          >
            <Image source={rotateImg} style={{ width: 48, height: 48 }} />
          </S.FlipCameraContainer>
        </>
      )}
    </S.Control>
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>카메라에 권한이 없습니다.</Text>;
  }

  return (
    <S.QuestionWrapper>
      {isPreview ? (
        <QuestionDetail
          videoSrc={videoSource}
          closeDetailPage={cancelPreview}
        />
      ) : (
        <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
          <Camera
            ref={(el) => setCameraRef(el)}
            style={{ ...StyleSheet.absoluteFillObject }}
            type={cameraType}
            onCameraReady={onCameraReady}
            onMountError={(error) => {
              console.log("cammera error", error);
            }}
          />
          <View style={{ ...StyleSheet.absoluteFillObject }}>
            {isVideoRecording && renderVideoRecordIndicator()}
            {!videoSource && !isPreview && renderVideoControl()}
          </View>
        </SafeAreaView>
      )}
    </S.QuestionWrapper>
  );
};

export default Question;
