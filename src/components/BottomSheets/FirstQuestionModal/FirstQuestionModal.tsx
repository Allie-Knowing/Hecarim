import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components/native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import firstQuestionImage from "assets/first_question_image.png";
import StyledBackgroundComponent from "../StyledBackgroundComponent";
import localStorage from "utils/localStorage";
import storageKeys from "constant/storageKeys";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { BackHandler } from "react-native";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "Main">;
}

const FirstQuestionModal = forwardRef<BottomSheet, Props>(
  ({ navigation }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          enableTouchThrough={false}
          pressBehavior={"close"}
        />
      ),
      []
    );

    useEffect(() => {
      const backAction = () => {
        if (isOpen) {
          bottomSheetRef.current.close();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [isOpen]);

    const clostBottomSheet = () => {
      const nowDate = new Date();
      localStorage.setItem(storageKeys.adModalCloseAt, nowDate.getTime());
    };

    useImperativeHandle(ref, () => bottomSheetRef.current);

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["65%"]}
        backdropComponent={renderBackdrop}
        backgroundComponent={StyledBackgroundComponent}
        onClose={clostBottomSheet}
        index={-1}
        onChange={(index) => setIsOpen(index !== -1)}
      >
        <ModalContent>
          <Title>
            영상 업로드하고,
            {"\n"} 4000원 상당의 보상 받아가요! 💰
          </Title>
          <Description>첫 질문 +1000 IQ, 첫 답변 +3000 IQ</Description>
          <PhoneImage source={firstQuestionImage} resizeMode="contain" />
          <MoveButtonContainer>
            <MoveButton
              onPress={() => {
                bottomSheetRef.current.close();
                navigation.push("Ask");
              }}
            >
              <MoveButtonText>지금 질문하기</MoveButtonText>
            </MoveButton>
          </MoveButtonContainer>
        </ModalContent>
      </BottomSheet>
    );
  }
);

FirstQuestionModal.displayName = "FirstQuestionModal";
export default FirstQuestionModal;

const ModalContent = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 30px;
  align-items: center;
  position: relative;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.body1};
  color: black;
  text-align: center;
`;

const Description = styled.Text`
  font: ${({ theme }) => theme.fonts.description2};
  color: ${({ theme }) => theme.colors.primary.default};
  margin-top: 10px;
`;

const PhoneImage = styled.Image`
  margin-top: 30px;
  height: 500px;
`;

const MoveButtonContainer = styled.View`
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const MoveButton = styled.TouchableOpacity`
  width: 240px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  color: white;
  justify-content: center;
  align-items: center;
`;

const MoveButtonText = styled.Text`
  color: white;
  font: ${({ theme }) => theme.fonts.body3};
`;
