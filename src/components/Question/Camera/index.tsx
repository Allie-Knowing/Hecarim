import React, { useState, useEffect, FC, useContext } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
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
import recordingImg from "../../../assets/icons/recording.png";
import recordImg from "../../../assets/icons/record.png";
import videoImg from "../../../assets/icons/video.png";
import backImage from "../../../assets/icons/back-white.png";
import rotateImg from "../../../assets/icons/rotate.png";
import { useTimer } from "hooks/useTimer";

interface Props {
  route?: {
    params: {
      questionId: number;
    };
  };
}

type screenProp = StackNavigationProp<CameraStackParamList, "CameraDetail">;

const CameraComponent: FC<Props> = ({ route }): JSX.Element => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isVideoRecording, setIsVideoRecording] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<null | Camera>(null);
  const [bestRatio, setBestRatio] = useState<string>();
  const [isPickingVideo, setIsPickingVideo] = useState<boolean>(false);
  const { setUri } = useContext(cameraContext);
  const isAnswer = useContext(isStackContext);
  const [blockRecord, setBlockRecord] = useState(false);

  const cameraNavigation = useNavigation<screenProp>();
  const mainNavigation = useMainStackNavigation();

  const isFocused = useIsFocused();

  const { time, startTimer, endTimer, resetTimer } = useTimer();

  useEffect(() => {
    (async () => {
      const { status: CameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: VoiceStatus } = await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermission(CameraStatus === "granted");
      setHasAudioPermission(VoiceStatus === "granted");
    })();
    cacheImage();
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
            ? mainNavigation.push("CameraDetail", {
                questionId: route.params.questionId,
              })
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

  //디바이스의 최적 카메라 비율을 사용하는 함수
  const getDeviceCameraRatio = async () => {
    const ratio = await cameraRef.getSupportedRatiosAsync();
    const bestRatio = extractBestRatio(ratio);
    setBestRatio(bestRatio);
  };

  //디바이스의 최적 카메라 비율을 구하는 함수
  const extractBestRatio = (availableRatioArray: string[]) => {
    const ratioObjectArray: { ratio: string; realRatio: number }[] = [];
    const arrayOfAbs: number[] = [];

    for (let i = 0; i < availableRatioArray.length; i++) {
      ratioObjectArray[i] = {
        ratio: availableRatioArray[i],
        realRatio:
          Number(availableRatioArray[i].split(":")[0]) /
          Number(availableRatioArray[i].split(":")[1]),
      };
    }

    for (let i = 0; i < ratioObjectArray.length; i++) {
      arrayOfAbs.push(Math.abs(SCREEN_RATIO - ratioObjectArray[i].realRatio));
    }

    const minRatio = Math.min(...arrayOfAbs);
    const minRatioIndex = arrayOfAbs.findIndex((value) => value === minRatio);

    return availableRatioArray[minRatioIndex];
  };

  //동영상 녹화 함수
  const recordVideo = async () => {
    resetTimer();
    startTimer();
    blockRecordButton();
    if (cameraRef && isFocused && !blockRecord) {
      setIsVideoRecording(true);
      const videoRecordPromise = await cameraRef.recordAsync({
        maxDuration: MAX_DURATION,
      });
      setUri(videoRecordPromise.uri);
      isAnswer
        ? mainNavigation.navigate("CameraDetail", {
            questionId: route.params.questionId,
          })
        : cameraNavigation.navigate("CameraDetail");
    }
  };

  //동영상 촬영 중지 함수
  const stopVideoRecording = () => {
    if (cameraRef && !blockRecord) {
      cameraRef.stopRecording();
      setIsVideoRecording(false);
    }
    endTimer();
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
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <S.RecordDot />
          <S.RecordTitle>촬영중</S.RecordTitle>
        </View>
        <S.RecordTitle>{(Math.floor(time / 60)).toString().padStart(2, "0")} : {(time % 60).toString().padStart(2, "0")}</S.RecordTitle>
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

  if (hasAudioPermission === null || hasCameraPermission === null) {
    return (
      <S.Container>
        <S.Message>
          <S.Text>잠시만 기다려주세요...</S.Text>
        </S.Message>
      </S.Container>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <S.Container>
        <S.Message>
          <S.Text>설정에서 카메라 권한을 추가해주세요</S.Text>
        </S.Message>
      </S.Container>
    );
  }

  if (hasAudioPermission === false) {
    return (
      <S.Container style={{ ...StyleSheet.absoluteFillObject }}>
        <S.Message>
          <S.Text>설정에서 카메라 음성 권한을 추가해주세요</S.Text>
        </S.Message>
      </S.Container>
    );
  }

  if (hasAudioPermission && hasCameraPermission) {
    return (
      <S.QuestionWrapper>
        <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }}>
          <S.GoBackContainer
            onPress={() => {
              cameraNavigation.pop(1);
            }}
          >
            <S.GoBackImage source={backImage} />
          </S.GoBackContainer>
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
  }
};

export default CameraComponent;
