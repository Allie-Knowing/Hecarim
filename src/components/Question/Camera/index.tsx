import React, { useState, useEffect, FC } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, View, Text, SafeAreaView, Dimensions } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as S from "./styles";
import { MAX_DURATION, SCREEN_RATIO } from "../../../constant/camera";
import * as ImagePicker from "expo-image-picker";
import { RootStackParamList } from "..";

//import images
const rotateImg = require("../../../assets/icons/rotate.png");
const recordingImg = require("../../../assets/icons/recording.png");
const recordImg = require("../../../assets/icons/record.png");
const videoImg = require("../../../assets/icons/video.png");

type screenProp = StackNavigationProp<RootStackParamList, "VideoDetailPage">;

const CameraComponent: FC = (): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);
  const [videoURI, setVideoURI] = useState<string | null>(null);
  const [cameraRef, setCameraRef] = useState<null | Camera>(null);
  const [bestRatio, setBestRatio] = useState<string>();
  const [isPickingVideo, setIsPickingVideo] = useState<boolean>(false);

  const navigation = useNavigation<screenProp>();
  const isFocused = useIsFocused();

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;
  const MAX_DURATION = 60;

  useEffect(() => {
    startCamera();
  }, []);

  const importMediaFromLibrary = async () => {
    setIsPickingVideo(true);
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
            alert(
              "영상의 길이가 60초를 초과하여, 영상의 앞 60초만 사용됩니다."
            );
          }
          setVideoURI(res.uri);
          navigation.navigate("VideoDetailPage");
        }
      });
    }
    setIsPickingVideo(false);
  };

  const onCameraReady = () => {
    getDeviceCameraRatio();
    setIsCameraReady(true);
  };

  const startCamera = async () => {
    const { status: CameraStatus } =
      await Camera.requestCameraPermissionsAsync();
    const { status: VoiceStatus } =
      await Camera.requestMicrophonePermissionsAsync();

    setHasPermission(CameraStatus === "granted" && VoiceStatus === "granted");
  };

  const getDeviceCameraRatio = async () => {
    const ratio = await cameraRef.getSupportedRatiosAsync();
    setBestRatio(extractBestRatio(ratio));
  };

  const extractBestRatio = (availableRatioArra: string[]) => {
    const ratioObjectArray: { ratio: string; realRatio: number }[] = [];
    const arrayOfAbs: number[] = [];

    for (let i = 0; i < availableRatioArra.length; i++) {
      ratioObjectArray[i] = {
        ratio: availableRatioArra[i],
        realRatio:
          Number(availableRatioArra[i].split(":")[0]) /
          Number(availableRatioArra[i].split(":")[1]),
      };
    }

    for (let i = 0; i < ratioObjectArray.length; i++) {
      arrayOfAbs.push(Math.abs(SCREEN_RATIO - ratioObjectArray[i].realRatio));
    }

    const minRatio = Math.min.apply(Math, arrayOfAbs);
    const minRatioIndex = arrayOfAbs.findIndex((value) => value === minRatio);

    return availableRatioArra[minRatioIndex];
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
      await cameraRef.stopRecording();
      setIsVideoRecording(false);
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
        {isFocused && !isPickingVideo && (
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
            ratio={bestRatio}
          />
        )}

        <View style={{ ...StyleSheet.absoluteFillObject }}>
          {isVideoRecording && renderVideoRecordIndicator()}
          {renderVideoControl()}
        </View>
      </SafeAreaView>
    </S.QuestionWrapper>
  );
};

export default CameraComponent;
