import React, { FC, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InterestsItem from "./InterestsItem";
import { INTERESTS_Map } from "constance/interests";
import * as S from "./style";
import useAlert from "hooks/useAlert";
import { useInterestsSetting } from "queries/InterestsSetting";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";

const { height } = Dimensions.get("screen");
type Props = StackNavigationProp<MainStackParamList, "InterestsSetting">;

const InterestsContent: FC<Props> = (navigation) => {
  const { top: topPad } = useSafeAreaInsets();
  const { closeAlert, showAlert } = useAlert();
  const { mutate, isSuccess, isError } = useInterestsSetting();
  const [interestsCount, setInterestsCount] = useState<number>(0);
  const [interestsArr, setInterestsArr] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({ routes: [{ name: "Main" }] });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showAlert({
        title: "관심분야 설정에 실패했습니다.",
        content: "잠시후 다시 시도해주세요.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  }, [isError]);

  const checkInterestsItem = (index: number) => {
    if (interestsCount >= 3 && !interestsArr[index]) {
      return;
    }

    interestsArr[index]
      ? setInterestsCount(interestsCount - 1)
      : setInterestsCount(interestsCount + 1);

    let copyArr = [...interestsArr];
    copyArr[index] = !interestsArr[index];
    setInterestsArr(copyArr);
  };

  const submitInterests = () => {
    if (interestsCount === 0) {
      showAlert({
        title: "관심분야를 설정할 수\n없습니다.",
        content: "1개 이상의 관심분야를\n선택해주세요.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
      return;
    }
    const interestsSettingRequest = [];
    for (let i = 0; i < interestsArr.length; i++) {
      if (interestsArr[i]) {
        interestsSettingRequest.push(i + 1);
      }
    }
    mutate(interestsSettingRequest);
  };

  return (
    <S.InterestsContentContainer height={height - (50 + topPad)}>
      <S.Title>관심있는 컨텐츠를 선택해보세요.</S.Title>
      <S.Description>최대 3개까지 선택할 수 있어요.</S.Description>
      <S.InterestsField>
        {INTERESTS_Map.map((v, index) => {
          return (
            <InterestsItem
              key={index}
              title={v.title}
              image={v.image}
              index={index}
              checkInterestsItem={checkInterestsItem}
              check={interestsArr[index]}
            />
          );
        })}
      </S.InterestsField>
      <S.CheckButton onPress={submitInterests}>
        <S.ButtonTitle>완료</S.ButtonTitle>
      </S.CheckButton>
    </S.InterestsContentContainer>
  );
};

export default InterestsContent;
