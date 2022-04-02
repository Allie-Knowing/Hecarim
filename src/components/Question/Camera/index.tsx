import React, { useState, useEffect, FC } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as S from "./styles";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "..";

//import images
const rotateImg = require("../../../assets/icons/rotate.png");
const recordingImg = require("../../../assets/icons/recording.png");
const recordImg = require("../../../assets/icons/record.png");
const videoImg = require("../../../assets/icons/video.png");

const CameraComponent: FC = (): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);
  const [videoURI, setVideoURI] = useState<string | null>(null);
  const [cameraRef, setCameraRef] = useState<null | Camera>(null);

  type screenProp = StackNavigationProp<RootStackParamList, "VideoDetailPage">;

  const navigation = useNavigation<screenProp>();

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const SCREEN_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

  const MAX_DURATION = 60;

  useEffect(() => {
    startCamera();
  }, []);

  const importMediaFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const videoData = ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: ImagePicker.UIImagePickerControllerQualityType.High,
      base64: true,
      videoMaxDuration: MAX_DURATION,
      aspect: [4, 3],
      allowsEditing: true,
      allowsMultipleSelection: false,
    });

    if (permission.granted) {
      await videoData.then((res: ImagePicker.ImageInfo) => {
        if (!res.cancelled) {
          const isLongerThan60s = (res.duration ?? 0) / 1000 > MAX_DURATION;
          if (isLongerThan60s) {
            alert("동영상의 길이가 60초를 넘어 영상의 앞 60초만 사용됩니다.");
            return;
          }
          setVideoURI(res.uri);
          navigation.navigate("VideoDetailPage");
        }
      });
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
    if (cameraRef) {
      setIsVideoRecording(true);
      const videoRecordPromise = await cameraRef.recordAsync({
        maxDuration: MAX_DURATION,
      });
      setVideoURI(videoRecordPromise.uri);
      navigation.navigate("VideoDetailPage");
    }
  };

  const stopVideoRecording = async () => {
    if (cameraRef) {
      setIsVideoRecording(false);
      await cameraRef.stopRecording();
    }
  };

  const switchCamera = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  const renderVideoRecordIndicator = (): JSX.Element => (
    <S.RecordIndicatorContainer>
      <S.RecordDot />
      <S.RecordTitle>{"촬영중..."}</S.RecordTitle>
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
      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
        <Camera
          ref={(el) => setCameraRef(el)}
          style={{ ...StyleSheet.absoluteFillObject }}
          type={cameraType}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            console.warn("cammera error", error);
          }}
          autoFocus={"on"}
          useCamera2Api
        />
        <View style={{ ...StyleSheet.absoluteFillObject }}>
          {isVideoRecording && renderVideoRecordIndicator()}
          {renderVideoControl()}
        </View>
      </SafeAreaView>
    </S.QuestionWrapper>
  );
};

export default CameraComponent;