import { StackNavigationProp } from "@react-navigation/stack";
import ProfileSettingHeader from "components/Header/ProfileSetting";
import { MainStackParamList } from "hooks/useMainStackNavigation";
import { useMyId } from "queries/MyId";
import { useProfile } from "queries/Profile";
import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import * as S from "./style";
import * as ImagePicker from "expo-image-picker";
import { useNicknameEdit, useProfileEdit } from "queries/ProfileEdit";
import useAlert from "hooks/useAlert";

type Props = {
  navigation: StackNavigationProp<MainStackParamList, "PrivacyPolicy">;
};

const defaultProfile = require("assets/profile.png");
const editImage = require("assets/icons/edit.png");

const str_space = /\s/;

const ProfileEditPage: FC<Props> = ({ navigation }) => {
  const { data: userId } = useMyId();
  const { data } = useProfile(userId.data.data);
  const [profile, setProfile] = useState<string>("");
  const [profileFile, setProfileFile] = useState(null);
  const [nickname, setNickname] = useState<string>("");
  const {
    mutate: nicknameEdit,
    isSuccess: nicknameEditSuccess,
    isError: nicknameEditError,
    isLoading: nicknameEditLoading,
  } = useNicknameEdit();
  const {
    mutate: profileEdit,
    isSuccess: profileEditSuccess,
    isError: profileEditError,
    isLoading: profileEditLoading,
  } = useProfileEdit();
  const { closeAlert, showAlert } = useAlert();

  useEffect(() => {
    if (nicknameEditError || profileEditError) {
      showAlert({
        title: "잠시 후 다시 시도해주세요.",
        content: "불편을 드려 죄송합니다.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  }, [nicknameEditError, profileEditError]);

  useEffect(() => {
    if (
      (nicknameEditSuccess && profileEditSuccess) ||
      (!profileFile && nicknameEditSuccess) ||
      (nickname === "" && profileEditSuccess)
    ) {
      navigation.reset({ routes: [{ name: "Main" }] });
    }
  }, [nicknameEditSuccess, profileEditSuccess]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      allowsMultipleSelection: false,
    });

    if (permission.granted) {
      if (!result.cancelled) {
        const imgUri: string = result.uri;
        let fileName = imgUri.split("/").pop();
        setProfile(imgUri);
        const formData = new FormData();
        let match = /\.(\w+)$/.exec(fileName);
        let type = match ? `image/${match[1]}` : `image`;

        formData.append("file", { uri: imgUri, type, name: fileName });
        setProfileFile(formData);
      }
    }
  };

  useEffect(() => {
    setProfile(data?.data?.data.profile ? data.data.data.profile : "");
  }, [data]);

  const submitProfileSetting = () => {
    if (nickname !== "" && str_space.exec(nickname)) {
      showAlert({
        title: "공백을 제거해주세요.",
        content: "공백은 입력할 수 없습니다.",
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
    if (nickname !== "" && profileFile) {
      nicknameEdit(nickname);
      profileEdit(profileFile);
    } else if (nickname !== "") {
      nicknameEdit(nickname);
    } else if (profileFile) {
      profileEdit(profileFile);
    } else {
      showAlert({
        title: "변경사항이 없습니다.",
        content: "변경 후 저장해주세요.",
        buttons: [
          {
            text: "확인",
            color: "black",
            onPress: (id) => closeAlert(id),
          },
        ],
      });
    }
  };

  return (
    <>
      <ProfileSettingHeader
        stackNavigation={navigation}
        submitProfileSetting={submitProfileSetting}
        isLoading={profileEditLoading || nicknameEditLoading}
      />
      <S.ProfileEditContainer>
        <S.PictureContainer>
          <S.Picture source={profile ? { uri: profile } : defaultProfile} />
          <TouchableOpacity onPress={pickImage}>
            <S.PictureEditBtn>프로필 사진 수정</S.PictureEditBtn>
          </TouchableOpacity>
        </S.PictureContainer>
        <S.NicknameEdit>
          <S.NicknameInput
            placeholder="변경할 닉네임을 입력해주세요."
            value={nickname}
            onChangeText={setNickname}
            maxLength={10}
          />
          <S.EditImage source={editImage} />
        </S.NicknameEdit>
      </S.ProfileEditContainer>
    </>
  );
};

export default ProfileEditPage;
