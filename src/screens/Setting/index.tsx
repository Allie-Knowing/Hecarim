import { Dimensions, Linking, Text } from "react-native";
import React, { FC, useEffect } from "react";
import * as S from "./styles";
import InquiryButton from "components/Buttons/Setting/InquiryButton";
import LogoutButton from "components/Buttons/Setting/LogoutButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import useAlert from "hooks/useAlert";
import storageKeys from "constant/storageKeys";
import localStorage from "utils/localStorage";
import DefaultSettingButton from "components/Buttons/Setting/DefaultButton";
import { useDeleteWithdrawal } from "queries/Profile";

const { width } = Dimensions.get("window");

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "Setting">;
};

const Setting: FC<Props> = ({ navigation }) => {
  const { closeAlert: closeAlret, showAlert: showAlret } = useAlert();
  const { mutate: withdrawlMutate, isSuccess, isError } = useDeleteWithdrawal();

  const deleteToken = async () => {
    await localStorage.removeItem(storageKeys.accessToken);
    await localStorage.removeItem(storageKeys.refreshToken);
  };

  useEffect(() => {
    if (isSuccess) {
      deleteToken();
      navigation.reset({ routes: [{ name: "Login" }] });
    }
    if (isError) {
      showAlret({
        title: "회원탈퇴에 실패했습니다.",
        content: "잠시 후 다시 시도하세요.",
        buttons: [
          { text: "확인", color: "black", onPress: (id) => closeAlret(id) },
        ],
      });
    }
  }, [isSuccess, isError]);

  const logout = () => {
    showAlret({
      title: "로그아웃 하시겠습니까?",
      content: "메인페이지로 이동합니다.",
      buttons: [
        { text: "취소", color: "black", onPress: (id) => closeAlret(id) },
        {
          text: "로그아웃",
          color: "red",
          onPress: async (alert) => {
            closeAlret(alert);
            deleteToken();
            navigation.reset({ routes: [{ name: "Login" }] });
          },
        },
      ],
    });
  };

  const withdrawal = () => {
    showAlret({
      title: "계정을 삭제 하시겠습니까?",
      content:
        "복구 신청을 할 수 있으며,\n 14일 후에 데이터가 완전히 삭제됩니다.",
      buttons: [
        { text: "취소", color: "black", onPress: (id) => closeAlret(id) },
        {
          text: "삭제",
          color: "red",
          onPress: async (alert) => {
            closeAlret(alert);
            withdrawlMutate();
          },
        },
      ],
    });
  };

  const inquiry = () => {
    Linking.openURL("https://knowing.allie.kr/");
  };

  const interestsSetting = () => {
    navigation.push("InterestsSetting");
  };

  const profileEdit = () => {
    navigation.push("ProfileEdit");
  };

  const BUTTON_MAP = [
    {
      title: "프로필 수정",
      isRed: false,
      onPressFunction: profileEdit,
    },
    {
      title: "관심분야 수정",
      isRed: false,
      onPressFunction: interestsSetting,
    },
    {
      title: "문의하기",
      isRed: false,
      onPressFunction: inquiry,
    },
    {
      title: "로그아웃",
      isRed: true,
      onPressFunction: logout,
    },
    {
      title: "회원탈퇴",
      isRed: true,
      onPressFunction: withdrawal,
    },
  ];

  return (
    <S.Container width={width}>
      {BUTTON_MAP.map((v, i) => {
        return (
          <DefaultSettingButton
            title={v.title}
            isRed={v.isRed}
            onPressFunction={v.onPressFunction}
            key={i}
          />
        );
      })}
    </S.Container>
  );
};

export default Setting;
