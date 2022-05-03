import { FC } from "react";
import * as S from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const UploadingModal: FC = (): JSX.Element => {
  const { top: TOP_PAD } = useSafeAreaInsets();
  return (
    <S.UploadingContainer topPad={TOP_PAD}>
      <S.UploadingText>업로딩 중</S.UploadingText>
    </S.UploadingContainer>
  );
};

export default UploadingModal;
