import { useVideoMutation } from "queries/Video";
import { useCallback } from "react";
import useAlert from "./useAlert";

const useBlock = (videoId: number) => {
  const { showAlert, closeAlert } = useAlert();
  const { block } = useVideoMutation(videoId);

  const onBlockSuccess = useCallback(() => {
    showAlert({
      title: "차단 완료.",
      content: "정상적으로 차단이 완료되었습니다.",
      buttons: [{ color: "black", text: "확인", onPress: (id) => closeAlert(id) }],
    });
  }, [closeAlert, showAlert]);

  const onBlockButtonPress = useCallback(
    async (id: string) => {
      closeAlert(id);
      await block.mutateAsync();
      onBlockSuccess();
    },
    [block, closeAlert, onBlockSuccess]
  );

  const onBlockPress = useCallback(() => {
    showAlert({
      title: "유저를 차단하시겠습니까?",
      content: "차단할 시 유저가 올린 게시물을\n볼 수 없습니다.",
      buttons: [{ color: "red", text: "차단", onPress: onBlockButtonPress }],
    });
  }, [onBlockButtonPress, showAlert]);

  return { onBlockPress };
};

export default useBlock;
