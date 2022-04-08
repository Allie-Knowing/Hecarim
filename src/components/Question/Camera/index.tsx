import React, { useState, useEffect, FC, useContext } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CameraStackParamList } from "..";
import { Asset } from "expo-asset";
import { MAX_DURATION, SCREEN_RATIO } from "../../../constant/camera";
import * as ImagePicker from "expo-image-picker";
import * as S from "./styles";
import { cameraContext } from "context/CameraContext";
import isStackContext from "context/IsStackContext";
import useMainStackNavigation from "hooks/useMainStackNavigation";

interface Props {
  route?: {
    params: {
      questionId: number;
    };
  };
}

type screenProp = StackNavigationProp<CameraStackParamList, "CameraDetail">;

const CameraComponent: FC<Props> = ({ route }): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<null | Camera>(null);
  const [bestRatio, setBestRatio] = useState<string>();
  const [isPickingVideo, setIsPickingVideo] = useState<boolean>(false);
  const [questionObject, setQuestionObject] = useState<number | undefined>();
  const { setUri } = useContext(cameraContext);
  const isAnswer = useContext(isStackContext);
  const [blockRecord, setBlockRecord] = useState(false);

  const cameraNavigation = useNavigation<screenProp>();
  const mainNavigation = useMainStackNavigation();

  const isFocused = useIsFocused();

  const rotateImg = require("../../../assets/icons/rotate.png");
  const recordingImg = require("../../../assets/icons/recording.png");
  const recordImg = require("../../../assets/icons/record.png");
  const videoImg = require("../../../assets/icons/video.png");
  const backImage = require("../../../assets/icons/back-white.png");

  useEffect(() => {
    setQuestionObject(0);
    cacheImage();
    startCamera();
  }, []);

  //이미지 캐싱 함수
  const cacheImage = () => {
    Promise.all([
      Asset.fromModule("../../../assets/icons/rotate.png").downloadAsync(),
      Asset.fromModule("../../../assets/icons/recording.png").downloadAsync(),
      Asset.fromModule("../../../assets/icons/record.png").downloadAsync(),
      Asset.fromModule("../../../assets/icons/video.png").downloadAsync(),
      Asset.fromModule("../../../assets/icons/back-white.png").downloadAsync(),
    ]);
  };

  //갤러리에서 영상 가져오는 함수
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
            alert("영상의 길이가 60초를 초과하여, 영상의 앞 60초만 사용됩니다.");
          }
          setUri(res.uri);
          isAnswer
            ? mainNavigation.push("CameraDetail", { questionId: route.params.questionId })
            : cameraNavigation.push("CameraDetail");
        }
      });
    }
    setIsPickingVideo(false);
  };

  //카메라 준비 함수
  const onCameraReady = () => {
    getDeviceCameraRatio();
    setIsCameraReady(true);
  };

  //카메라 권한 가져오는 함수
  const startCamera = async () => {
    const { status: CameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: VoiceStatus } = await Camera.requestMicrophonePermissionsAsync();

    setHasPermission(CameraStatus === "granted" || VoiceStatus === "granted");
  };

  //디바이스의 최적 카메라 비율을 사용하는 함수
  const getDeviceCameraRatio = async () => {
    const ratio = await cameraRef.getSupportedRatiosAsync();
    const bestRatio = extractBestRatio(ratio);
    setBestRatio(bestRatio);
  };

  //디바이스의 최적 카메라 비율을 구하는 함수
  const extractBestRatio = (availableRatioArra: string[]) => {
    const ratioObjectArray: { ratio: string; realRatio: number }[] = [];
    const arrayOfAbs: number[] = [];

    for (let i = 0; i < availableRatioArra.length; i++) {
      ratioObjectArray[i] = {
        ratio: availableRatioArra[i],
        realRatio:
          Number(availableRatioArra[i].split(":")[0]) / Number(availableRatioArra[i].split(":")[1]),
      };
    }

    for (let i = 0; i < ratioObjectArray.length; i++) {
      arrayOfAbs.push(Math.abs(SCREEN_RATIO - ratioObjectArray[i].realRatio));
    }

    const minRatio = Math.min.apply(Math, arrayOfAbs);
    const minRatioIndex = arrayOfAbs.findIndex((value) => value === minRatio);

    return availableRatioArra[minRatioIndex];
  };

  //동영상 녹화 함수
  const recordVideo = async () => {
    blockRecordButton();
    if (cameraRef && isFocused && !blockRecord) {
      setIsVideoRecording(true);
      const videoRecordPromise = await cameraRef.recordAsync({
        maxDuration: MAX_DURATION,
      });
      setUri(videoRecordPromise.uri);
      isAnswer
        ? mainNavigation.navigate("CameraDetail", { questionId: route.params.questionId })
        : cameraNavigation.navigate("CameraDetail");
    }
  };

  //동영상 촬영 중지 함수
  const stopVideoRecording = () => {
    if (cameraRef && !blockRecord) {
      cameraRef.stopRecording();
      setIsVideoRecording(false);
    }
    blockRecordButton();
  };

  //3초동안 함수 실행을 막는 함수
  const blockRecordButton = () => {
    setBlockRecord(true);
    setTimeout(() => {
      setBlockRecord(false);
    }, 3000);
  };

  //카메라 전환 함수
  const switchCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  //동영상 촬영중이면 촬영중을 띄워주는 ui
  const renderVideoRecordIndicator = (): JSX.Element =>
    isVideoRecording ? (
      <S.RecordIndicatorContainer>
        <S.RecordDot />
        <S.RecordTitle>{"촬영중"}</S.RecordTitle>
      </S.RecordIndicatorContainer>
    ) : (
      <S.RecordIndicatorContainer>
        <S.RecordTitle>촬영 버튼을 짧게 눌러주세요</S.RecordTitle>
      </S.RecordIndicatorContainer>
    );

  //동영상 촬영 컨트롤 ui
  const renderVideoControl = (): JSX.Element => (
    <S.Control bottom={isAnswer ? 60 : 100}>
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
          <S.FlipCameraContainer disabled={!isCameraReady} onPress={switchCamera}>
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
        {isAnswer ? (
          <S.GoBackContainer
            onPress={() => {
              cameraNavigation.pop(1);
            }}
          >
            <S.GoBackImage source={backImage} />
          </S.GoBackContainer>
        ) : (
          <></>
        )}
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
          {renderVideoRecordIndicator()}
          {renderVideoControl()}
        </View>
      </SafeAreaView>
    </S.QuestionWrapper>
  );
};

export default CameraComponent;
