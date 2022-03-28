import React, { useState, useEffect, FC } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import * as S from "./styles";
import QuestionDetail from "./QuestionDetail";
import { VideoDataType } from "interface/Question";
import * as ImagePicker from "expo-image-picker";
import * as Permission from "expo-permissions";

//import images
const rotateImg = require("../../assets/icons/rotate.png");
const recordingImg = require("../../assets/icons/recording.png");
const recordImg = require("../../assets/icons/record.png");
const videoImg = require("../../assets/icons/video.png");

const Question: FC = (): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<VideoDataType | null>(null);
  const [previewVideoSrc, setPreviewVideoSrc] = useState<string | null>(null);
  const [cameraRef, setCameraRef] = useState<null | Camera>(null);

  useEffect(() => {
    startCamera();
  }, []);

  const importMediaFromLibrary = async () => {
    const permission = await Permission.askAsync(Permission.MEDIA_LIBRARY);
    const videoData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      base64: true,
      quality: ImagePicker.UIImagePickerControllerQualityType.High,
      videoMaxDuration: 60,
      aspect: [4, 3],
      allowsEditing: true,
      allowsMultipleSelection: false,
    });

    if (permission.granted) {
      if (!videoData.cancelled) {
        setPreviewVideoSrc(videoData.uri);
        setIsPreview(true);
      } else {
        console.warn("동영상을 불러오고 싶지 않으신가봐요");
      }
    } else {
      alert("갤러리 권한이 없습니다.");
    }
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const recordVideo = async () => {
    setIsVideoRecording(true);
    if (cameraRef) {
      try {
        const videoRecordPromise = await cameraRef.recordAsync({
          maxDuration: 60,
        });

        setVideoData(videoRecordPromise);
        setPreviewVideoSrc(videoRecordPromise.uri);
        setIsPreview(true);
      } catch (error) {
        alert(error);
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
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  const closeDetailPage = () => {
    setIsPreview(false);
    setPreviewVideoSrc(null);
    setVideoData(null);
  };

  const renderVideoRecordIndicator = (): JSX.Element => (
    <S.RecordIndicatorContainer>
      <S.RecordDot />
      <S.RecordTitle>{"질문 촬영중..."}</S.RecordTitle>
    </S.RecordIndicatorContainer>
  );

  const renderVideoControl = (): JSX.Element => (
    <S.Control>
      {isVideoRecording ? (
        // 촬영중인 상태
        <S.RecordVideoContainer
          activeOpacity={0.7}
          disabled={!isCameraReady}
          onPress={stopVideoRecording}
        >
          <S.RecordingVideoImage source={recordingImg} />
        </S.RecordVideoContainer>
      ) : (
        // 촬영중이 아닌 상태
        <>
          <S.GetVideoContainer onPress={importMediaFromLibrary}>
            <S.VideoImage source={videoImg} />
          </S.GetVideoContainer>
          <S.RecordVideoContainer onPress={recordVideo}>
            <S.RecordImageStyle source={recordImg} />
          </S.RecordVideoContainer>
          <S.FlipCameraContainer
            disabled={!isCameraReady}
            onPress={switchCamera}
          >
            <S.FlipCameraImage source={rotateImg} />
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
          videoData={videoData}
          closeDetailPage={closeDetailPage}
          previewVideoSrc={previewVideoSrc ?? ""}
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
            autoFocus={"on"}
          />
          <View style={{ ...StyleSheet.absoluteFillObject }}>
            {isVideoRecording && renderVideoRecordIndicator()}
            {!videoData && !isPreview && renderVideoControl()}
          </View>
        </SafeAreaView>
      )}
    </S.QuestionWrapper>
  );
};

export default Question;
